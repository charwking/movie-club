(function (angular) {
    'use strict';

    angular
        .module('movieClub.auth')
        .controller('AuthController', AuthController);

    function AuthController($state, $stateParams, authApi) {
        var vm = this;
        vm.login = login;
        vm.register = register;
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
                    $state.go('club', {clubId: '-JoCOivuTNhgFsWhSLSf'});
                });
        }

        function register() {
            authApi.register(vm.register.username, vm.register.email, vm.register.password)
                .then(function () {
                    $state.go('club', {clubId: '-JoCOivuTNhgFsWhSLSf'});
                });
        }
    }

}(window.angular));
