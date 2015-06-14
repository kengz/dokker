# dokker.js API documentation

<!-- div class="toc-container" -->

<!-- div -->

## `Github Pages`
* <a href="#Dokker-ghPages">`Dokker.ghPages`</a>

<!-- /div -->

<!-- div -->

## `JSDoc`
* <a href="#Dokker-injectTemplate">`Dokker.injectTemplate`</a>
* <a href="#Dokker-jsdocHtml">`Dokker.jsdocHtml`</a>
* <a href="#Dokker-jsdocMarkdown">`Dokker.jsdocMarkdown`</a>

<!-- /div -->

<!-- div -->

## `Literate programming`
* <a href="#Dokker-literate">`Dokker.literate`</a>

<!-- /div -->

<!-- div -->

## `Mocha`
* <a href="#Dokker-createTests">`Dokker.createTests`</a>

<!-- /div -->

<!-- div -->

## `Utility`
* <a href="#Dokker-configure">`Dokker.configure`</a>
* <a href="#Dokker-copyTemplate">`Dokker.copyTemplate`</a>
* <a href="#Dokker-init">`Dokker.init`</a>
* <a href="#Dokker-watch">`Dokker.watch`</a>

<!-- /div -->

<!-- div -->

## `Methods`

<!-- /div -->

<!-- div -->

## `Properties`
* <a href="#Dokker-VERSION">`Dokker.VERSION`</a>

<!-- /div -->

<!-- /div -->

<!-- div class="doc-container" -->

<!-- div -->

## `“Github Pages” Methods`

<!-- div -->

### <a id="Dokker-ghPages"></a>`Dokker.ghPages()`
<a href="#Dokker-ghPages">#</a> [&#x24C8;](https://github.com/oceanhouse21/dokker/blob/master/dokker.js#L148 "View in source") [&#x24C9;][1]

Runs a terminal shell with the git command to extract the docs branch
into a seperate gh-pages branch and finally pushes that branch to Github,
so that the Github page is updated.

#### Returns
*(Promise)*:  Returns a resolved promise if file was created.

#### Example
```js
Dokker.ghPages()
.then(function(){
  // => resolved promise
});
```
* * *

<!-- /div -->

<!-- /div -->

<!-- div -->

## `“JSDoc” Methods`

<!-- div -->

### <a id="Dokker-injectTemplate"></a>`Dokker.injectTemplate([options])`
<a href="#Dokker-injectTemplate">#</a> [&#x24C8;](https://github.com/oceanhouse21/dokker/blob/master/dokker.js#L56 "View in source") [&#x24C9;][1]

Creates a HTML file that transcludes the HTML snippet that was created
by the docdown module into an ejs template which is defined by the 
.dokker.json configuration file.

#### Arguments
1. `[options]` *(Object)*: The options object.
2. `[options.template='template/index.ejs.html']` *(String)*: The path to the ejs template file.
3. `[options.html='docs/index.html']` *(string)*: The path to the docdown generated JSDoc documentation.
4. `[options.readme='README.md']` *(string)*: The path to the README.md file.
5. `[options.title='']` *(string)*: The title for the documentation.

#### Returns
*(Promise)*:  Returns a resolved promise if file was created.

#### Example
```js
var options = {
  template: 'template/index.ejs.html',
  html: 'docs/index.html',
  readme: 'docs/README.md',
  title: 'Dokker.js API Documentation'
};
Dokker.injectTemplate(options)
.then(function(){
  // => resolved promise
});
```
* * *

<!-- /div -->

<!-- div -->

### <a id="Dokker-jsdocHtml"></a>`Dokker.jsdocHtml([options])`
<a href="#Dokker-jsdocHtml">#</a> [&#x24C8;](https://github.com/oceanhouse21/dokker/blob/master/dokker.js#L278 "View in source") [&#x24C9;][1]

Create an HTML file from the Markdown file that was create with 
[Dokker.jsdocMarkdown()](#Dokker-jsdocMarkdown)

#### Arguments
1. `[options]` *(Object)*: The options object.
2. `[options.markdown='docs/READMDE.md']` *(string)*: The path where to save the Markdown file.

#### Returns
*(Promise)*:  Returns a resolved promise if file was created.

#### Example
```js
var options = {
  markdown: 'docs/README.md'
};
Dokker.jsdocHtml()
.then(function(){
  // => resolved promise
});
```
* * *

<!-- /div -->

<!-- div -->

### <a id="Dokker-jsdocMarkdown"></a>`Dokker.jsdocMarkdown([options])`
<a href="#Dokker-jsdocMarkdown">#</a> [&#x24C8;](https://github.com/oceanhouse21/dokker/blob/master/dokker.js#L230 "View in source") [&#x24C9;][1]

Create a Markdown file from JSDoc tags.

#### Arguments
1. `[options]` *(Object)*: The options object.
2. `[options.source='app.js']` *(String)*: The path the source code with JSDoc tags.
3. `[options.github ='']` *(String)*: The path the Github repository.
4. `[options.markdown='docs/READMDE.md']` *(string)*: The path where to save the Markdown file.

#### Returns
*(Promise)*:  Returns a resolved promise if file was created.

#### Example
```js
var options = {
  source: 'app.js',
  markdown: 'docs/README.md'
};
Dokker.jsdocMarkdown()
.then(function(){
  // => resolved promise
});
```
* * *

<!-- /div -->

<!-- /div -->

<!-- div -->

## `“Literate programming” Methods`

<!-- div -->

### <a id="Dokker-literate"></a>`Dokker.literate([options])`
<a href="#Dokker-literate">#</a> [&#x24C8;](https://github.com/oceanhouse21/dokker/blob/master/dokker.js#L185 "View in source") [&#x24C9;][1]

Create a styled HTML file from your source code with the help of **docco**
module.

#### Arguments
1. `[options]` *(Object)*: The options object.
2. `[options.source='app.js']` *(String)*: The path the source code with comments
3. `[options.dir='docs/annotated']` *(string)*: The directory where to save the generated HTML file.

#### Returns
*(Promise)*:  Returns a resolved promise if file was created.

#### Example
```js
var options = {
  dir: 'docs',
  source: 'app.js'
};
Dokker.literate()
.then(function(){
  // => resolved promise
});
```
* * *

<!-- /div -->

<!-- /div -->

<!-- div -->

## `“Mocha” Methods`

<!-- div -->

### <a id="Dokker-createTests"></a>`Dokker.createTests([options])`
<a href="#Dokker-createTests">#</a> [&#x24C8;](https://github.com/oceanhouse21/dokker/blob/master/dokker.js#L110 "View in source") [&#x24C9;][1]

Creates an HTML file to describe the features of your module from your
**Mocha** tests. The module is using the mocha **doc** reporter to
generate the HTML contents.

#### Arguments
1. `[options]` *(Object)*: The options object.
2. `[options.path='docs.html']` *(String)*: The path where to save the HTML file

#### Returns
*(Promise)*:  Returns a resolved promise if file was created.

#### Example
```js
var options = {
  path: 'docs/tests.html',
};
Dokker.createTests(options)
.then(function(){
  // => resolved promise
});
```
* * *

<!-- /div -->

<!-- /div -->

<!-- div -->

## `“Utility” Methods`

<!-- div -->

### <a id="Dokker-configure"></a>`Dokker.configure([options])`
<a href="#Dokker-configure">#</a> [&#x24C8;](https://github.com/oceanhouse21/dokker/blob/master/dokker.js#L351 "View in source") [&#x24C9;][1]

Helper function that takes a couple of options arguments and
normalises them and subsequently returns them.

#### Arguments
1. `[options]` *(Object)*: The options object.
2. `[options.li.markdown='docs/READMDE.md']` *(string)*: The path where to
3. `[options.source='app.js']` *(String)*: The path the source code with JSDoc tags.
4. `[options.jsdoc.markdown='docs/READMDE.md']` *(string)*: The path where to save the Markdown file.
5. `[options.jsdoc.README ='READMDE.md']` *(string)*: The path to the project's README.md file
6. `[options.jsodc.template ='templates/index.ejs.html']` *(String)*: The path to the ejs template.
7. `[options.mocha.template='templates/tests.ejs.html']` *(String)*: The path to the mocha template.
8. `[options.dir='docs']` *(String)*: The path where to store the generated files

#### Returns
*(Promise)*:  Returns a resolved promise with edited options object

#### Example
```js
var options = {
  dir: 'docs',
  literate: {
    source: 'dokker.js',
    dir: 'annotated'
  },
  jsdoc: {
    title: 'Dokker.js',
    source: 'dokker.js',
    markdown: 'README.md',
    html: 'index.html',
    readme: 'README.md',
  }
};
Dokker.jsdocHtml()
.then(function(){
  // => object with absolute pathes to the directory from
  // which the command was executed
});
```
* * *

<!-- /div -->

<!-- div -->

### <a id="Dokker-copyTemplate"></a>`Dokker.copyTemplate([options])`
<a href="#Dokker-copyTemplate">#</a> [&#x24C8;](https://github.com/oceanhouse21/dokker/blob/master/dokker.js#L393 "View in source") [&#x24C9;][1]

Copy the template to local directory so that one can make changes to ejs
files.

#### Arguments
1. `[options]` *(Object)*: The options object.
2. `[options.dir='templates']` *(string)*: The path where to save the template files

#### Returns
*(Promise)*:  Returns a resolved promise if files were created.

#### Example
```js
var options = {
  dir: 'template'
};
Dokker.copyTemplate()
.then(function(){
  // => resolved promise
});
```
* * *

<!-- /div -->

<!-- div -->

### <a id="Dokker-init"></a>`Dokker.init()`
<a href="#Dokker-init">#</a> [&#x24C8;](https://github.com/oceanhouse21/dokker/blob/master/dokker.js#L423 "View in source") [&#x24C9;][1]

Create a .dokker.json file to bootstrap any Dokker project

#### Returns
*(Promise)*:  Returns a resolved promise if files were created.

#### Example
```js
Dokker.init()
.then(function(){
  // => resolved promise
});
```
* * *

<!-- /div -->

<!-- div -->

### <a id="Dokker-watch"></a>`Dokker.watch()`
<a href="#Dokker-watch">#</a> [&#x24C8;](https://github.com/oceanhouse21/dokker/blob/master/dokker.js#L448 "View in source") [&#x24C9;][1]

Starts a Node.js/Express webserver in docs directory to watch
the build Dokker project

#### Returns
*(Promise)*:  Returns a resolved promise if files were created.

#### Example
```js
Dokker.init()
.then(function(){
  // => resolved promise
});
```
* * *

<!-- /div -->

<!-- /div -->

<!-- div -->

## `Methods`

<!-- /div -->

<!-- div -->

## `Properties`

<!-- div -->

### <a id="Dokker-VERSION"></a>`Dokker.VERSION`
<a href="#Dokker-VERSION">#</a> [&#x24C8;](https://github.com/oceanhouse21/dokker/blob/master/dokker.js#L23 "View in source") [&#x24C9;][1]

(string): The semantic version number.

* * *

<!-- /div -->

<!-- /div -->

<!-- /div -->

 [1]: #github pages "Jump back to the TOC."
