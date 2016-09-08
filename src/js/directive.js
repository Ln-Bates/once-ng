/**
 *      @ Author:Bates Wang
 *      @ Time: 2016/8/23.
 */
var directive = angular.module("directive",[]);

//  header
directive.directive("batesHeader",function(){
    return {
        restrict : "E",
        replace:true,
        controller:"common",
        templateUrl:"./template/components/header.html"
    }
});

//  footer
directive.directive("batesFooter",function(){
    return {
        restrict : "E",
        replace : true,
        controller : "common",
        templateUrl :"./template/components/footer.html"
    }
});