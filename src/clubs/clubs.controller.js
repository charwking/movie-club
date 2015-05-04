(function (angular) {
    'use strict';

    angular
        .module('movieClub.clubs')
        .controller('ClubsController', ClubsController);

    function ClubsController(clubsApi) {
        var vm = this;
        vm.clubs = clubsApi.getClubs();
    }

}(window.angular));
