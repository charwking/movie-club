(function (angular) {
    'use strict';

    angular
        .module('movieClub')
        .controller('DashboardController', DashboardController);

    function DashboardController(currentMovie, properties, users) {
        var vm = this;
        vm.currentMovie = currentMovie;
        vm.clubNameProp = _.find(properties, {id: 'clubName'});
        vm.usernames = _.pluck(users, 'username');
    }

}(window.angular));
