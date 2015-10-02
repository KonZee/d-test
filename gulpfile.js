var gulp = require('gulp'),
    jade = require('gulp-jade'),
    stylus = require('gulp-stylus'),
    browserSync = require('browser-sync'),
    imagemin = require('gulp-imagemin'),
    del = require('del'),
    runSequence = require('run-sequence'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    mqpacker = require('css-mqpacker'),
    cssnext = require('cssnext'),
    jshint = require('gulp-jshint'),
    csscomb = require('gulp-csscomb'),
    plumber = require('gulp-plumber');

var path = {};
path.src = "src/";
path.dest = "dist/";

path.jade = path.src + "templates/*.jade";
path.jadeWatch = path.src + "templates/**/*.jade"

path.stylus = [
	path.src + "styles/custom/**/*.styl",
	path.src + "styles/bootstrap/bootstrap.styl"
];
path.stylusWatch = path.src + "styles/**/*.styl";

path.js = path.src + "scripts/**/*.js";
path.jshint = [
	path.dest + "js/**/*.js",
	"!" + path.dest + "js/libs/**/*.js",
	"!" + path.dest + "js**/*.min.js"
]

path.images = path.src + "images/**/*.+(png|jpg|gif)";
path.svg= path.src + "images/**/*.svg";

path.fonts = path.src + "fonts/**/*.*";

/*
 * Layout
 */

gulp.task('jade', function(){
	return gulp.src(path.jade)
	.pipe(plumber())
	.pipe(jade({pretty : true}))
	.pipe(gulp.dest(path.dest))
	.pipe(browserSync.stream());
});
/*
 * Styles
 */

gulp.task('stylus', function(){
	var processors = [
		autoprefixer(),
		mqpacker,
		cssnext()
	];
	return gulp.src(path.stylus)
	.pipe(plumber())
	.pipe(stylus())
	.pipe(postcss(processors))
	.pipe(csscomb())
	.pipe(gulp.dest(path.dest + "css"))
	.pipe(browserSync.stream());
});

/*
 * JS
 */
gulp.task('js-copy', function(){
	return gulp.src(path.js)
	.pipe(plumber())
	.pipe(gulp.dest(path.dest + "js"));
});

gulp.task('js', ['js-copy'], function(){
	return gulp.src(path.jshint)
	.pipe(plumber())
	.pipe(jshint())
	.pipe(jshint.reporter('default'));
});

/*
 * Other
 */
gulp.task('clean', function(){
	del(path.dest);
});


gulp.task('imagemin', function(){
	return gulp.src(path.images)
	.pipe(plumber())
	.pipe(imagemin())
	.pipe(gulp.dest(path.dest + "images"));
});

gulp.task('svg', function(){
	return gulp.src(path.svg)
	.pipe(plumber())
	.pipe(gulp.dest(path.dest + "images"));
});

gulp.task('fonts', function(){
	return gulp.src(path.fonts)
	.pipe(plumber())
	.pipe(gulp.dest(path.dest + "css/fonts"));
});

/*
 * Watching && Browser Sync
 */
gulp.task('watch', function(){
	gulp.watch(path.jadeWatch, ['jade']);
	gulp.watch(path.stylusWatch, ['stylus']);
	gulp.watch(path.js, ['js']);
	gulp.watch(path.images, ['imagemin']);
	gulp.watch(path.svg, ['svg']);
	gulp.watch(path.fonts, ['fonts']);
});

gulp.task('browsersync', function(){
	browserSync({
		server: {
			baseDir: path.dest,
			index: "index.html"
		},
		open: false,
	})
});

gulp.task('default', function(callback){
	runSequence(['jade', 'stylus', 'js', 'imagemin', 'svg', 'fonts'], ['watch', 'browsersync'], callback);
});