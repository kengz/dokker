var express = require('express');
var app = express();
var path = require('path');
var livereload = require('livereload');
var path = path.join(process.cwd(), process.env.DIR);
livereload.createServer({exts: ['applyJSLive']}).watch(path);
app.use(express.static(path));
app.listen(9000);
