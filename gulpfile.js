const gulp        = require('gulp');
const browserSync = require('browser-sync').create();
const sass        = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const rename = require("gulp-rename");

gulp.task('server', function() {
    browserSync.init({
        server: {
            baseDir: "src"
        }
    });

    gulp.watch("src/*.html").on('change', browserSync.reload);
});

gulp.task('styles', function() {
    return gulp.src("src/sass/**/*.+(scss|sass)")
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(rename({suffix: '.min', prefix: ''}))

        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest("src/css/"))
        .pipe(browserSync.stream());
});

gulp.task('watch', function() {
    return gulp.watch("src/sass/**/*.+(scss|sass)", gulp.parallel('styles'))
        .on('error', (err) => {
        console.error('Watcher error:', err);
        process.exit(1);
    });
})

function server(done) {
  browserSync.init({ server: './dist' });
  done(); // <- говорим Gulp, что задача завершена
}

gulp.task('default', gulp.parallel('watch', 'server', 'styles'));