'use strict';

import del from 'del';
import gulp from 'gulp';

gulp.task('clean:rules', () => {
  return del(['rules.json']);
});
