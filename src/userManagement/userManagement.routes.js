(function (angular) {
    'use strict';

    angular
        .module('movieClub')
        .config(appConfig);

    function appConfig($stateProvider) {

        $stateProvider
            .state('userManagement', {
                controller: 'UserManagementController as userManagementVm',
                templateUrl: 'userManagement/userManagement.html',
                url: '/admin/user-management',

                authRequired: true,

                resolve: {
                    users: function (usersApi) {
                        return usersApi.list();
                    }
                }
            });
    }

}(window.angular));
