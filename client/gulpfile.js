// require npm modules
const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync');
const babel = require('gulp-babel');
const pug = require('gulp-pug');
const useref = require('gulp-useref');
const uglifyjs = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const cache = require('gulp-cache');
const runSequence = require('run-sequence');
const plumber = require('gulp-plumber');

//options for autoprefixer

const autoprefixerOptions = {
      browsers: ['last 2 versions', '> 5%','Firefox ESR']
};

// 1. task compile sass from src sass down to src 

gulp.task('compileSassAutoP',()=>{
    return gulp.src('src/sass/*.sass')
    .pipe(plumber())
    .pipe(sass({outputStyle: 'compressed',errLogToConsole: true}))
    .on('error', catchErr)
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe(gulp.dest('src/css'))
    .pipe(browserSync.reload({
      stream: true}));
});

function catchErr(e) {
    console.log(e);
    this.emit('end');
  }

// 2. task pug

gulp.task('views',()=>{
      return gulp.src('src/*.pug')
      .pipe(pug({
        pretty: true
      }))
      .pipe(gulp.dest('src'))
      .pipe(browserSync.reload({
        stream: true
    }));
});

//3. task compile es6 to es5 and minify/uglify compress

gulp.task('compileJsBabel',()=>{
     return gulp.src('src/jsraw/*.js')
        .pipe(babel({
            presets: ["babel-preset-env"]
        }))
        .pipe(uglifyjs())
        .pipe(gulp.dest('src/js'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

//4. setup brwserSync
gulp.task('browserSync', function(){
       browserSync.init({ server: {
                           baseDir: 'src'
       }});
})

 //5. task to optimize images

gulp.task('images',()=>{
     return gulp.src('src/images/*.+(png|jpg|gif|svg)')
            .pipe(cache(imagemin([
                imagemin.gifsicle({interlaced: true}),
                imagemin.jpegtran({progressive: true}),
                imagemin.optipng({optimizationLevel: 5}),
                imagemin.svgo({
                    plugins: [
                        {removeViewBox: true},
                        {cleanupIDs: false}
                    ]
                })
            ])))
            .pipe(gulp.dest('dist/assets/img'))
});

//6. task to move fonst from src to dist folder
gulp.task('movefonts',()=>{
        return gulp.src('src/fonts/**/*')
        .pipe(gulp.dest('dist/fonts'))
});

//7. useref to concatenate js and css using conditionals comments in pug/html

gulp.task('useref',()=>{
      return gulp.src('src/index.html')
      .pipe(useref())
      .pipe(gulp.dest('dist'))
});

//.8 task to development. watch files and reload take care of task nr 1,2,3,4;

gulp.task('start',['browserSync','views','compileJsBabel','compileSassAutoP'],()=>{
         gulp.watch('src/sass/*.sass',['compileSassAutoP']);
         gulp.watch('src/jsraw/*.js',['compileJsBabel']);
         gulp.watch('src/index.pug',['views']);
});



//task to build 

gulp.task('build',(callback)=>{
       runSequence(['images','movefonts','useref'],callback);
});
