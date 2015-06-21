(function (angular) {
    'use strict';

    angular
        .module('movieClub')
        .controller('NavController', NavController);

    function NavController($state, currentUser) {
        var vm = this;
        vm.isLoggedIn = currentUser.isLoggedIn;
        vm.getUsername = getUsername;

        function getUsername() {
            var user = vm.isLoggedIn() ? currentUser.get() : null;
            if (user && user.username) {
                return user.username;
            }
            return null;
        }
    }

}(window.angular));
