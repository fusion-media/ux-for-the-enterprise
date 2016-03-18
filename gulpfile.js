var gulp         = require('gulp');
var sass         = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var combineMq    = require('gulp-combine-mq');
var uglify       = require('gulp-uglify');
var imagemin     = require('gulp-imagemin');
var pngquant     = require('imagemin-pngquant');
var rename       = require('gulp-rename');
var gulpCopy     = require('gulp-copy');

gulp.task('styles', function() {
    gulp.src('src/_scss/app.scss')
        .pipe(sass({
            outputStyle: 'compressed',
            precision: 7
            }).on('error', sass.logError))
        .pipe(combineMq({
                beautify: false
            }))
        .pipe(autoprefixer({
                browsers: ['last 5 versions', 'ie > 8', 'ff > 3'],
                cascade: false
            }))
        .pipe(rename('app.min.css'))
        .pipe(gulp.dest('./dist/assets/css'))
});


gulp.task('html', function() {
    gulp.src('src/**/*.html')
        .pipe(gulp.dest('./dist/'));
});


gulp.task('js', function() {
    gulp.src('src/_js/*.js')
        .pipe(uglify())
        .pipe(rename(function (path) {
            path.extname = '.min.js';
        }))
        .pipe(gulp.dest('./dist/assets/js'));
});


gulp.task('img', function() {
    gulp.src('src/_img/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [
                {removeViewBox: false},
                {cleanupIDs: false}
            ],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('dist/assets/img'));
});


gulp.task('default', ['styles', 'html', 'js', 'img'], function() {
    gulp.watch('src/**/*.scss', ['styles']);
    gulp.watch('src/**/*.html', ['html']);
    gulp.watch('src/**/*.js', ['js']);
    gulp.watch('src/img/*', ['img']);
});