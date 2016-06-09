(function (angular) {
    'use strict';

    angular
        .module('movieClub')
        .controller('UserManagementController', UserManagementController);

    function UserManagementController(users) {
        var vm = this;
        vm.users = users;
        vm.deleteUser = deleteUser;

        function deleteUser(user) {
            users.$remove(user);
        }
    }

}(window.angular));
