var gulp = require('gulp');
var inlineResources = require('./inline-resources');
var del = require("del");

var inputRoute = './src/app/editable-table';
var outputRoute = './dist/'

gulp.task('copy-and-inline-resource', copyHtml);

function copyHtml() {
  return gulp.src(inputRoute + '/**/*.html')
    .pipe(gulp.dest(outputRoute)).on('end', copyAssets);
}

function copyAssets() {
  return gulp.src('./src/assets/**/*')
    .pipe(gulp.dest('./dist/assets')).on('end', copyCss);
}
function copyCss() {
  return gulp.src(inputRoute + '/**/*.css')
    .pipe(gulp.dest(outputRoute)).on('end', inlineResource);
}

function inlineResource() {
  inlineResources(outputRoute)
    .then(del([outputRoute + '/**/*.html', outputRoute + '/**/*.css']));
}

gulp.task('default', gulp.series('copy-and-inline-resource'));
