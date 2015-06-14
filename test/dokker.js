'use strict';

var fs = require('fs');
var path = require('path');
var Dokker = require('../dokker');
var Promise = require('promise');
var read = Promise.denodeify(fs.readFile);
var assert = require('assert');
var options;

describe('Dokker', function(){

  before(function(done){
    Dokker.configure()
    .then(function(data){
      options = data;
      done();
    });
  });

  describe('.literate()', function(){
    it('creates a HTML file from annotated source code', function(done){
      return Dokker.literate(options.literate)
      .then(function(){
        done();
      }).done();
    });
  });

  describe('.jsdocMarkdown()', function() {
    it('creates a markdown file from JSDOC comments', function(done){
      return Dokker.jsdocMarkdown(options.jsdoc)
      .then(function(){
        return read(options.jsdoc.markdown);
      }).then(function(){
        done();
      }).done();
    });
  });

  describe('.jsdocHtml()', function() {
    it('creates a HTML file from JSDOC commments', function(done){
      return Dokker.jsdocHtml(options.jsdoc)
      .then(function(){
        return read(options.jsdoc.html);
      }).then(function(){
        done();
      }).done();
    });
  });
  
  describe('.injectTemplate()', function(){
    it('injects index.html file in ejs template', function(done){
      return Dokker.injectTemplate(options.jsdoc)
      .then(function() {
        return read(options.jsdoc.html, 'utf8');
      }).then(function(data){
        assert(/<!DOCTYPE html>/.test(data));
        done();
      }).done();
    });
  });

  describe('.copyTemplate()', function() {
    it('copies styles and app.js from template folder', function(done){
      return Dokker.copyTemplate(options)
      .then(function(){
        return read(path.join(__dirname, '..', options.dir, 'styles.css'));
      }).then(function(data){
        assert(data);
        done();
      }).done();
    });
  });

});
