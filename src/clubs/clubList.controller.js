(function (angular) {
    'use strict';

    angular
        .module('movieClub.clubs')
        .controller('ClubListController', ClubListController);

    function ClubListController(firebaseApi) {
        var vm = this;
        vm.clubs = [];
        init();

        function init() {
            vm.clubs = firebaseApi.getClubs();
        }
    }

}(window.angular));
