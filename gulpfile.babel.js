const gulp = require('gulp');
import runSequence from 'run-sequence';

// load gulp tasks from ./tasks
require('gulp-load-tasks')();

// default tasks
gulp.task('default', ['clean'], cb =>
  runSequence(
    'styles',
    ['lint', 'scripts', 'images'],
    'nunjucks',
    cb
  )
);

// ship it!
gulp.task('ship', ['default'], cb =>
  runSequence(
    'deploy',
    'slack',
    cb
  )
);

// delete it!
gulp.task('nuke', cb =>
  runSequence(
    'delete',
    'slack',
    cb
  )
);
