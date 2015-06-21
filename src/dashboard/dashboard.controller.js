(function (angular) {
    'use strict';

    angular
        .module('movieClub.dashboard')
        .controller('DashboardController', DashboardController);

    function DashboardController(propertyStore, users) {
        var vm = this;
        vm.propertyStore = propertyStore;
        vm.usernames = _.pluck(users, 'username');
    }

}(window.angular));
