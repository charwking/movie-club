(function (angular) {
    'use strict';

    angular
        .module('movieClub.clubs')
        .controller('ClubListController', ClubListController);

    function ClubListController(clubsApi) {
        var vm = this;
        vm.clubs = [];
        init();

        function init() {
            vm.clubs.$isLoading = true;
            clubsApi.getAll()
                .then(function (clubs) {
                    vm.clubs = clubs;
                    vm.clubs.$isLoading = false;
                });
        }
    }

}(window.angular));
