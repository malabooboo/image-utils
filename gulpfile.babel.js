import gulp from 'gulp';
import imageResize from 'gulp-image-resize';
import rename from 'gulp-rename';
import util from 'gulp-util';

let argv = require('yargs').argv;

/**
 * Quick resize
 * Usage: gulp resize -s [pixel size]
 */
gulp.task('resize', () => {
  gulp.src('src/**/*.{jpg,png}')
      .pipe(imageResize({width : argv.s, crop : false, upscale : false}))
      .pipe(rename(function(path) { path.basename += "-" + argv.s; }))
      .pipe(gulp.dest('exported/' + argv.s + '/'))
      .on('end',
          () => { util.log(util.colors.black.bgGreen('Resizing done')); });
});

/**
 * Exports various Growth Engine icon sizes.
 */
const iconSizes = [];

[128, 64, 32, 16].forEach((size) => {
  let resizeImageTask = 'resize_' + size;
  gulp.task(
      resizeImageTask,
      () => {
          return gulp.src('src/**/*.{jpg,png}')
              .pipe(imageResize({width : size, crop : false, upscale : false}))
              .pipe(rename(function(path) { path.basename += "-" + size; }))
              .pipe(gulp.dest('exported/' + size + '/'))});
  iconSizes.push(resizeImageTask);
});

gulp.task('icons', iconSizes);
