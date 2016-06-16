![dokker logo](https://raw.githubusercontent.com/oceanhouse21/dokker/master/templates/logo.png)

Dokker.js creates professional Javascript code documentations.

[See Dokker.js documentation as example.](http://dokkerjs.com)

[![Build Status](https://travis-ci.org/oceanhouse21/dokker.svg?branch=master)](https://travis-ci.org/oceanhouse21/dokker)


## Features

 * Create or [HTML](http://dokkerjs.com/) or [markdown](https://github.com/oceanhouse21/dokker/tree/master/docs#dokkerjs-api-documentation) documentation from [JSDOC](http://usejsdoc.org/) tags
 * Support for [literate programming](https://en.wikipedia.org/?title=Literate_programming) documentation
 * Live edit source code and watch changes
 * Include link to your Github repository
 * Customize your own templates with [ejs](http://www.embeddedjs.com/) or use default style
 * Create feature description from [mocha test suite](http://mochajs.org/)
 * Automagically include your README.md into the documentation
 * Use your own logo to make an astonishing impression
 * Deploy documentation to Github pages on the fly

## Community

[![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/oceanhouse21/dokker?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)

## Installation

Dokker is available as npm package. So the easiest way is to install dokker as global module into your project:

```
npm install -g dokker
```

## Usage

After installation you can execute Dokker with the help of several terminal commands.

**Bootstrap Dokker project**

Dokker needs a configuration file to execute, such as a [.travis](https://travis-ci.org/) or [.jshintrc](http://jshint.com/docs/). You can easily create .dokker.json file with the ```dokker-init``` command from the root directory of your project or copy an [example file](https://github.com/oceanhouse21/dokker/blob/master/.dokker.json).

Dokker provides a default template for your project. The template is based on an [ejs](http://www.embeddedjs.com/) file. Either you use the default template or modify it. If you choose for the latter you can copy the [templates directory](https://github.com/oceanhouse21/dokker/tree/master/templates) and tweak the ejs files how you like.

**Create documentation**

Creating a documentation is really simple with the help of Dokker. You just configure the [.dokker.json](https://github.com/oceanhouse21/dokker/blob/master/.dokker.json) file and execute ```dokker```. Then you're done.

**Live edit your documentation**

If you want to work on your source file and see how the documentation evolves, you can do ```dokker-watch``` and it will open a browser with live preview.

<!-- Node.js/Express server is started for you that serves your Dokker project at [localhost:9000](http://localhost:9000).

If you want to use the live edit function please install the [LiveReload](http://livereload.com/) plugin for your browser. You can then even start a ```nodemon docs/app.js``` and whenever you hit save the HTML site is reloading. But before you might need ```npm install -g nodemon```. -->

**Deploy to Github Pages**

If you want to deploy your documentation to Github Pages, run ```gh-pages```. Finally a separate branch, named ```gh-pages``` is created from the ```docs``` folder. That is enough for Github to serve your documentation. Please do not forget to ```git commit``` your changes before your run ```gh-pages``` command.

## Dokker in the wild
Some examples by our users. Let us know what you did with Dokker too!

- [Dokker.js](http://dokkerjs.com)
- [lomath](http://kengz.github.io/lomath/)

## Further Reading

  * [API Documentation](http://dokkerjs.com)
  * [Changelog](https://github.com/oceanhouse21/dokker/wiki/Changelog)
  * [Release Notes](https://github.com/oceanhouse21/dokker/releases)
  * [Roadmap](https://github.com/oceanhouse21/dokker/wiki/Roadmap)
  * [More Resources](https://github.com/oceanhouse21/dokker/wiki/Resources)

## Contributors

Dokker.js was originally created by [georgschlenkhoff](https://github.com/georgschlenkhoff), and transferred to [kengz](https://github.com/kengz) on 16 Jun 2016 for further development.

 * [georgschlenkhoff](https://github.com/georgschlenkhoff) *(original author)*
 * [kengz](https://github.com/kengz)
