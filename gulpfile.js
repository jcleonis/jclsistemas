var gulp = require('gulp');
var sass = require('gulp-sass');
var cssclean = require('gulp-clean-css');
var htmlmin = require('gulp-htmlmin');
var notify = require('gulp-notify');
var imagemin = require('gulp-imagemin');

var srcDirectoryScss = './src/scss/**/*.scss';
var distDirectoryCss = './dist/css/';

var srcDirectoryJScript = './src/js/**/*.js';
var distDirectoryJScript = './dist/js/';

var srcDirectoryHtml = './src/html/*.html';
var distDirectoryHtml = './dist';

var srcDirectoryImages = './src/img/**/*.*';
var distDirectoryImage = './dist/img/';

// Esta tarefa compila o sass e minifica o CSS e copia para a pasta dist/css
gulp.task('css', function() {
    return gulp.src(srcDirectoryScss)
        .pipe(sass({ outputStyle: 'compressed' }))
        .pipe(sass().on('error', notify.onError({
            title: "Compilação e compressão do SCSS",
            message: " <%= error.message%>"
        })))
        .pipe(gulp.dest(distDirectoryCss));
});

// Esta tarefa minifica o html e copia para a pasta /dist
gulp.task('html', function() {
    return gulp.src(srcDirectoryHtml)
        .pipe(htmlmin({ collapseWhitespace: true }))
        .on('error', notify.onError({
            title: "Compilação e compressão do html",
            message: " <%= error.message%>"
        }))
        .pipe(gulp.dest(distDirectoryHtml));
});

gulp.task('images', function() {
    return gulp.src(srcDirectoryImages)
        .pipe(imagemin({ optimizationLevel: 5 }))
        .pipe(gulp.dest(distDirectoryImage));
});

gulp.task('dev', function() {
    gulp.watch(srcDirectoryScss, ['css']);
    gulp.watch(srcDirectoryHtml, ['html']);
});

gulp.task('default', ['css', 'html', 'images']);