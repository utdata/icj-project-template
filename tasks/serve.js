const gulp = require('gulp');
import browserSync from 'browser-sync';
const reload = browserSync.reload;
 
module.exports = () => {
  browserSync({
    notify: false,
    server: 'docs',
    port: 3000
  });
  gulp.watch(['src/njk/**/*.html'], ['nunjucks', reload]);
  gulp.watch(['src/less/**/*.less'], ['styles', reload]);
  gulp.watch(['src/js/**/*.js'], ['lint', 'scripts', reload]);
  gulp.watch(['src/assets/img/**/*'], ['images', reload]);
};
