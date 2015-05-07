(function (angular) {
    'use strict';

    angular
        .module('movieClub.clubs')
        .controller('ClubController', ClubController);

    function ClubController($stateParams, clubsApi) {
        var vm = this;
        vm.club = {};
        init();

        function init() {
            vm.club.$isLoading = true;
            clubsApi.getById($stateParams.clubId)
                .then(function (club) {
                    vm.club = club;
                    vm.club.$isLoading = false;
                });
        }
    }

}(window.angular));
