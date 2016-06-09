(function (angular) {
    'use strict';

    angular
        .module('movieClub')
        .config(appConfig);

    function appConfig($stateProvider, firebaseProvider) {

        $stateProvider
            .state('dashboard', {
                controller: 'DashboardController as dashboardVm',
                templateUrl: 'dashboard/dashboard.html',
                url: '/',

                resolve: {
                    currentMovie:   firebaseProvider.resolveObject('currentMovie'),
                    propertyStore:  firebaseProvider.resolveObject('propertyStore'),
                    users:          firebaseProvider.resolveArray('users')
                }
            });
    }

}(window.angular));
