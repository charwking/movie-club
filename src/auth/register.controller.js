(function (angular) {
    'use strict';

    angular
        .module('movieClub.auth')
        .controller('RegisterController', RegisterController);

    function RegisterController($state, authApi) {
        var vm = this;
        vm.register = register;

        function register() {

            if (!vm.registrationForm.$valid) {
                return;
            }

            authApi.register(vm.username, vm.email, vm.password)
                .then(function () {
                    $state.go('dashboard');
                });
        }
    }

}(window.angular));
