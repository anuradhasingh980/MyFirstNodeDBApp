var app = angular.module("myapp", ['ngFileUpload', 'ui.bootstrap']);
app.controller("stateController", ['$scope', '$http', 'Upload', '$modal', function ($scope, $http, Upload, $modal) {

    $scope.GetAllProfile = function () {
        $http.get('/api/profile')
            .success(function (data) {
                $scope.profiles = data;
                console.log(data);
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });


    }
    $scope.states = {};
    $scope._id;
    $scope.city = {};
    $scope.profiles = {};
    $scope.editProfiledt = {};
    $scope.stlist = {};
    $scope.newprofile = {};
    $http.get('/api/state')
        .success(function (data) {
            $scope.states = data;
            console.log(data);
        })
        .error(function (data) {
            console.log('Error: ' + data);
        });
    $scope.onStateChange = function () {

        $scope.stateIdVal = $scope.stateId;

        $http({
            url: '/api/getcitybyst/' + $scope.stateIdVal,
            method: 'GET'

        }).success(function (data) {

            console.log(data);

            $scope.stlist = data;

        });

    }

    $http.get('/api/city')
        .success(function (data) {
            $scope.city = data;
            console.log(data);
        })
        .error(function (data) {
            console.log('Error: ' + data);
        });

    $http.get('/api/profile')
        .success(function (data) {
            $scope.profiles = data;
            console.log(data);
        })
        .error(function (data) {
            console.log('Error: ' + data);
        });
    $scope.createProfile = function () {
        Upload.upload({
            url: '/api/profile',
            method: 'POST',
            data: {
                'name': $scope.newprofile.name,
                'email': $scope.newprofile.email,
                'gender': $scope.newprofile.gender,
                'dob': $scope.newprofile.dob,
                'stateid': $scope.newprofile.stateid,
                'cityid': $scope.newprofile.cityid,
                'profileimg': $scope.newprofile.profileimg,
                'status': $scope.newprofile.status
            }
        }).success(function (data) {
            $scope.newprofile = {};
            $scope.profiles = data;
            console.log(data);
        })
            .error(function (data) {
                console.log(data)
            })
    };

    $scope.editProfile = function (id) {
        $http.get('/api/profile/' + id)
            .success(function (data) {
                $scope.editProfiledt = data;
                $scope._id = $scope.editProfiledt._id;
                $scope.newprofile =
                    {
                        name: $scope.newprofile.name,
                        email: $scope.newprofile.email,
                        gender: $scope.newprofile.gender,
                        dob: $scope.newprofile.dob,
                        stateid: $scope.newprofile.stateid,
                        cityid: $scope.newprofile.cityid,
                        profileimg: $scope.newprofile.profileimg,
                        status: $scope.newprofile.status

                    }

                console.log(data);
            })

            .error(function (data) {
                console.log('Error: ' + data);
            });
    };
    $scope.showForm = function (id) {
        $scope.message = "Show Form Button Clicked";
        console.log($scope.message);
        $http.get('/api/profile/' + id)
            .success(function (data) {
                $scope.editProfiledt = data;
                $scope._id = $scope.editProfiledt._id;
                $scope.newprofile =
                    {
                        name: $scope.editProfiledt.name,
                        email: $scope.editProfiledt.email,
                        gender: $scope.editProfiledt.gender,
                        dob: $scope.editProfiledt.dob,
                        stateid: $scope.editProfiledt.stateid,
                        cityid: $scope.editProfiledt.cityid,
                        profileimg: $scope.editProfiledt.profileimg,
                        status: $scope.editProfiledt.status

                    }

                console.log(data);
            })

            .error(function (data) {
                console.log('Error: ' + data);
            });

        var modalInstance = $modal.open({
            templateUrl: 'editProfile.html',
            controller: ModalInstanceCtrl,
            scope: $scope,
            resolve: {
                userForm: function () {
                    return $scope.userForm;
                }
            }
        });
    }
    $scope.showForm1 = function (id) {
        $scope.message = "Show Form Button Clicked";
        console.log($scope.message);
        $http.get('/api/profile/' + id)
            .success(function (data) {
                $scope.editProfiledt = data;
                $scope._id = $scope.editProfiledt._id;
                $scope.newprofile =
                    {
                        name: $scope.editProfiledt.name,
                        email: $scope.editProfiledt.email,
                        gender: $scope.editProfiledt.gender,
                        dob: $scope.editProfiledt.dob.value,
                        stateid: $scope.editProfiledt.stateid,
                        cityid: $scope.editProfiledt.cityid,
                        profileimg: $scope.editProfiledt.profileimg,
                        status: $scope.editProfiledt.status

                    }

                console.log(data);
            })

            .error(function (data) {
                console.log('Error: ' + data);
            });

        var modalInstance = $modal.open({
            templateUrl: 'deleteProfile.html',
            controller: ModalInstanceCtrl,
            scope: $scope,
            resolve: {
                userForm: function () {
                    return $scope.userForm;
                }
            }
        });
    }

}]);
var ModalInstanceCtrl = function ($scope, $http, $modalInstance, userForm, Upload) {

    ModalInstanceCtrl.$inject = ['Upload', '$http']

    $scope.deleteProfile = function () {
        $http({
            url: '/api/profile/' + $scope._id,
            method: 'DELETE'
        })
        $modalInstance.dismiss();
        $scope.GetAllProfile();
    }
    $scope.updateProfile = function () {
        Upload.upload({
            url: '/api/profile/' + $scope._id,
            method: 'PUT',
            data: {
                'name': $scope.newprofile.name,
                'email': $scope.newprofile.email,
                'gender': $scope.newprofile.gender,
                'dob': $scope.newprofile.dob,
                'stateid': $scope.newprofile.stateid,
                'cityid': $scope.newprofile.cityid,
                'profileimg': $scope.newprofile.profileimg,
                'status': $scope.newprofile.status
            }
        }).success(function (data) {

            $scope.profiles
            console.log(data);
            $modalInstance.dismiss();
            $scope.GetAllProfile();
            $scope.newprofile = {};

        })
            .error(function (data) {
                console.log(data)
            })
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
};
