(function (angular) {
    'use strict';

    angular
        .module('movieClub')
        .controller('DashboardController', DashboardController);

    function DashboardController(currentMovie, properties, users) {
        var vm = this;
        vm.currentMovie = currentMovie;
        vm.properties = properties;
        vm.usernames = _.pluck(users, 'username');
    }

}(window.angular));
