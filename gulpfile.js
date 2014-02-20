var gulp = require('gulp');
var jsmin = require('gulp-jsmin');
var rename = require('gulp-rename');

gulp.task('default', function () {
    gulp.src('validate.js')
        .pipe(jsmin())
        .pipe(rename('validate.min.js'))
        .pipe(gulp.dest('dist'));
});
