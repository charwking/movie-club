(function (angular) {
    'use strict';

    angular
        .module('movieClub.auth')
        .controller('RegisterController', RegisterController);

    function RegisterController($state, authApi, usersService) {
        var vm = this;
        vm.register = register;
        vm.isLoading = false;
        vm.registrationFailed = false;
        vm.usernames = [];
        init();

        function init() {
            usersService.getUsernames()
                .then(function (usernames) {
                    vm.usernames = usernames;
                });
        }

        function register() {

            if (!vm.registrationForm.$valid) {
                return;
            }

            vm.isLoading = true;
            vm.registrationFailed = false;

            authApi.register(vm.username, vm.email, vm.password)
                .then(function () {
                    $state.go('dashboard');
                })
                .catch(function () {
                    vm.password = '';
                    vm.isLoading = false;
                    vm.registrationFailed = true;
                });
        }
    }

}(window.angular));
