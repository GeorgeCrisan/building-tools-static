const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync');
const babel = require('gulp-babel');
const pug = require('gulp-pug');
const useref = require('gulp-useref');

const autoprefixerOptions = {
      browsers: ['last 2 versions', '> 5%','Firefox ESR']
};

gulp.task('compileSassAutoP',()=>{
    return gulp.src('src/sass/*.sass')
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe(gulp.dest('src/css'))
    .pipe(browserSync.reload({
      stream: true}));
});

gulp.task('views',()=>{
      return gulp.src('src/*.pug')
      .pipe(pug())
      .pipe(gulp.dest('src'))
      .pipe(browserSync.reload({
        stream: true
    }));
});

gulp.task('compileJsBabel',()=>{
     return gulp.src('src/jsraw/*.js')
        .pipe(babel({
            presets: ["babel-preset-env"]
        }))
        .pipe(gulp.dest('src/js'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('browserSync', function(){
       browserSync.init({ server: {
                           baseDir: 'src'
       }});
})

gulp.task('useref',()=>{
      return gulp.src('src/index.html')
      .pipe(useref())
      .pipe(gulp.dest('dist'))
});

gulp.task('start',['browserSync','views','compileJsBabel','compileSassAutoP'],()=>{
         gulp.watch('src/sass/*.sass',['compileSassAutoP']);
         gulp.watch('src/js/*.js',['compileJsBabel']);
         gulp.watch('src/index.pug',['views']);
});

