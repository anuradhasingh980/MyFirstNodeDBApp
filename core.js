var app = angular.module("myApp", ['angularUtils.directives.dirPagination', 'ngFileUpload']);
app.controller("myCtrl", ['$scope', '$http', 'Upload', '$window', function ($scope, $http, Upload, $window) {
    $scope.sort = function (keyname) {
        $scope.sortKey = keyname;   //set the sortKey to the param passed
        $scope.reverse = !$scope.reverse; //if true make it false and vice versa
    }
    $scope.newproduct = {};
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
        Upload.upload({
            url: '/api/products',
            method: 'POST',
            data: {
                'prodid': $scope.newproduct.prodid,
                'prodname': $scope.newproduct.prodname,
                'prodprice': $scope.newproduct.prodprice,
                'prodqty': $scope.newproduct.prodqty,
                'prodcolor': $scope.newproduct.prodcolor,
                'prodimg': $scope.newproduct.prodimg,
                'category': $scope.newproduct.category
            }
        }).success(function (data) {
            $scope.newproduct = {};
            $scope.products = data;
            console.log(data);
        })
            .error(function (data) {
                console.log(data)
            })
    };
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
                        prodid: $scope.editproduct.prodid,
                        prodname: $scope.editproduct.prodname,
                        prodprice: $scope.editproduct.prodprice,
                        prodqty: $scope.editproduct.prodqty,
                        prodcolor: $scope.editproduct.prodcolor,
                        prodimg: $scope.editproduct.prodimg,
                        category: $scope.editproduct.category
                    }

                console.log(data);
            })

            .error(function (data) {
                console.log('Error: ' + data);
            });
    };
    $scope.updateProduct = function () {

        Upload.upload({
            url: '/api/products/' + $scope._id,
            method: 'PUT',
            data: {
                'prodid': $scope.newproduct.prodid,
                'prodname': $scope.newproduct.prodname,
                'prodprice': $scope.newproduct.prodprice,
                'prodqty': $scope.newproduct.prodqty,
                'prodcolor': $scope.newproduct.prodcolor,
                'prodimg': $scope.newproduct.prodimg,
                'category': $scope.newproduct.category
            }
        }).success(function (data) {
            $scope.newproduct = {};
            // $scope.products = data;
            console.log(data);
        })
            .error(function (data) {
                console.log(data)
            })
    };
    $scope.Logout = function () {

        $http.get('/api/logout')
            .success(function (data) {
                if (data.islogout == true) {
                    console.log(data);
                    $window.location.href = 'Login.html';

                }
            })
            .error(function (data) {
                console.log('Error: ' + data);

            });
    }
}]);
