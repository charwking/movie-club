(function (angular) {
    'use strict';

    angular
        .module('movieClub.auth')
        .controller('RegisterController', RegisterController);

    function RegisterController($state, authApi, usersService) {
        var vm = this;
        vm.register = register;
        vm.isLoading = true;
        vm.isSubmitting = false;
        vm.registrationFailed = false;
        init();

        function init() {
            usersService.getUsernames()
                .then(function (usernames) {
                    vm.usernames = usernames;
                })
                .finally(function () {
                    vm.isLoading = false;
                });
        }

        function register() {

            if (!vm.registrationForm.$valid) {
                return;
            }

            vm.isSubmitting = true;
            vm.registrationFailed = false;

            authApi.register(vm.username, vm.email, vm.password)
                .then(function () {
                    $state.go('dashboard');
                })
                .catch(function () {
                    vm.password = '';
                    vm.registrationFailed = true;
                })
                .finally(function () {
                    vm.isSubmitting = false;
                });
        }
    }

}(window.angular));
