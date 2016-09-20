/**
 *      @ Author:Bates Wang
 *      @ Time: 2016/8/23.
 */
var app = angular.module("app",[
    "ngRoute",
    "animation",
    "controller",
    "services",
    "directive"
]);

app.config(["$routeProvider",function($routeProvider){
    $routeProvider
            .when("/home",{
                templateUrl:"/dist/view/home.html",
                controller:"home"
            })
            .when("/list",{
                templateUrl:"/dist/view/list.html",
                controller:"list"
            })
            .when("/details/:certain",{
                templateUrl:"/dist/view/detail.html",
                controller:"detail"
            })
            .when("/remarks",{
                templateUrl:"/dist/view/remark.html",
                controller:"remark"
            })
            .when("/media",{
                templateUrl:"/dist/view/media.html",
                controller:"media"
            })
            .when("/about",{
                templateUrl:"/dist/view/about.html",
                controller:"about"
            })
            .otherwise({
                redirectTo:"/home"
            });
}]);

