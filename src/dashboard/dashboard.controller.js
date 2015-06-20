(function (angular) {
    'use strict';

    angular
        .module('movieClub.dashboard')
        .controller('DashboardController', DashboardController);

    function DashboardController(propertiesApi, usersApi) {
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
            usersApi.getAll().$loaded()
                .then(function (users) {
                    vm.usernames = _.pluck(users, 'username');
                    vm.usernames.$isLoading = false;
                });
        }
    }

}(window.angular));
