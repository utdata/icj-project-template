const gulp = require('gulp');
const browserSync = require('browser-sync');
const reload = browserSync.reload;
 
module.exports = () => {
  browserSync({
    notify: false,
    server: 'docs',
    port: 3000
  });
  gulp.watch(['src/njk/**/*.html','src/njk/**/*.njk','src/njk/**/*.json'], gulp.series('nunjucks', reload));
  gulp.watch(
    ['node_modules/bootstrap/scss/bootstrap.scss','src/scss/**/*.scss'],
    gulp.series('styles', reload)
    );
  gulp.watch(['src/js/**/*.js'], gulp.series('lint', 'scripts', reload));
  gulp.watch(['src/assets/img/**/*'], gulp.series('images', reload));
};