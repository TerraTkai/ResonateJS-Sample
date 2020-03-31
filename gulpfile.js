/// <binding ProjectOpened='default' />
"use strict";

var gulp = require("gulp"),
    minifyHtml = require("gulp-minify-html"),
    concat = require("gulp-concat"),
    uglify = require("gulp-uglify"),
    rename = require("gulp-rename"),
    cssmin = require("gulp-cssmin");

var modulesDestination = './wwwroot/modules';
var localizationDestination = './wwwroot/localization';

gulp.task('minify-sample-html', function (resolve) {
    gulp.src('./modules/sample/**/*.html')
        .pipe(concat('sample.html'))
        .pipe(minifyHtml())
        .pipe(gulp.dest(modulesDestination));
    resolve();
});

gulp.task('minify-sample-js', function (resolve) {
    gulp.src('./modules/sample/**/*.js')
        .pipe(concat('sample.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(modulesDestination));
    resolve();
});

gulp.task('minify-sample-css', function (resolve) {
    gulp.src('./modules/sample/**/*.css')
        .pipe(concat('sample.min.css'))
        .pipe(cssmin())
        .pipe(gulp.dest(modulesDestination));
    resolve();
});

gulp.task('minify-tasks-html', function (resolve) {
    gulp.src('./modules/tasks/**/*.html')
        .pipe(concat('tasks.html'))
        .pipe(minifyHtml())
        .pipe(gulp.dest(modulesDestination));
    resolve();
});

gulp.task('minify-tasks-js', function (resolve) {
    gulp.src('./modules/tasks/**/*.js')
        .pipe(concat('tasks.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(modulesDestination));
    resolve();
});

gulp.task('minify-tasks-css', function (resolve) {
    gulp.src('./modules/tasks/**/*.css')
        .pipe(concat('tasks.min.css'))
        .pipe(cssmin())
        .pipe(gulp.dest(modulesDestination));
    resolve();
});

gulp.task('copy-localization', function (resolve) {
    gulp.src('./modules/*/localization/*.json')
        .pipe(rename({ dirname: '' }))
        .pipe(gulp.dest(localizationDestination));
    resolve();
});

gulp.task('copy-resonate', function (resolve) {
    gulp.src('./../resonatejs.framework.web/wwwroot/resonate.min.js')
        .pipe(rename({ dirname: '' }))
        .pipe(gulp.dest('./wwwroot'));
    resolve();
});

gulp.task('watch', function (resolve) {
    gulp.watch('./modules/sample/**/*.html', gulp.series(['minify-sample-html']));
    gulp.watch('./modules/sample/**/*.js', gulp.series(['minify-sample-js']));
    gulp.watch('./modules/sample/**/*.css', gulp.series(['minify-sample-css']));

    gulp.watch('./modules/tasks/**/*.html', gulp.series(['minify-tasks-html']));
    gulp.watch('./modules/tasks/**/*.js', gulp.series(['minify-tasks-js']));
    gulp.watch('./modules/tasks/**/*.css', gulp.series(['minify-tasks-css']));

    gulp.watch('./modules/tasks/localization/*.json', gulp.series(['copy-localization']));
    gulp.watch('./modules/sample/localization/*.json', gulp.series(['copy-localization']));
    gulp.watch('./../resonatejs.framework.web/wwwroot/resonate.min.js', gulp.series(['copy-resonate']));
    resolve();
});

gulp.task('default', gulp.series([
    'minify-sample-html',
    'minify-sample-js',
    'minify-sample-css',
    'minify-tasks-html',
    'minify-tasks-js',
    'minify-tasks-css',
    'copy-localization',
    'copy-resonate',
    'watch']
));