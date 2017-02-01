/**
 * Created by lenovo on 1/30/2017.
 */
angular.module("myApp", [])
    .controller("userController", ['$scope', '$http', '$window', function ($scope, $http, $window) {

        $scope.userdata = {};
        $http.get('/api/user')
            .success(function (data) {
                $scope.users = data;
                console.log(data);

            })
            .error(function (data) {
                console.log('Error: ' + data);
            });

        $scope.createUser = function () {
            $http.post('/api/user', $scope.userdata)

                .success(function (data) {
                    $scope.userdata = {};
                    $scope.users = data;
                    console.log(data);
                })
                .error(function (data) {
                    console.log('Error: ' + data);
                });
        }
        $scope.Authenticate = function () {
            $http.post('/api/authenticate', $scope.userdata)

                .success(function (data) {
                    $scope.userdata = {};
                    //$scope.users = data;
                    if (data.success == true) {
                        console.log(data);
                        $window.location.href = 'product.html';
                    }
                    else {
                        alert("Either Username or Password is Incorrect");
                    }
                })
                .error(function (data) {
                    console.log('Error: ' + data);

                });
        }
        $scope.deleteUser = function (id) {
            $http.delete('/api/user/' + id)
                .success(function (data) {
                    $scope.users = data;
                    console.log(data);
                })
                .error(function (data) {
                    console.log('Error: ' + data);
                });
        };
        $scope.editUser = function (id) {
            $http.get('/api/user/' + id)
                .success(function (data) {
                    $scope.editUser = data;
                    $scope._id = $scope.editUser._id;
                    $scope.userdata =
                        {
                            name: $scope.editUser.name,
                            password: $scope.editUser.password,
                            mobile: $scope.editUser.mobile,
                            admin: $scope.editUser.admin,
                        }
                    console.log(data);
                })

                .error(function (data) {
                    console.log('Error: ' + data);
                });
        };
        $scope.UpdateUser = function () {
            $http.put('/api/user/' + $scope._id, $scope.userdata)

                .success(function (data) {
                    $scope.userdata = {};
                    console.log(data);
                })
                .error(function (data) {
                    console.log('Error: ' + data);
                });
        }


    }]);

