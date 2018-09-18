const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync');
const babel = require('gulp-babel');

const autoprefixerOptions = {
      browsers: ['last 2 versions', '> 5%','Firefox ESR']
};

gulp.task('compileSassAutoP',()=>{
    return gulp.src('src/sass/*.sass')
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(autoprefixer(autoprefixerOptions))
    .pipe(gulp.dest('dist/assets'))
    .pipe(browserSync.reload({
      stream: true}));
});

gulp.task('compileJsBabel',()=>{
        gulp.src('src/js/*.js')
        .pipe(babel({
            presets: ["babel-preset-env"]
        }))
        .pipe(gulp.dest('dist/assets'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('browserSync', function(){
       browserSync.init({ server: {
                           baseDir: 'dist'
       }});
})

gulp.task('watch',['browserSync','compileSassAutoP','compileJsBabel'],()=>{
         gulp.watch('src/sass/*.sass',['compileSassAutoP']);
         gulp.watch('src/js/*.js',['compileJsBabel']);
         gulp.watch('dist/index.html',browserSync.reload);
});

