(function (angular) {
    'use strict';

    angular
        .module('movieClub')
        .config(appConfig);

    function appConfig($stateProvider) {

        $stateProvider
            .state('dashboard', {
                controller: 'DashboardController as dashboardVm',
                templateUrl: 'dashboard/dashboard.html',
                url: '/',

                resolve: {
                    currentMovie: function (currentMovieApi) {
                        return currentMovieApi.get().$loaded();
                    },
                    propertyStore: function (firebase) {
                        return firebase.promiseObject('propertyStore');
                    },
                    users: function (usersApi) {
                        return usersApi.list();
                    }
                }
            });
    }

}(window.angular));
