(function (angular) {
    'use strict';

    angular
        .module('movieClub')
        .controller('HostMeetingController', HostMeetingController);

    function HostMeetingController(users, userMovies) {
        var vm = this;
        vm.presentUsers = [];
        vm.absentUsers = getAbsentUsers();

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

        function getNextUserMovie(user) {
            var userMovieObj = _.find(userMovies, {'$id': user.$id});
            if (userMovieObj) {
                return _.find(userMovieObj.movies, {'order': 0});
            }
            return null;
        }

        function getAbsentUsers() {
            return _.map(users, function (user) {
                return {
                    id: user.$id,
                    username: user.username,
                    nextMovie: getNextUserMovie(user)
                };
            });
        }

    }

}(window.angular));
