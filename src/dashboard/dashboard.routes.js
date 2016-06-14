(function (angular) {
    'use strict';

    angular
        .module('movieClub')
        .config(appConfig);

    function appConfig($stateProvider, firebaseUtilsProvider) {

        $stateProvider
            .state('dashboard', {
                controller: 'DashboardController as dashboardVm',
                templateUrl: 'dashboard/dashboard.html',
                url: '/',

                resolve: {
                    currentMovie:   firebaseUtilsProvider.resolveObject('currentMovie'),
                    propertyStore:  firebaseUtilsProvider.resolveObject('propertyStore'),
                    users:          firebaseUtilsProvider.resolveArray('users')
                }
            });
    }

}(window.angular));
