/**
 *      @ Author:Bates Wang
 *      @ Time: 2016/8/23.
 */
var controller = angular.module("controller",[]);

//  homeCtrl
controller.controller("home",["$scope","$http",function($scope,$http){
    $http.get("/blogs/home.json").success(function(data){
        $scope.init = data;
    });
}]);

//  listCtrl
controller.controller("list",["$scope",function($scope){}]);

//  detailCtrl
controller.controller("detail",["$scope",function($scope){}]);

//  remarkCtrl
controller.controller("remark",["$scope","$http",function($scope,$http){
    $http.get("/blogs/message.json").success(function(data){
        $scope.init = data.messageItems;
    }).then(function(){
        $scope.all = $scope.init.length;
    });
}]);

//  mediaCtrl
controller.controller("media",["$scope","$http",function($scope,$http){
    $http.get("/blogs/media.json").success(function(data){
        $scope.init = data.items;
    });
    $scope.alert=function(){
        alert("暂时不可使用音乐功能,仅供样式参考")
    }
}]);

//  aboutCtrl
controller.controller("about",["$scope",function($scope){}]);

//  commonCtrl
controller.controller("common",["$scope","$window",function($scope,$window){
    $scope.goback=function(){
        $window.history.back();
    }
}]);