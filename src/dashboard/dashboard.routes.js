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
                    properties: function (propertiesApi) {
                        return propertiesApi.list();
                    },
                    users: function (usersApi) {
                        return usersApi.list();
                    }
                }
            });
    }

}(window.angular));
