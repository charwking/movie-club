(function (angular) {
    'use strict';

    angular
        .module('movieClub.clubs')
        .controller('ClubListController', ClubListController);

    function ClubListController(clubsApi) {
        var vm = this;
        vm.clubs = clubsApi.getClubs();
    }

}(window.angular));
