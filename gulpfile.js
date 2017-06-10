const gulp = require('gulp')
const browserify = require('browserify')
const babelify = require('babelify')
const source = require('vinyl-source-stream')
const buffer = require('vinyl-buffer')
const sourcemaps = require('gulp-sourcemaps')
const gutil = require('gulp-util')

gulp.task('default', () => {
  const b = browserify({
    entries: './app.js',
    debug: true,
    transform: [
      babelify.configure({
        presets: ['es2015', 'react']
      })
    ]
  })

  return b.bundle()
    .on('error', err => gutil.log(`Browserify: ${err}`))
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .on('error', err => gutil.log(err))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./public/'))
})
