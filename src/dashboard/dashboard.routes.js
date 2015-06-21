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
                    propertyStore: function (propertyStoreApi) {
                        return propertyStoreApi.get().$loaded();
                    },
                    users: function (usersApi) {
                        return usersApi.getAll().$loaded();
                    }
                }
            });
    }

}(window.angular));
