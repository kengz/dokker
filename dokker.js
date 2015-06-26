//     Dokker.js 0.0.1
//     http://dokker.oceanhouse21.com
//     (c) 2014-2015 Georg Schlenkhoff and Oceanhouse21
//     Dokker.js may be freely distributed under the MIT license.

'use strict';

// Define required dependencies
var Promise = require('promise');
var fs = require('fs');
var path = require('path');
var read = Promise.denodeify(fs.readFile);
var write = Promise.denodeify(fs.writeFile);
var docco = require('docco');
var docdown = require('docdown');
var marked = require('marked');
var ejs = require('ejs');
var cheerio = require('cheerio');
var exec = require('child_process').exec;
var Dokker = {};

/**
 * The semantic version number.
 *
 * @static
 * @memberOf Dokker
 * @type string
 */
Dokker.VERSION = '0.1.0';

/**
 * Creates a HTML file that transcludes the HTML snippet that was created
 * by the docdown module into an ejs template which is defined by the 
 * .dokker.json configuration file.
 *
 * @static
 * @category JSDoc
 * @memberOf Dokker
 * @type Function
 * @param {Object} [options] The options object.
 * @param {String} [options.template='template/index.ejs.html'] The path to
 * the ejs template file.
 * @param {string} [options.html='docs/index.html'] The path to the docdown
 * generated JSDoc documentation.
 * @param {string} [options.readme='README.md'] The path to the README.md
 * file.
 * @param {string} [options.title=''] The title for the documentation.
 * @returns {Promise} Returns a resolved promise if file was created.
 * @example
 *
 * var options = {
 *   template: 'template/index.ejs.html',
 *   html: 'docs/index.html',
 *   readme: 'docs/README.md',
 *   title: 'Dokker.js API Documentation'
 * };
 * Dokker.injectTemplate(options)
 * .then(function(){
 *   // => resolved promise
 * });
 */
// Transclude in a ejs template file the HTML snippet that was ultimately
// created with docdown. Also tweak the HTML page a bit and finally
// inject the README.md.
Dokker.injectTemplate = function(options) {
  return new Promise(function(resolve, reject) {
    var template, body, html, readme, $;
    return read(options.template, 'utf8')
    .then(function(data) {
      template = data;
      return read(options.readme, 'utf8');
    }).then(function(data) {
      readme = marked(data);
      $ = cheerio.load(readme);
      $('h1').remove();
      readme = $.html();
      return read(options.html, 'utf8');
    }).then(function(data) {
      $ = cheerio.load(data);
      return ejs.render(template, {
        apiToc: $('.toc-container').html(),
        readme: readme,
        apiDoc: $('.doc-container').html(),
        // correctly setting links to your github/pages
        page_url: options.site,
        title: options.title,
        github_url: options.github,
        // fixed reference to generated annotation
        // the 'literate' in .dokker.json shall not require a source since it's never used.
        annotated_path: 'annotated/'+options.source,
      });
    }).then(function(data) {
      return write(options.html, data, 'utf8');
    }).then(function() {
      resolve();
    }).then(null, function(err) {
      reject(err);
    });
  });
};

/**
 * Creates an HTML file to describe the features of your module from your
 * **Mocha** tests. The module is using the mocha **doc** reporter to
 * generate the HTML contents.
 *
 * @static
 * @memberOf Dokker
 * @category Mocha
 * @type Function
 * @param {Object} [options] The options object.
 * @param {String} [options.path='docs.html'] The path where to save the
 * HTML file
 * @returns {Promise} Returns a resolved promise if file was created.
 * @example
 *
 * var options = {
 *   path: 'docs/tests.html',
 * };
 * Dokker.createTests(options)
 * .then(function(){
 *   // => resolved promise
 * });
 */
// Create a HTML site from any mocha tests find when executing mocha
// --reporter doc terminal command.
Dokker.createTests = function(options) {
  return new Promise(function(resolve, reject) {
    var template, tests;
    // allows specification of mocha.command in .dokker.json, e.g. 'mocha -u tdd --reporter doc'
    var cmd = options.command || 'mocha --reporter doc';
    exec(cmd, function(error, stdout) {
      if(error) return reject(error);
      tests = stdout;
      return read(options.template, 'utf8')
      .then(function(data) {
        template = data;
        return ejs.render(template, {tests: tests});
      }).then(function(data) {
        return write(options.path, data, 'utf8');
      }).then(function() {
        resolve();
      }).then(null, function(err) {
        reject(err);
      });
    });
  });
};

/**
 * Runs a terminal shell with the git command to extract the docs branch
 * into a seperate gh-pages branch and finally pushes that branch to Github,
 * so that the Github page is updated.
 *
 * @static
 * @memberOf Dokker
 * @category Github Pages
 * @type Function
 * @returns {Promise} Returns a resolved promise if file was created.
 * @example
 *
 * Dokker.ghPages()
 * .then(function(){
 *   // => resolved promise
 * });
 */
// Extract docs folder to separate git branch and finally push branch to
// Github repository
Dokker.ghPages = function(){
  return new Promise(function(resolve, reject) {
    exec('git subtree split -P docs -b gh-pages', function(error, stdout, stderr) {
      if(error) return reject(stderr);
      exec('git push origin gh-pages', function(error, stdout, stderr) {
        if(error) return reject(stderr);
        resolve();
      });
    });
  });
};

/**
 * Create a styled HTML file from your source code with the help of **docco**
 * module.
 *
 * @static
 * @memberOf Dokker
 * @category Literate programming
 * @type Function
 * @param {Object} [options] The options object.
 * @param {String} [options.source='app.js'] The path the source code with
 * comments
 * @param {string} [options.dir='docs/annotated'] The directory where to save
 * the generated HTML file.
 * @returns {Promise} Returns a resolved promise if file was created.
 * @example
 *
 * var options = {
 *   dir: 'docs',
 *   source: 'app.js'
 * };
 * Dokker.literate()
 * .then(function(){
 *   // => resolved promise
 * });
 */
// Create an HTML file from any source code comments in the style of
// [literate programming](https://de.wikipedia.org/wiki/Literate_programming)
Dokker.literate = function (options) {
  return new Promise(function(resolve, reject) {
    var tmpDir = path.join(process.cwd(), '/.tmp');
    var tmpFile = path.join(tmpDir, options.source);
    return read(path.join(process.cwd(), options.source), 'utf8')
    .then(function(data) {
      var source = data.replace(/^\s*(\*|\/\*).*[\r\n]/gm, '');
      return Dokker.mkdir(tmpDir)
      .then(function() {
        return write(tmpFile, source, 'utf8');
      }).then(function(){
        docco.run(['', '', tmpFile, '-o', options.dir]);
        resolve();
      });
    }).then(null, function(err) {
      if (err) return reject(err);
    });
  });
};

/**
 * Create a Markdown file from JSDoc tags.
 *
 * @static
 * @memberOf Dokker
 * @category JSDoc
 * @type Function
 * @param {Object} [options] The options object.
 * @param {String} [options.source='app.js'] The path the source code with
 * JSDoc tags.
 * @param {String} [options.github =''] The path the Github repository.
 * @param {string} [options.markdown='docs/READMDE.md'] The path where to
 * save the Markdown file.
 * @returns {Promise} Returns a resolved promise if file was created.
 * @example
 *
 * var options = {
 *   source: 'app.js',
 *   markdown: 'docs/README.md'
 * };
 * Dokker.jsdocMarkdown()
 * .then(function(){
 *   // => resolved promise
 * });
 */
// Convert markdown from any source code comments with docdown module.
Dokker.jsdocMarkdown = function (options) {
  return new Promise(function(resolve, reject) {
    var source, tmpFile, tmpDir;
    return read(path.join(process.cwd(), options.source), 'utf8')
    .then(function(data){
      source = data.replace(/^\s*(\/\/).*[\r\n]/gm, '');
      tmpDir = path.join(process.cwd(), '/.tmp');
      return Dokker.mkdir(tmpDir);
    }).then(function(){
      tmpFile = path.join(tmpDir, options.source);
      return write(tmpFile, source, 'utf8');
    }).then(function(){
      var markdown = docdown({
        'path': tmpFile,
        'url': options.github,
        'toc': 'categories',
      });
      return write(options.markdown, markdown, 'utf8');
    }).then(function() {
      resolve();
    }).then(null, function(err) {
      reject(err);
    });
  });
};

/**
 * Create an HTML file from the Markdown file that was create with 
 * [Dokker.jsdocMarkdown()](#Dokker-jsdocMarkdown)
 *
 * @static
 * @memberOf Dokker
 * @category JSDoc
 * @type Function
 * @param {Object} [options] The options object.
 * @param {string} [options.markdown='docs/READMDE.md'] The path where to
 * save the Markdown file.
 * @returns {Promise} Returns a resolved promise if file was created.
 * @example
 *
 * var options = {
 *   markdown: 'docs/README.md'
 * };
 * Dokker.jsdocHtml()
 * .then(function(){
 *   // => resolved promise
 * });
 */
// Create an HTML file from any source code comments in the style of
// [literate programming](https://de.wikipedia.org/wiki/Literate_programming)
Dokker.jsdocHtml = function (options) {
  return new Promise(function(resolve, reject) {
    return read(options.markdown, 'utf8')
    .then(function(data) {
      var html = marked(data).replace(/<!-- /g,'<').replace(/ -->/g,'>');
      return write(options.html, html, 'utf8');
    }).then(function() {
      resolve();
    }).then(null, function(err) {
      reject(err);
    });
  });
};

// Internal helper function that creates any directory if not existing.
Dokker.mkdir = function(dir) {
  return new Promise(function(resolve, reject) {
    fs.exists(dir, function(exists) {
      if (exists) {
        resolve();
      } else {
        fs.mkdir(dir, function(err) {
          if (err) return reject(err);
          resolve();
        });
      }
    });
  });
};

/**
 * Helper function that takes a couple of options arguments and
 * normalises them and subsequently returns them.
 *
 * @static
 * @memberOf Dokker
 * @category Utility
 * @type Function
 * @param {Object} [options] The options object.
 * @param {string} [options.li.markdown='docs/READMDE.md'] The path where to
 * @param {String} [options.source='app.js'] The path the source code with
 * JSDoc tags.
 * @param {string} [options.jsdoc.markdown='docs/READMDE.md'] The path where to
 * save the Markdown file.
 * @param {string} [options.jsdoc.README ='READMDE.md'] The path to the
 * project's README.md file
 * @param {String} [options.jsodc.template ='templates/index.ejs.html'] The
 * path to the ejs template.
 * @param {String} [options.mocha.template='templates/tests.ejs.html'] The
 * path to the mocha template.
 * @param {String} [options.dir='docs'] The path where to store the generated
 * files
 * @returns {Promise} Returns a resolved promise with edited options object
 * @example
 *
 * var options = {
 *   dir: 'docs',
 *   literate: {
 *     source: 'dokker.js',
 *     dir: 'annotated'
 *   },
 *   jsdoc: {
 *     title: 'Dokker.js',
 *     source: 'dokker.js',
 *     markdown: 'README.md',
 *     html: 'index.html',
 *     readme: 'README.md',
 *   }
 * };
 * Dokker.jsdocHtml()
 * .then(function(){
 *   // => object with absolute pathes to the directory from
 *   // which the command was executed
 * });
 */
// Parses the options file, .Dokker.json, and sets the default parameters.
Dokker.configure = function(options) {
  return new Promise(function(resolve, reject){
    var file = path.join(process.cwd(), '.dokker.json');
    return read(file, 'utf8')
    .then(function(data) {
      data = JSON.parse(data);
      data.jsdoc.template = (data.jsdoc.template) ? path.join(process.cwd(), data.jsdoc.template) : path.join(__dirname, 'templates/index.ejs.html');
      data.mocha.template = (data.mocha.template) ? path.join(process.cwd(), data.mocha.template) : path.join(__dirname, 'templates/tests.ejs.html');
      data.mocha.path = path.join(process.cwd(), data.dir, data.mocha.path);
      // specifies mocha command in .dokker.json; e.g. mocha -u tdd -R spec
      data.mocha.command = path.join(process.cwd(), data.dir, data.mocha.command);
      data.literate.dir = path.join(process.cwd(), data.dir, data.literate.dir);
      data.jsdoc.markdown = path.join(process.cwd(), data.dir, data.jsdoc.markdown);
      data.jsdoc.html = path.join(process.cwd(), data.dir, data.jsdoc.html);
      data.jsdoc.readme = path.join(process.cwd(), data.jsdoc.readme);
      resolve(data);
    }).then(null, function(err) {
      reject(err);
    });
  });
};

/**
 * Copy the template to local directory so that one can make changes to ejs
 * files.
 *
 * @static
 * @memberOf Dokker
 * @category Utility
 * @type Function
 * @param {Object} [options] The options object.
 * @param {string} [options.dir='templates'] The path where to save the
 * template files
 * @returns {Promise} Returns a resolved promise if files were created.
 * @example
 *
 * var options = {
 *   dir: 'template'
 * };
 * Dokker.copyTemplate()
 * .then(function(){
 *   // => resolved promise
 * });
 */
// Copy starter template to bootstrap any Dokker project.
Dokker.copyTemplate = function(options) {
  return new Promise(function(resolve, reject) {
    var oldStyle = path.join(__dirname, 'templates', 'styles.css');
    var newStyle = path.join(process.cwd(), options.dir, 'styles.css');
    fs.createReadStream(oldStyle).pipe(fs.createWriteStream(newStyle));
    var oldLogo = path.join(__dirname, 'templates', 'logo.png');
    var newLogo = path.join(process.cwd(), options.dir, 'logo.png');
    fs.createReadStream(oldLogo).pipe(fs.createWriteStream(newLogo));
    var oldApp = path.join(__dirname, 'templates', 'app.js');
    var newApp = path.join(process.cwd(), options.dir, 'app.js');
    fs.createReadStream(oldApp).pipe(fs.createWriteStream(newApp));
    resolve();
  });
};

/**
 * Create a .dokker.json file to bootstrap any Dokker project
 *
 * @static
 * @memberOf Dokker
 * @category Utility
 * @type Function
 * @returns {Promise} Returns a resolved promise if files were created.
 * @example
 *
 * Dokker.init()
 * .then(function(){
 *   // => resolved promise
 * });
 */
// Copies the .Dokker.json file to bootstrap any Dokker project.
Dokker.init = function(){
  return new Promise(function(resolve, reject) {
    var oldDok = path.join(__dirname, '.dokker.json');
    var newDok = path.join(process.cwd(), '.dokker.json');
    fs.createReadStream(oldDok).pipe(fs.createWriteStream(newDok));
    resolve();
  });
};

/**
 * Starts a Node.js/Express webserver in docs directory to watch
 * the build Dokker project
 *
 * @static
 * @memberOf Dokker
 * @category Utility
 * @type Function
 * @returns {Promise} Returns a resolved promise if files were created.
 * @example
 *
 * Dokker.init()
 * .then(function(){
 *   // => resolved promise
 * });
 */
// Starts the Node.js/Express server to watch Dokker.js project
// documentation.
Dokker.watch = function(options) {
  return new Promise(function(resolve, reject){ 
    exec('DIR='+ options.dir + ' node ' + options.dir + '/app.js', function(error, stdout, stderr){
      if(error) return reject(stderr);
    });
  });
};

module.exports = Dokker;
