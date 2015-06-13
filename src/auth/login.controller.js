(function (angular) {
    'use strict';

    angular
        .module('movieClub.auth')
        .controller('LoginController', LoginController);

    function LoginController($state, authApi) {
        var vm = this;
        vm.login = login;

        function login() {
            if (!vm.loginForm.$valid) {
                return;
            }

            authApi.login(vm.email, vm.password)
                .then(function () {
                    $state.go('dashboard');
                });
        }
    }

}(window.angular));
