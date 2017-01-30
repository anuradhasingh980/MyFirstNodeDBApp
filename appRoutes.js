/**
 * Created by lenovo on 1/30/2017.
 */
angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider
        .when('/product', {
            templateUrl: 'product.html',
            controller: 'core'
        })

        .when('/user', {
            templateUrl: 'user.html',
            controller: 'userController'
        });

    $locationProvider.html5Mode(true);

}]);