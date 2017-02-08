/**
 * Created by lenovo on 2/7/2017.
 */
var app = angular.module('login',[])
app.controller('LoginController',LoginController)
function LoginController($scope,$window) {

    var uname = "Admin";
    var pass = "Admin"
    $scope.login = function () {

        if($scope.username=="" && $scope.password=="")
            alert("Enter Details")
        else if($scope.username==uname && $scope.password==pass)
        {
            $window.location.href = 'loginpageforcustomer.html'
        }
        else {
            $window.location.href = 'index.html'
            alert("Username or Passeord is incorrect")
        }
    }
}