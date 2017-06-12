const gulp = require('gulp')
const browserify = require('browserify')
const babelify = require('babelify')
const source = require('vinyl-source-stream')
const buffer = require('vinyl-buffer')
const sourcemaps = require('gulp-sourcemaps')
const gutil = require('gulp-util')
const sass = require('gulp-sass')

gulp.task('react', () => {
  const b = browserify({
    entries: './app.js',
    debug: true,
    transform: [
      babelify.configure({
        presets: ['es2015', 'react'],
        plugins: ['transform-object-rest-spread']
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

gulp.task('sass', () => {
  return gulp.src('./scss/base.scss')
    .pipe(sass().on('error', err => sass.logError(err)))
    .pipe(gulp.dest('./public/css'))
})

gulp.task('watch', () => {
  gulp.watch([
    'app.js',
    'actions/*.js',
    'components/*.js',
    'containers/*.js',
    'reducers/*.js',
    'store/*.js'
  ], ['default'])
  gulp.watch('./scss/**/*.scss', ['sass'])
})

gulp.task('default', ['react', 'sass'])
