// Dependencies
var gulp          = require( 'gulp' ),
    gulp_sass     = require( 'gulp-sass' ),
    gulp_plumber  = require('gulp-plumber'),
    gulp_notify   = require("gulp-notify"),
    gulp_cssnano  = require( 'gulp-cssnano' ),
    gulp_rename   = require( 'gulp-rename' ),
    gulp_concat   = require( 'gulp-concat' ),
    gulp_uglify   = require( 'gulp-uglify' ),
    browserSync   = require('browser-sync').create(),
    autoprefixer  = require('gulp-autoprefixer'),
    imagemin      = require('gulp-imagemin');

var autoprefixerOptions = {
  browsers : ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1']
};

// Static server
gulp.task('browser-sync', function() {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
});

// SCSS convertion task
gulp.task( 'sass', function(){
  return gulp.src( './assets/sass/main.scss' )   // main.scss as input
    .pipe(gulp_plumber({errorHandler: gulp_notify.onError("Error: <%= error.message %>")}))   // Gère les erreurs
    .pipe(gulp_sass())                  // Convert to CSS
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe(gulp.dest( './assets/css/' ))   // Put it in CSS folder
    .pipe(browserSync.reload({stream:true}));
} );

// min CSS task
gulp.task( 'min_css', function(){
  return gulp.src( './assets/css/main.css' )
    .pipe( gulp_cssnano() )
    .pipe( gulp_rename( 'style.min.css' ) )
    .pipe( gulp.dest( './assets/css/' ) );
} );

// min JS
gulp.task( 'js', function(){
  return gulp.src( [
    './assets/js/script.js',
  ] )
    .pipe( gulp_concat( 'script.min.js' ) )
    .pipe( gulp_uglify() )
    .pipe( gulp.dest( './assets/js/' ) );
} );

// min Images
gulp.task('minImages', function(){
  gulp.src('./assets/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('./assets/images/'))
});

// Watch task
gulp.task( 'watch', ['browser-sync', 'sass', 'min_css', 'js', 'minImages'], function(){
  gulp.watch( './assets/sass/main.scss', ['sass']);
  gulp.watch( [ './assets/sass/**',
               '!./assets/js/script.min.js' ],
             ['js']);
  gulp.watch('index.html', browserSync.reload);
  gulp.watch('assets/js/*.js', browserSync.reload);
} );

gulp.task('default', ['sass', 'js', 'watch']);
