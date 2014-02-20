var gulp = require('gulp');
var jsmin = require('gulp-jsmin');
var rename = require('gulp-rename');

gulp.task('default', function () {
    gulp.src('bundles/bundle.js')
        .pipe(jsmin())
        .pipe(rename('bundle.min.js'))
        .pipe(gulp.dest('dist'));
});
