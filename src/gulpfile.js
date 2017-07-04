var gulp = require('gulp'),
    minifycss = require('gulp-minify-css');



gulp.task('uikit.css', function () {
    return gulp.src('node_modules/uikit/dist/css/*.css')
                .pipe(gulp.dest('./static/uikit/css'));
});
gulp.task('uikit.js', function () {
    return gulp.src('node_modules/uikit/dist/js/*.js')
    .pipe(gulp.dest('./static/uikit/js'));
});

gulp.task('normalize', function () {
    return gulp
            .src('node_modules/normalize.css/*.css')
            .pipe(gulp.dest('./static/normalize'));
});

gulp.task('jquery', function () {
    return gulp.src('node_modules/jquery/dist/*.js')
                .pipe(gulp.dest('./static/plugins/jquery'));
})

gulp.task('default', ['uikit.css', 'uikit.js', 'normalize', 'jquery']);