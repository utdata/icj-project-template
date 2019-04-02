const gulp = require('gulp');
const cache = require('gulp-cache');
const imagemin = require('gulp-imagemin');
const imageminMozjpeg = require('imagemin-mozjpeg'); 
const imageminGiflossy = require('imagemin-giflossy');
const imageminPngquant = require('imagemin-pngquant');
const imageminWebp = require('imagemin-webp');

module.exports = () => {
  return gulp.src('./src/img/**/*')
    .pipe(cache(imagemin([
      // lossy jpg compression
      imageminMozjpeg({
        quality: 50
      }),
      // png compression
      imageminPngquant({
        speed: 1,
        quality: 98 //lossy settings
      }),
      // gif very light lossy.
      imageminGiflossy({
        optimizationLevel: 3,
        optimize: 3, //keep-empty: Preserve empty transparent frames
        lossy: 2
      }),
      // webp google givs
      imageminWebp({
        quality: 50
      })
  ])))
    .pipe(gulp.dest('./docs/img'))
};
