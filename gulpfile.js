/**
 *      @ Author:Bates Wang
 *      @ Time: 2016/8/22.
 */
//  requireModule
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
        revCollector = require("gulp-rev-collector");

/*Start     work*/

//  fileUrlJson
var url = {
    "html":"./template/*.html",
    "sass":"./src/sass/*.scss",
    "sassPartials":"./src/sass/partials/*.scss",
    "css":"./src/css/*.css",
    "js":"./src/js/*.js",
    "images":"./src/images/*.{png,jpg,gif,svg}",
    "ngMain":"./src/lib/angular.min.js",
    "ngRoute":"./src/lib/angular-route.min.js",
    "ngResource":"./src/lib/angular-resource.min.js",
    "ngAnimate":"./src/lib/angular-animate.min.js",
    "build":"./dist/"
};

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
    gulp.watch(url.html,["minHtml"]);
    gulp.watch(url.sassPartials);
    gulp.watch(url.sass,["sass"]);
    gulp.watch(url.images, ["minImg"]);
    gulp.watch(url.images, ["minJs"]);
    gulp.watch(url.css,["concat"]);
});

//  minJs
gulp.task("minJs",function(){
    gulp.src(url.js)
            .pipe(concatFile("bundle.js"))
            .pipe(modifyFileName({"suffix":".min"}))
            .pipe(minJs())
            .pipe(gulp.dest(url.build+"js"));
});

//  useSass
gulp.task("sass",function(){
    sass(url.sass,{style:"expanded"})
            .pipe(gulp.dest("./src/css"))
            .pipe(livereload())
});

//  minImg
gulp.task("minImg",function(){
    gulp.src(url.images)
            .pipe(change(url.build+"images"))
            .pipe(minImg({
                "progressive": true,
                "svgoPlugins": [{"removeViewBox": false}],
                "use": [minPng()]
            }))
            .pipe(gulp.dest(url.build+"images"));
});

//  minHtml

gulp.task("minHtml",function(){
    gulp.src(url.html)
            .pipe(minHtml({
                collapseWhitespace:true,    //清除空格压缩代码
                collapseBooleanAttributes:true,     //省略布尔值
                removeComments:true,            //清除注释
                removeEmptyAttributes:true,      //清除空属性
                minifyJS:true,
                minifyCss:true
            }))
            .pipe(gulp.dest(url.build+"view"));
});

//  concatFile
gulp.task("concat",function(){
    gulp.src(url.css)
            .pipe(concatFile("common.css"))
            .pipe(modifyFileName({"suffix":".min"}))
            .pipe(minCss())
            .pipe(gulp.dest(url.build+"css"));
});
gulp.task("concatLibs",function(){
    gulp.src([
            url.ngMain,
            url.ngRoute,
            url.ngResource,
            url.ngAnimate
    ])
            .pipe(concatFile("angular.min.js"))
            .pipe(gulp.dest(url.build+"js"));
});

//  default run
gulp.task("default",["watch","server","minJs","sass","minHtml","concat","concatLibs","minImg"]);
/*End       work*/