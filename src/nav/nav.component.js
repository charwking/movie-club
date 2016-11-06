(function (angular) {
    'use strict';

    var navComponent = {
        templateUrl: 'nav/nav.html',
        controller: NavController
    };

    angular
        .module('movieClub')
        .component('mcNav', navComponent);

    function NavController(authApi) {
        'ngInject';
        var vm = this;
        vm.isAdmin = authApi.isAdmin;
        vm.isLoggedIn = authApi.isLoggedIn;
    }

}(window.angular));
