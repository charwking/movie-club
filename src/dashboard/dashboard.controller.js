(function (angular) {
    'use strict';

    angular
        .module('movieClub')
        .controller('DashboardController', DashboardController);

    function DashboardController(currentMovie, propertyStore, users) {
        var vm = this;
        vm.currentMovie = currentMovie;
        vm.propertyStore = propertyStore;
        vm.usernames = _.pluck(users, 'username');
    }

}(window.angular));
