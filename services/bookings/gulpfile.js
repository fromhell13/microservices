const gulp = require('gulp');
const nodemon = require('gulp-nodemon');

/*
tasks
 */

gulp.task('start', () => {
  nodemon({
    script: './src/server',
    ext: 'js html'
  });
});



/*
default
 */

gulp.task('default', gulp.series('start'));