(function (angular) {
    'use strict';

    angular
        .module('movieClub')
        .config(appConfig);

    function appConfig($stateProvider, firebaseUtilsProvider) {

        $stateProvider
            .state('login', {
                controller: 'LoginController as loginVm',
                templateUrl: 'auth/login.html',
                url: '/auth/login'
            })
            .state('register', {
                controller: 'RegisterController as registerVm',
                templateUrl: 'auth/register.html',
                url: '/auth/register',
                resolve: {
                    users: firebaseUtilsProvider.resolveArray('users')
                }
            })
            .state('logout', {
                controller: 'LogoutController as logoutVm',
                templateUrl: 'auth/logout.html',
                url: '/auth/logout'
            });
    }

}(window.angular));
