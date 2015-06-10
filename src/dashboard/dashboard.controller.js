(function (angular) {
    'use strict';

    angular
        .module('movieClub.dashboard')
        .controller('DashboardController', DashboardController);

    function DashboardController(propertiesApi) {
        var vm = this;
        vm.properties = {};
        init();

        function init() {
            vm.properties.$isLoading = true;
            propertiesApi.getAll()
                .then(function (properties) {
                    vm.properties = properties;
                    vm.properties.$isLoading = false;
                });
        }
    }

}(window.angular));
