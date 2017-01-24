var gulp = require('gulp'),
	gutil = require('gulp-util'),
	concat = require('gulp-concat'),
	browserify = require('gulp-browserify'),
	jquery = require('jquery');
	

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
	.pipe(gulp.dest(outputDir + "js/"))
});

gulp.task('default', ['js']);