var app = angular.module("myApp", []);
app.controller("myCtrl", function ($http, $scope) {
    $scope.formData = {};
    $http.get('/api/products')
        .success(function (data) {
            $scope.products = data;
            console.log(data);
        })
        .error(function (data) {
            console.log('Error: ' + data);
        });

    $scope.createProduct = function () {
        $http.post('/api/products', $scope.formData)
            .success(function (data) {
                $scope.formData = {}; // clear the form so our user is ready to enter another
                $scope.products = data;
                console.log(data);
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });

        $http.get('/api/categories')
            .success(function (data) {
                $scope.categoryies = data;
                console.log(data);
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    }


    $scope.deleteProduct = function (id) {
        $http.delete('/api/products/' + id)
            .success(function (data) {
                $scope.products = data;
                console.log(data);
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    };


});