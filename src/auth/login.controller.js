(function (angular) {
    'use strict';

    angular
        .module('movieClub.auth')
        .controller('LoginController', LoginController);

    function LoginController($state, authApi) {
        var vm = this;
        vm.login = login;
        vm.isLoading = false;
        vm.loginFailed = false;

        function login() {
            if (!vm.loginForm.$valid) {
                return;
            }

            vm.isLoading = true;
            vm.loginFailed = false;

            authApi.login(vm.email, vm.password)
                .then(function () {
                    $state.go('dashboard');
                })
                .catch(function () {
                    vm.password = "";
                    vm.isLoading = false;
                    vm.loginFailed = true;
                });
        }
    }

}(window.angular));
