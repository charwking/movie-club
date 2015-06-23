(function (angular) {
    'use strict';

    angular
        .module('movieClub')
        .controller('NavController', NavController);

    function NavController($state, authApi) {
        var vm = this;
        vm.isLoggedIn = authApi.isLoggedIn;
    }

}(window.angular));
