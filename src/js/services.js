/**
 *      @ Author:Bates Wang
 *      @ Time: 2016/8/23.
 */
var services = angular.module("services",["ngResource"]);

services.factory("getDetailsData",["$resource",function($resource){
    return $resource("data/:certain.json",{},{
        query:{"method":"get",params:{certain:null},isArray:true}
    });
}]);
services.factory("storage",function(){
    return {
        get:function(){
            var data = window.localStorage["items"];
            if(data){
                return angular.fromJson(data);
            }
            return []
        },
        save : function(data){
            window.localStorage["items"] = angular.toJson(data);
        },
        clear : function(){
            window.localStorage.clear();
        }
    }
});