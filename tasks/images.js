const gulp = require('gulp');
const cache = require('gulp-cache');
const imagemin = require('gulp-imagemin');
const imageminMozjpeg = require('imagemin-mozjpeg'); 

module.exports = () => {
  return gulp.src('./src/assets/img/**/*')
    .pipe(cache(imagemin([
      imagemin.jpegtran({
        progressive: true
      }),
      imageminMozjpeg({
        quality: 50
      })
    ])))
    .pipe(gulp.dest('./docs/assets/img'))
};
