(function (angular) {
    'use strict';

    angular
        .module('movieClub.clubs')
        .controller('ClubController', ClubController);

    function ClubController($stateParams, firebaseApi) {
        var vm = this;
        vm.club = {};
        init();

        function init() {
            vm.club = firebaseApi.getClubById($stateParams.clubId);
        }
    }

}(window.angular));
