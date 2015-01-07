var gulp = require('gulp');
var sass = require('gulp-sass');
var traceur = require('gulp-traceur');
var browserify = require('gulp-browserify');
var concat = require('gulp-concat');

gulp.task('sass', function () {
  gulp.src('src/sass/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('dist/css'));
});

gulp.task('js', function() {
  gulp.src('src/js/index.js')
    .pipe(browserify({transform: 'reactify'}))
    .pipe(concat('index.js'))
    .pipe(traceur())
    .pipe(gulp.dest('dist/js'));
});

gulp.task('copy', function() {
  gulp.src('src/index.html')
    .pipe(gulp.dest('dist'));
});

gulp.task('build', ['sass', 'js', 'copy']);

gulp.task('watch', ['build'], function() {
  gulp.watch('src/**/*.*', ['build']);
});

gulp.task('default', ['build']);
