// dependencies
var browserSync = require('browser-sync').create();
var cp = require('child_process');
var gulp = require('gulp');
var path = require('path');
var q = require('q');

// working path
var wpath = path.join(process.cwd());

// gulp entry point
gulp.task('default', ['start']);
gulp.task('start', ['build', 'reload', 'watch']);

// watch for file changes in wpath
gulp.task('watch', ['reload'], function() {
    gulp.watch(wpath + '/*.js', ['build', 'reload'])
})

// gulp.task('build', exec.bind('some build command here'))
gulp.task('build', exec.bind((wpath+'/node_modules/dokker/bin/dokker').replace(/\s/, '\\ ')))
// Reloading browserSync
gulp.task('reload', ['build'], reload);

// reload browserSync
function reload() {
    var defer = q.defer();

    if (browserSync.active) {
        browserSync.reload();
        defer.resolve();
    } else
    startServer().then(defer.resolve);

    return defer.promise;
}

// start a browserSync server to index.html directly
function startServer() {
    var defer = q.defer();

    var serverConfig = {
        server: {
            baseDir: wpath,
            directory: true
        },
        startPath: 'docs/index.html',
        // browser: "google chrome",
        logPrefix: 'SERVER'
    };
    browserSync.init(serverConfig, defer.resolve);

    return defer.promise;
}

// terminal exec task with promise: use as exec.bind(<command>)
function exec() {
    var defer = q.defer();
    cp.exec(this, function(err, stdout, stderr) {
        if (err) console.log('exec err: '+ err);
        console.log(stdout);
        defer.resolve(err)
    })
    return defer.promise;
}

// // export for normal render run
function gulpex(options){
	// set process.env.DIR then run task
	// return exec.bind('DIR='+ options.dir)()
	// .done(gulp.start('default'))
	return gulp.start('default')
}
exports.gulpex = gulpex;