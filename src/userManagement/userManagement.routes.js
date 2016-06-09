(function (angular) {
    'use strict';

    angular
        .module('movieClub')
        .config(appConfig);

    function appConfig($stateProvider, firebaseProvider) {

        $stateProvider
            .state('userManagement', {
                controller: 'UserManagementController as userManagementVm',
                templateUrl: 'userManagement/userManagement.html',
                url: '/admin/user-management',

                authRequired: true,

                resolve: {
                    users: firebaseProvider.resolveArray('users')
                }
            });
    }

}(window.angular));
