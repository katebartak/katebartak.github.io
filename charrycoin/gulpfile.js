'use strict';

const gulp = require('gulp'),
  sass = require('gulp-sass'),
  debug = require('gulp-debug'),
  browserSync = require('browser-sync'),
  cached = require('gulp-cached'),
  postcss = require('gulp-postcss'),
  mqpacker = require('css-mqpacker'),
  $ = require('gulp-load-plugins'),
  autoprefixer = require('autoprefixer'),
  unprefix = require('postcss-unprefix'),
  useref = require('gulp-useref'),
  scsslint = require('gulp-scss-lint'),
  plumber = require('gulp-plumber'),
  gutil = require('gulp-util'),
  notify = require('gulp-notify'),
  cssnano = require('gulp-cssnano'),
  sourcemaps = require('gulp-sourcemaps'),
  babel = require('gulp-babel'),
  pug = require('gulp-pug'),
  remember = require('gulp-remember'),
  gulpif = require('gulp-if');

const globs = {
  scss: './app/scss/**/*.scss',
  css: './app/css',
  js: './app/js/main.js',
  pug: 'app/views/**/*',
  templates: './app/views/templates/*.pug',
  drupal_theme: '../'
};

const server = browserSync.create();

const IN_DRUPAL = false; // Set to true when prototype inside Drupal environment

// General Drupal theme globss to the files.
// This globss used for copy prototype files to Drupal theme.
const SOURCE_FILES = ['./app/css/**/*.*'];

// SASS compile
let scss = () => {
  return gulp
    .src(globs.scss)
    .pipe(plumber({ errorHandler: errorHandler }))
    .pipe(sourcemaps.init())
    .pipe(sass({ errLogToConsole: true, outputStyle: 'expanded' }))
    .pipe(postcss([unprefix(), autoprefixer(), mqpacker({ sort: true })]))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(globs.css))
    .pipe(gulpif(IN_DRUPAL, gulp.dest(globs.drupal_theme + 'css/')))
    .pipe(server.stream());
};

// SCSS Lint
let scssLint = () => {
  gulp.src([globs.scss, '!./app/scss/base/assets/_normalize.scss']).pipe(
    scsslint({
      config: 'lint.yml'
    })
  );
};

// Babael for ES2015
let scripts = () => {
  return gulp
    .src('./app/js/main.js')
    .pipe(plumber({ errorHandler: errorHandler }))
    .pipe(
      babel({
        presets: [
          [
            'env',
            {
              targets: {
                browsers: ['last 5 versions', 'safari >= 7']
              }
            }
          ]
        ]
      })
    )
    .pipe(gulp.dest('./app/js/es2015'))
    .pipe(gulpif(IN_DRUPAL, gulp.dest(globs.drupal_theme + 'js/')))
    .pipe(server.stream());
};

// Templates
gulp.task('templates', () => {
  return (
    gulp
      .src(globs.templates)
      // .pipe(cached('templates'))
      .pipe(pug({ pretty: true }))
      .pipe(remember('templates'))
      .pipe(gulp.dest('./app/'))
      .pipe(server.stream())
  );
});

// Browser sync
function serverRun(done) {
  server.init({
    notify: false,
    logPrefix: 'APP',
    server: {
      baseDir: './app'
    }
  });
  done();
}

function reload(done) {
  server.reload();
  done();
}

// Watchers
function watch(done) {
  gulp.watch(globs.scss, scss);
  gulp.watch(globs.js, scripts);
  gulp.watch(globs.pug, gulp.series('templates'));

  done();
}

gulp.task('serve', gulp.series(scss, scripts, 'templates', serverRun, watch));

gulp.task('build', function() {
  return gulp
    .src(globs.css + '/*.css')
    .pipe(cssnano({ safe: true }))
    .pipe(gulp.dest(globs.drupal_theme + 'css/'));
});

// TODO: finalize this later
var errorHandler = function(error) {
  let report = '\n',
    notifyMessage = '',
    chalk = gutil.colors.white.bgRed,
    chalkYellow = gutil.colors.yellow.bgRed,
    chalkBgYellow = gutil.colors.gray.bgYellow,
    fileNameFull = '',
    name = '',
    nameIndex,
    fileNameShort;

  let getFileName = function() {
      name = error.relativePath
        ? (name = error.relativePath)
        : (name = error.fileName);

      nameIndex = name.lastIndexOf('/') + 1;
      fileNameShort = name.substring(nameIndex);

      return fileNameShort;
    },
    getMessageText = function() {
      return error.messageOriginal ? error.messageOriginal : error.message;
    };

  if (error.plugin) {
    report += chalk('Plugin:') + '[' + error.plugin + ']\n';
  }

  if (error.message) {
    report += chalk('Error:') + ' ' + error.message + '\n';
  }

  console.error(report);

  // ----------------------------------------------
  // Notification
  if (error.line && error.column) {
    fileNameFull = getFileName();

    notifyMessage = `${fileNameFull} Line: ${
      error.line
    } \n\ ${getMessageText()}`;
  } else {
    notifyMessage = '';
  }

  notify({
    title: error.plugin,
    message: notifyMessage
  }).write(error);

  gutil.beep(); // System beep (backup)

  // ----------------------------------------------
  // Prevent the 'watch' task from stopping
  this.emit('end');
};
