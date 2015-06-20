(function (angular) {
    'use strict';

    angular
        .module('movieClub.userManagement')
        .config(appConfig);

    function appConfig($stateProvider) {

        $stateProvider
            .state('userManagement', {
                controller: 'UserManagementController as userManagementVm',
                templateUrl: 'userManagement/userManagement.html',
                url: '/admin/user-management',
                resolve: {
                    users: function (usersApi) {
                        return usersApi.getAll().$loaded();
                    }
                }
            });
    }

}(window.angular));
