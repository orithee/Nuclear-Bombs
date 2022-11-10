const gulp = require('gulp');
const clean = require('gulp-clean');
const rename = require('gulp-rename');
const webpack = require('webpack-stream');
const { exec } = require('child_process');

const webpackConfig = require('./webpack.config.js');

// Removes previous dist
gulp.task('clean', () => {
  return gulp.src('./dist', { allowEmpty: true }).pipe(clean());
});

// Creates js bundle from several js files
gulp.task('bundle', () => {
  return webpack(webpackConfig).pipe(gulp.dest('./dist'));
});

// Watch tsc files
gulp.task('watch-tsc', () => {
  return gulp.watch('./dist/tsc/client/**/*.js', gulp.series('bundle'));
});

// Initial ts compile
gulp.task('tsc', (cb) => {
  exec('tsc', () => cb());
});

// Watch ts files and recompile
gulp.task('tsc-w', () => {
  const tsc = exec('tsc -w --preserveWatchOutput --pretty');
  tsc.stdout.on('data', (data) => console.log(data));
  tsc.stderr.on('data', (data) => console.error(data));
  tsc.on('close', (code) => console.log(`tsc exited with code ${code}`));
});

// Start express
gulp.task('express', () => {
  const tsc = exec('nodemon --watch ./src/server ./src/server/server.ts');
  tsc.stdout.on('data', (data) => console.log(data));
  tsc.stderr.on('data', (data) => console.error(data));
});

gulp.task('build', gulp.series('clean', 'tsc', 'bundle'));

// Heroku copy dist files
gulp.task('heroku-copy-dist', () => {
  return gulp.src(['./react/build/**/*']).pipe(gulp.dest('./deploy/dist'));
});

// Heroku copy root files
gulp.task('heroku-copy-root', () => {
  return gulp
    .src(['./package.json', './package-lock.json', './Procfile'])
    .pipe(gulp.dest('./deploy'));
});

// Heroku clean files
gulp.task('heroku-clean', () => {
  return gulp
    .src(
      [
        './deploy/Procfile',
        './deploy/package.json',
        './deploy/package-lock.json',
        './deploy/tsconfig.tsbuildinfo',
      ],
      { allowEmpty: true }
    )
    .pipe(clean());
});

// Heroku deploy
gulp.task(
  'deploy',
  gulp.series('heroku-clean', 'heroku-copy-root', 'heroku-copy-dist')
);

gulp.task(
  'default',
  gulp.series('build', gulp.parallel('watch-tsc', 'tsc-w', 'express'))
);
