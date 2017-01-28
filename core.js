var app = angular.module("myApp", []);
app.controller("myCtrl", function ($http, $scope) {
    $scope.newproduct={};
    $http.get('/api/products')
        .success(function (data) {
            $scope.products = data;
            console.log(data);
            $scope.newproduct = {};
        })
        .error(function (data) {
            console.log('Error: ' + data);
        });

    $scope.createProduct = function () {
        $http.post('/api/products', $scope.newproduct)
            .success(function (data) {
                $scope.newproduct = {};
                $scope.products = data;
                console.log(data);
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });


    }
    $http.get('/api/categories')
        .success(function (data) {
            $scope.categories = data;
            console.log(data);
        })
        .error(function (data) {
            console.log('Error: ' + data);
        });
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
    $scope.editProduct = function (id) {
        $http.get('/api/products/' + id)
            .success(function (data) {
                $scope.editproduct = data;
                $scope._id = $scope.editproduct._id;
                $scope.newproduct =
                    {
                        prodid : $scope.editproduct.prodid,
                        prodname : $scope.editproduct.prodname,
                        prodprice :$scope.editproduct.prodprice,
                        prodqty : $scope.editproduct.prodqty,
                        prodcolor :$scope.editproduct.prodcolor,
                        prodimg : $scope.editproduct.prodimg,
                        category:$scope.editproduct.category
                }

                console.log(data);
            })

            .error(function (data) {
                console.log('Error: ' + data);
            });
    };
    $scope.updateProduct = function () {

        $http.put('/api/products/'+ $scope._id ,$scope.newproduct)
            .success(function (data) {
                console.log(data);
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    };


});