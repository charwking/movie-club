(function (angular) {
    'use strict';

    angular
        .module('movieClub')
        .controller('HostMeetingController', HostMeetingController);

    function HostMeetingController(users) {
        var vm = this;
        vm.presentUsers = [];
        vm.absentUsers = _.map(users, function (user) {
            return {username: user.username, id: user.$id};
        });

        vm.moveUserToPresent = moveUserToPresent;
        vm.moveUserToAbsent = moveUserToAbsent;

        function moveUserToPresent(user) {
            _.remove(vm.absentUsers, user);
            vm.presentUsers.push(user);
        }

        function moveUserToAbsent(user) {
            _.remove(vm.presentUsers, user);
            vm.absentUsers.push(user);
        }

    }

}(window.angular));
