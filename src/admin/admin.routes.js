(function (angular) {
    'use strict';

    angular
        .module('movieClub')
        .config(appConfig);

    function appConfig($stateProvider) {

        $stateProvider
            .state('admin', {
                abstract: true,
                template: '<ui-view/>',
                resolve: {
                    currentAuth: function ($firebaseAuthService) {
                        return $firebaseAuthService.requireSignInAsAdmin();
                    }
                }
            });
    }

}(window.angular));

