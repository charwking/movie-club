(function (angular) {
    'use strict';

    angular
        .module('movieClub.nav')
        .controller('NavController', NavController);

    function NavController($state, authApi) {
        var vm = this;
        vm.isLoggedIn = isLoggedIn;

        function isLoggedIn() {
            return !!authApi.getCurrentUser();
        }
    }

}(window.angular));
