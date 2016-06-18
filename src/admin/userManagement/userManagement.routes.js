(function (angular) {
    'use strict';

    angular
        .module('movieClub')
        .config(appConfig);

    function appConfig($stateProvider, firebaseUtilsProvider) {

        $stateProvider
            .state('admin.userManagement', {
                controller: 'UserManagementController as userManagementVm',
                templateUrl: 'admin/userManagement/userManagement.html',
                url: '/admin/user-management',

                resolve: {
                    users: firebaseUtilsProvider.resolveArray('users')
                }
            });
    }

}(window.angular));

