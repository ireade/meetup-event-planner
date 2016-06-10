/*eslint-env node */

var gulp = require('gulp');
var gutil = require('gulp-util');


/* *************
	CSS
************* */

var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var scss = require('postcss-scss');
var autoprefixer = require('autoprefixer');

var postcssProcessors = [
	autoprefixer( {
		browsers: [
			'Explorer >= 11',
			'last 2 Explorer versions',
			'last 2 ExplorerMobile versions',
			'last 2 Edge versions',

			'last 2 Firefox versions',
			'last 2 FirefoxAndroid versions',

			'last 2 Chrome versions',
			'last 2 ChromeAndroid versions',

			'last 2 Safari versions',
			'last 2 iOS versions',

			'last 2 Opera versions',
			'last 2 OperaMini versions',
			'last 2 OperaMobile versions',

			'last 2 Android versions',
			'last 2 BlackBerry versions'
		]
	} )
];

var sassMainFile = 'sass/main.scss';
var sassFiles = 'sass/**/*.scss';

gulp.task('css', function() {
	gulp.src(sassMainFile)

		// PostCSS 
		.pipe(
			postcss(postcssProcessors, {syntax: scss})
		)

		// SASS to CSS
		.pipe(
			sass({ outputStyle: 'expanded' }) // compressed
			.on('error', gutil.log)
		)
		.pipe(gulp.dest('dist/assets/css'));
});



/* *************
	JS
************* */

var concat = require('gulp-concat');
var uglify = require('gulp-uglifyjs');

var babel = require('gulp-babel');

var jsFiles = 'scripts/**/*.js';

gulp.task('js', function() {
	gulp.src(jsFiles)

		// Babel
		.pipe(
			babel({ presets: ['es2015'] })
			.on('error', gutil.log)
		)
		.pipe(concat('main.js'))
		//.pipe(uglify())
		.pipe(gulp.dest('dist/assets/js'));
});


// LINTING

var eslint = require('gulp-eslint');

gulp.task('lint', function() {
	return gulp.src(jsFiles)
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(eslint.failOnError());
});





/* *************
  TEMPLATING
************* */

var nunjucksRender = require('gulp-nunjucks-render');
var data = require('gulp-data');

var eventsData = require('./events.json');

gulp.task('nunjucks', function() {
	return gulp.src('*.nunjucks')
		.pipe(
            data(function() {
				return eventsData;
            })
            .on('error', gutil.log)
        )
		.pipe(
		nunjucksRender({
			path: ['templates/']
		})
		.on('error', gutil.log)
		)
		.pipe(gulp.dest('dist/'));
});




/* *************
	SERVER
************* */

var browserSync = require('browser-sync');
gulp.task('connectWithBrowserSync', function() {
	browserSync.create();
	browserSync.init({
		server: './dist'
	});
});



	



/* *************
	WATCH
************* */

gulp.task('watch', function() {
	gulp.watch(sassFiles,['css']).on('change', browserSync.reload); 
	gulp.watch(jsFiles,['js', 'lint']).on('change', browserSync.reload);
	gulp.watch(['**/*.nunjucks', 'events.json'], ['nunjucks']).on('change', browserSync.reload);
});



/* *************
	DEFAULT
************* */

var activeTasks = ['connectWithBrowserSync', 'css', 'lint', 'nunjucks', 'watch'];

gulp.task('default', activeTasks);
