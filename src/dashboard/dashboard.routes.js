(function (angular) {
    'use strict';

    angular
        .module('movieClub.dashboard')
        .config(appConfig);

    function appConfig($stateProvider) {

        $stateProvider
            .state('dashboard', {
                templateUrl: 'dashboard/dashboard.html',
                url: '/'
            });
    }

}(window.angular));
