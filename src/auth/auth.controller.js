(function (angular) {
    'use strict';

    angular
        .module('movieClub.auth')
        .controller('AuthController', AuthController);

    function AuthController($state, $stateParams, authApi) {
        var vm = this;
        vm.login = login;
        vm.userLoggedOut = false;
        init();

        function init() {
            if ($stateParams.action === 'logout') {
                authApi.logout();
                vm.userLoggedOut = true;
            }
        }

        function login() {
            authApi.login(vm.login.email, vm.login.password)
                .then(function () {
                    $state.go('dashboard');
                });
        }
    }

}(window.angular));
