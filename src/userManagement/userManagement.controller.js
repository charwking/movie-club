(function (angular) {
    'use strict';

    angular
        .module('movieClub')
        .controller('UserManagementController', UserManagementController);

    function UserManagementController(users, usersApi) {
        var vm = this;
        vm.users = users;
        vm.deleteUser = deleteUser;

        function deleteUser(user) {
            usersApi.delete(user.id)
                .then(function () {
                    return _.remove(users, user);
                });
        }
    }

}(window.angular));
