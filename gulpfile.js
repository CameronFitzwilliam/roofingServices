var gulp = require('gulp'),
	gutil = require('gulp-util'),
	concat = require('gulp-concat'),
	browserify = require('gulp-browserify'),
	bsConfig = require("gulp-bootstrap-configurator");
	minify = require('gulp-minify'),
	gulpIf = require('gulp-if'),
	uglify = require('gulp-uglify'),
	compass = require('gulp-compass'),
	cache = require('gulp-cache'),
	directoryMap = require('gulp-directory-map');
  
	var env, 
	javacriptSources,
	sassSources,
	htmlSources,
	outputDir,
	sassStyle;

var javacriptSources = [
	"components/scripts/libraries.js",
	"components/scripts/jquery.lazyload.js",
	"components/scripts/body.js",
	"components/bootstrapAssets/bootstrap.js",
	"components/scripts/onload.js"
	];

var bootstrapAssets = "components/bootstrapAssets";
var sassSources = 'components/SASS/style.scss';
var bootstrapConfig = "components/bootstrapConfig/config.json";
var fancyBox = "node_modules/jquery-fancybox/source/scss/jquery.fancybox.scss";


var env = process.env.NODE_ENV || 'development';

if(env === 'development') {
	outputDir = 'builds/development/';
	sassStyle = "expanded";
} else {
	outputDir = 'builds/production/';
	sassStyle = "compressed";
}

// For Bootstrap css 
gulp.task('make-bootstrap-css', function(){
  gulp.src(bootstrapConfig)
    .pipe(bsConfig.css())
    .pipe(gulp.dest(outputDir + 'lib/css'));
     gulp.src(fancyBox)
    .pipe(gulp.dest(outputDir + 'lib/css'));
    // It will create `bootstrap.css` in directory `assets`. 
});




// For JS 
gulp.task('make-bootstrap-js', function(){
  gulp.src(bootstrapConfig)
    .pipe(bsConfig.js())
    .pipe(gulp.dest(bootstrapAssets));
    // It will create `bootstrap.js` in directory `assets`. 
});

// // compile sass to css
gulp.task('compass', function() {
  gulp.src(sassSources)
    .pipe(compass({
      sass: 'components/SASS',
      style: sassStyle
    }))
    .pipe(gulp.dest(outputDir + "css/"));
});
 

gulp.task('directory-json', function() {
	gulp.src('builds/development/img/uploads/*.jpg')
	.pipe(directoryMap({
		filename: 'images.json'
	}))
	.pipe(gulp.dest('builds/development/js'));
})


gulp.task('js', function() {
	gulp.src(javacriptSources)
	.pipe(concat('script.js'))
	.pipe(browserify())
    .pipe(gulpIf(env === 'production', minify()))
	.pipe(gulp.dest(outputDir + 'js/'))

});

gulp.task('clear-cache', function (done) {
  return cache.clearAll(done);
});

gulp.task('default', ['js', 'make-bootstrap-css', 'make-bootstrap-js', 'compass', 'clear-cache', 'directory-json']);