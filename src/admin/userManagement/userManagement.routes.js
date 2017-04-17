(function () {
    'use strict';

    angular
        .module('movieClub')
        .config(appConfig);

    function appConfig($stateProvider) {

        $stateProvider
            .state('admin.userManagement', {
                controller: 'UserManagementController as userManagementVm',
                templateUrl: 'admin/userManagement/userManagement.html',
                url: '/admin/user-management'
            });
    }

}());
