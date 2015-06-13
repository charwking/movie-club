(function (angular) {
    'use strict';

    angular
        .module('movieClub.auth')
        .controller('RegisterController', RegisterController);

    function RegisterController($state, authApi) {
        var vm = this;
        vm.register = register;

        function register() {
            authApi.register(vm.register.username, vm.register.email, vm.register.password)
                .then(function () {
                    $state.go('dashboard');
                });
        }
    }

}(window.angular));
