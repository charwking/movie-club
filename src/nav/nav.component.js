(function () {
    'use strict';

    angular
        .module('movieClub')
        .component('mcNav', {
            templateUrl: 'nav/nav.html',
            controller: NavController
        });

    /* @ngInject */
    function NavController(authApi) {

        var vm = this;
        vm.isAdmin = authApi.isAdmin;
        vm.isLoggedIn = authApi.isLoggedIn;
    }
}());
