/**
 *      @ Author:Bates Wang
 *      @ Time: 2016/8/22.
 */
//  require module
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
        autoEnd = require("gulp-autoprefixer"),
        minHtml = require("gulp-htmlmin"),
        rev = require("gulp-rev"),
        revCollector = require('gulp-rev-collector');

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
    gulp.watch("./template/*.html",["minHtml"]);
    gulp.watch("./src/sass/partials/*.scss");
    gulp.watch("./src/sass/*.scss",["sass"]);
    gulp.watch("./src/images/*.{png,jpg,gif,svg}", ["minImg"]);
    gulp.watch("./src/js/*.js", ["minJs"]);
    gulp.watch("./src/css/*.css",["concat"]);
});

//  minJs
gulp.task("minJs",function(){
    gulp.src("./src/js/*.js")
            .pipe(concatFile("bundle.js"))
            .pipe(modifyFileName({"suffix":".min"}))
            .pipe(minJs())
            .pipe(gulp.dest("./dist/js"));
});

//  useSass
gulp.task("sass",function(){
    sass("./src/sass/*.scss",{style:"expanded"})
            .pipe(gulp.dest("./src/css"))
            .pipe(livereload())
});

//  minImg
gulp.task("minImg",function(){
    gulp.src("./src/images/*.{png,jpg,gif,svg}")
            .pipe(change("./dist/images"))
            .pipe(minImg({
                "progressive": true,
                "svgoPlugins": [{"removeViewBox": false}],
                "use": [minPng()]
            }))
            .pipe(gulp.dest("./dist/images"));
});

//  minHtml

gulp.task("minHtml",function(){
    gulp.src("./template/*.html")
            .pipe(minHtml({
                collapseWhitespace:true,    //清除空格压缩代码
                collapseBooleanAttributes:true,     //省略布尔值
                removeComments:true,            //清除注释
                removeEmptyAttributes:true,      //清除空属性
                minifyJS:true,
                minifyCss:true
            }))
            .pipe(gulp.dest("./dist/view"));
});

//  concatFile
gulp.task("concat",function(){
    gulp.src("./src/css/*.css")
            .pipe(concatFile("common.css"))
            .pipe(modifyFileName({"suffix":".min"}))
            .pipe(minCss())
            .pipe(gulp.dest("./dist/css"));
});
gulp.task("concatLibs",function(){
    gulp.src([
        "./src/lib/angular.min.js",
        "./src/lib/angular-route.min.js",
        "./src/lib/angular-resource.min.js",
        "./src/lib/angular-animate.min.js"
    ])
            .pipe(concatFile("angular.min.js"))
            .pipe(gulp.dest("./dist/js"));
});

//  default run
gulp.task("default",["watch","server","minJs","sass","minHtml","concat","concatLibs","minImg"]);
/*End       work*/