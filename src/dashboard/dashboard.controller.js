(function (angular) {
    'use strict';

    angular
        .module('movieClub.dashboard')
        .controller('DashboardController', DashboardController);

    function DashboardController(propertiesApi, usersService) {
        var vm = this;
        vm.properties = {};
        vm.usernames = [];
        init();

        function init() {

            vm.properties.$isLoading = true;
            propertiesApi.getAll()
                .then(function (properties) {
                    vm.properties = properties;
                    vm.properties.$isLoading = false;
                });

            vm.usernames.$isLoading = true;
            usersService.getUsernames()
                .then(function (usernames) {
                    vm.usernames = usernames;
                    vm.usernames.$isLoading = false;
                });
        }
    }

}(window.angular));
