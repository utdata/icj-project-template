const gulp = require('gulp');
const cache = require('gulp-cache');
const imagemin = require('gulp-imagemin');
 
module.exports = () => {
  return gulp.src('./src/assets/img/**/*')
    .pipe(cache(imagemin({
      progressive: true,
      interlaced: true,
      optimizationLevel: 2,
    })))
    .pipe(gulp.dest('./docs/assets/img'))
};
