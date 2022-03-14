const gulp = require('gulp');
const less = require('gulp-less');


gulp.task('less', () => gulp.src('./src/components/**/*.less')
  .pipe(less())
  .pipe(gulp.dest('./dist')));

gulp.task('less-item', () => gulp.src('./src/components/**/style/*.*')
  .pipe(gulp.dest('./dist')));
