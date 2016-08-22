/**
 *      @ Author:Bates Wang
 *      @ Time: 2016/8/22.
 */

var
        gulp = require("gulp"),
        sass = require("gulp-ruby-sass"),
        minJs = require("gulp-uglify"),
        minCss = require("gulp-minify-css"),
        concatFile = require("gulp-concat"),
        server = require("gulp-webserver"),
        livereload = require("gulp-livereload"),
        minImg = require("gulp-imagemin"),
        minPng = require("imagemin-pngquant"),
        modifyFileName = require("gulp-rename"),
        change = require("gulp-changed"),
        autoEnd = require("gulp-autoprefixer");

/*Start     work*/

//  createServer
gulp.task("server",function(){
    gulp.src(".")
            .pipe(server({
                "livereload":true,
                "open":true
            }));
});
//  watchFile
gulp.task("watch",function(){
    gulp.watch("./src/sass/*.scss",["sass"]);
    gulp.watch("./src/images/*.{png,jpg,gif,svg}", ["minImg"]);
    gulp.watch("./src/js/*.js", ["minJs"]);
    gulp.watch("./src/css/*.css",["concat"]);
});
//  minJs
gulp.task("minJs",function(){
    gulp.src("./src/js/*.js")
            .pipe(modifyFileName({"suffix":".min"}))
            .pipe(minJs())
            .pipe(gulp.dest("./dist/js"));
});
//  useSass
gulp.task("sass",function(){
    sass("./src/sass/*.scss")
            .pipe(gulp.dest("./src/css"))
            .pipe(livereload())
});
//  minCss
//gulp.task("minCss",function(){
//    gulp.src("./src/css/*.css")
//            .pipe(modifyFileName({"suffix":".min"}))
//            .pipe(minCss())
//            .pipe(gulp.dest("./dist/css"))
//});
//  minImg
gulp.task("minImg",function(){
    gulp.src("./src/images/*.{png,jpg,gif,svg}")
            .pipe(change("./dist/images"))
            .pipe(minImg({
                "progressive": true,
                "svgoPlugins": [{"removeViewBox": false}],
                "use": [minPng()]
            }))
});
gulp.task("concat",function(){
    gulp.src("./src/css/*.css")
            .pipe(concatFile("bundle.css"))
            .pipe(modifyFileName({"suffix":".min"}))
            .pipe(minCss())
            .pipe(gulp.dest("./dist.css"));
});


//  default run
gulp.task("default",["watch","server","minJs","sass","concat","minImg"]);
/*End       work*/