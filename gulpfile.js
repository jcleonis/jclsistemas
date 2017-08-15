var gulp = require('gulp');
var sass = require('gulp-sass');
var cssclean = require('gulp-clean-css');
var htmlmin = require('gulp-htmlmin');
var notify = require('gulp-notify');
var imagemin = require('gulp-imagemin');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

// html folders
var srcDirectoryHtml = './src/html/*.html';
var distDirectoryHtml = './dist';
// sass folders
var srcDirectoryScss = {
    style: ['./src/scss/style.scss',
        './src/components/animate.css/animate.css'
    ],
    scss: './src/scss/*.scss'
};
var distDirectoryCss = './dist/css/';
//js folders
var srcDirectoryJScript = {
    js: './src/js/**/*.js',
    wow: './src/components/wow/dist/wow.js',
    jquery: './src/components/jquery/dist/jquery.js',
    tether: './src/components/tether/dist/js/tether.js',
    bootstrap: './src/components/bootstrap/dist/js/bootstrap.js'
};
var distDirectoryJScript = './dist/js/';
//image folders
var srcDirectoryImages = './src/img/**/*.*';
var distDirectoryImage = './dist/img/';

// Esta tarefa minifica o html e copia para a pasta /dist
gulp.task('html', function() {
    return gulp.src(srcDirectoryHtml)
        .on('error', notify.onError({
            title: "Compilação e compressão do html",
            message: " <%= error.message%>"
        }))
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest(distDirectoryHtml));
});

// Esta tarefa compila o sass e minifica o CSS e copia para a pasta dist/css
gulp.task('css', function() {
    return gulp.src(srcDirectoryScss.style)
        .pipe(sass({ outputStyle: 'compressed' }).on('error', notify.onError({
            title: "Compilação e compressão do SCSS",
            message: " <%= error.message%>"
        })))
        .pipe(cssclean())
        .pipe(gulp.dest(distDirectoryCss));
});

/* Task minify js */
gulp.task("js", function() {
    return gulp.src([srcDirectoryJScript.jquery,
            srcDirectoryJScript.tether,
            srcDirectoryJScript.bootstrap,
            srcDirectoryJScript.wow,
            srcDirectoryJScript.js
        ])
        .pipe(concat("main.js"))
        .pipe(uglify())
        .pipe(gulp.dest(distDirectoryJScript))
});

/* Task concat js */
gulp.task('images', function() {
    return gulp.src(srcDirectoryImages)
        .on('error', notify.onError({
            title: "copia e compressão das imagens",
            message: " <%= error.message%>"
        }))
        .pipe(imagemin({ optimizationLevel: 10 }))
        .pipe(gulp.dest(distDirectoryImage));
});

// Task watching developer evolution
gulp.task('dev', function() {
    gulp.watch(srcDirectoryScss.scss, ['css']);
    gulp.watch(srcDirectoryHtml, ['html']);
    gulp.watch(srcDirectoryJScript.js, ['js']);
    gulp.watch(srcDirectoryImages, ['images']);
});

//task full compile website
gulp.task('default', ['css', 'js', 'html', 'images']);