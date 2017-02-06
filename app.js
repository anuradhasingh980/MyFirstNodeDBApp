// Default colors
var brandPrimary = '#20a8d8';
var brandSuccess = '#4dbd74';
var brandInfo = '#63c2de';
var brandWarning = '#f8cb00';
var brandDanger = '#f86c6b';

var grayDark = '#2a2c36';
var gray = '#55595c';
var grayLight = '#818a91';
var grayLighter = '#d1d4d7';
var grayLightest = '#f8f9fa';
var app = angular
    .module('app', [
        'ui.router',
        'oc.lazyLoad',
        'pascalprecht.translate',
        'ncy-angular-breadcrumb',
        'angular-loading-bar',
        'ngSanitize',
        'ngAnimate',
        'ngFileUpload',
        'ui.bootstrap',
        'angularUtils.directives.dirPagination'
    ])
    .config(['cfpLoadingBarProvider', function (cfpLoadingBarProvider) {
        cfpLoadingBarProvider.includeSpinner = false;
        cfpLoadingBarProvider.latencyThreshold = 1;
    }])
    .run(['$rootScope', '$state', '$stateParams', function ($rootScope, $state, $stateParams) {
        $rootScope.$on('$stateChangeSuccess', function () {
            document.body.scrollTop = document.documentElement.scrollTop = 0;
        });
        $rootScope.$state = $state;
        return $rootScope.$stateParams = $stateParams;
    }]);
app.controller('stateController', stateController)
stateController.$inject = ['$scope', '$http', 'Upload', '$modal'];
function stateController($scope, $http, Upload, $modal) {

    $scope.sort = function (keyname) {
        $scope.sortKey = keyname;
        $scope.reverse = !$scope.reverse;
    }
    $scope.states = {};
    $scope._id;
    $scope.city = {};
    $scope.profiles = {};
    $scope.editProfiledt = {};
    $scope.stlist = {};
    $scope.newprofile = {};
    $http.get('/api/profile')
        .then(function (response) {
            $scope.profiles = response.data;

        });
    $scope.GetAllProfile = function () {
        $http.get('/api/profile').then(function (response) {
            $scope.profiles = response.data;

        })
    }
    $http.get('/api/state')
        .then(function (response) {
            $scope.states = response.data;
            ;
        })
    $scope.onStateChange = function (id) {

        $http({
            url: '/api/getcitybyst/' + id,
            method: 'GET'

        }).then(function (response) {
            $scope.stlist = response.data;

        });

    }
    $http.get('/api/city')
        .then(function (response) {
            $scope.city = response.data;

        })

    $http.get('/api/profile')
        .then(function (response) {
            $scope.profiles = response.data;

        })
    $scope.editProfile = function (id) {
        $http.get('/api/profile/' + id)
            .then(function (response) {
                $scope.editProfiledt = response.data;
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

            })
    };
    $scope.showForm = function (id) {
        $scope.message = "Show Form Button Clicked";
        console.log($scope.message);
        $http.get('/api/profile/' + id)
            .then(function (response) {
                $scope.editProfiledt = response.data;
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


            })
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
            .then(function (response) {
                $scope.editProfiledt = response.data;
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

            })
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
    $scope.showForm2 = function (id) {
        $scope.message = "Show Form Button Clicked";
        console.log($scope.message);

        var modalInstance = $modal.open({
            templateUrl: 'createProfile.html',
            controller: ModalInstanceCtrl,
            scope: $scope,
            resolve: {
                userForm: function () {
                    return $scope.userForm;
                }
            }
        });
    }

};
var ModalInstanceCtrl = function ($scope, $http, $modalInstance, userForm, Upload) {

    ModalInstanceCtrl.$inject = ['Upload', '$http']

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
        }).then(function (response) {
            $modalInstance.dismiss();
            $scope.GetAllProfile();

        })

    };


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
        }).then(function (response) {

            $scope.profiles = response.data

            $modalInstance.dismiss();
            $scope.GetAllProfile();
            $scope.newprofile = {};

        })

    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
};