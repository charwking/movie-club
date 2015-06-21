(function (angular) {
    'use strict';

    angular
        .module('movieClub')
        .controller('UserManagementController', UserManagementController);

    function UserManagementController(users) {
        var vm = this;

        // vars
        vm.users = users;

        // funcs
        vm.deleteUser = deleteUser;

        function deleteUser(user) {
            vm.users.$remove(user);
        }
    }

}(window.angular));
