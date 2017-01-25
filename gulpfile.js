var gulp = require('gulp'),
	gutil = require('gulp-util'),
	concat = require('gulp-concat'),
	browserify = require('gulp-browserify'),
	bsConfig = require("gulp-bootstrap-configurator");
	minify = require('gulp-minify'),
	gulpIf = require('gulp-if'),
	uglify = require('gulp-uglify'),
	compass = require('gulp-compass');

	var env, 
	coffeeSources,
	javacriptSources,
	sassSources,
	htmlSources,
	jsonSources,
	outputDir,
	sassStyle;

var javacriptSources = [
	"components/scripts/head.js",
	"components/scripts/body.js"
	];

sassSources = ['components/SASS/style.sass'];

var bootstrapConfig = "components/bootstrapConfig/config.json";

var env = process.env.NODE_ENV || 'development';

if(env==='development') {
	outputDir = 'builds/development/';
	sassStyle = "expanded";
} else {
	outputDir = 'builds/production/';
	sassStyle = "compressed";
}

gulp.task("js", function() {
	gulp.src(javacriptSources)
	.pipe(concat('script.js'))
	.pipe(browserify())
    .pipe(minify({
    ext:{
	        src:'-debug.js',
	        min:'.js'
	    },
	    exclude: ['tasks'],
	    ignoreFiles: ['.combo.js', '-min.js']
    }))
	.pipe(gulp.dest(outputDir + 'js/'))
});


// compile sass to css
gulp.task('compass', function() {
  gulp.src(sassSources)
    .pipe(compass({
      sass: 'components/SASS',
      style: sassStyle
    }))
    .pipe(gulp.dest(outputDir + "/css/"));
});

// For Bootstrap css 
gulp.task('make-bootstrap-css', function(){
  return gulp.src(bootstrapConfig)
    .pipe(bsConfig.css())
    .pipe(gulp.dest("/assets"));
    // It will create `bootstrap.css` in directory `assets`. 
});
 
// For JS 
gulp.task('make-bootstrap-js', function(){
  return gulp.src(bootstrapConfig)
    .pipe(bsConfig.js())
    .pipe(gulp.dest("./assets"));
    // It will create `bootstrap.js` in directory `assets`. 
});



gulp.task('default', ['js', 'make-bootstrap-css', 'make-bootstrap-js', 'compass']);