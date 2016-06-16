(function (angular) {
    'use strict';

    angular
        .module('movieClub')
        .config(appConfig);

    function appConfig($stateProvider, firebaseUtilsProvider) {

        $stateProvider
            .state('userManagement', {
                controller: 'UserManagementController as userManagementVm',
                templateUrl: 'userManagement/userManagement.html',
                url: '/admin/user-management',

                resolve: {
                    currentAuth: function ($firebaseAuthService) {
                        return $firebaseAuthService.requireAuthAsAdmin();
                    },
                    users: firebaseUtilsProvider.resolveArray('users')
                }
            });
    }

}(window.angular));
