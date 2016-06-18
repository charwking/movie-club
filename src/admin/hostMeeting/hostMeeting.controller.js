(function (angular) {
    'use strict';

    angular
        .module('movieClub')
        .controller('HostMeetingController', HostMeetingController);

    function HostMeetingController(
        $q, $state, currentMovie, currentMovieUser, firebaseUtils, meetings, users, userMovies) {

        var vm = this;
        vm.presentUsers = [];
        vm.absentUsers = getAbsentUsers();
        vm.currentMovie = currentMovie;

        vm.moveUserToPresent = moveUserToPresent;
        vm.moveUserToAbsent = moveUserToAbsent;
        vm.isMovieAvailable = isMovieAvailable;
        vm.selectMovie = selectMovie;

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
                return _(userMovieObj.movies).sortBy('order').first();
            }
            return null;
        }

        function getAbsentUsers() {
            return _.map(users, function (user) {
                return {
                    '$id': user.$id,
                    username: user.username,
                    nextMovie: getNextUserMovie(user)
                };
            });
        }

        function isMovieAvailable() {
            return (getUsersWithMovies().length > 0);
        }

        function selectMovie() {
            var userId = selectWinner();
            var usersWithMovies = getUsersWithMovies();
            var user = _.find(usersWithMovies, {'$id': userId});
            currentMovie.name = user.nextMovie.name;
            currentMovie.trailerUrl = user.nextMovie.trailerUrl || null;
            currentMovie.$save();
            currentMovieUser.userId = user.$id;
            currentMovieUser.$save();

            firebaseUtils.promiseArray(['userMovies', user.$id, 'movies'])
                .then(function (movies) {
                    var movie = _.find(movies, {order: user.nextMovie.order});
                    return movies.$remove(movie).then(function () {
                        _(movies)
                            .sortBy('order')
                            .forEach(function (movie, index) {
                                movie.order = index;
                                movies.$save(movie);
                            });
                    });
                }).then(function () {
                    $state.go('dashboard');
                });

            saveMeeting();
        }

        function getUsersWithMovies() {
            return _.filter(vm.presentUsers, function (user) {
                return !!user.nextMovie;
            });
        }

        function saveMeeting() {

            function formatDate(date) {
                var year = date.getFullYear();
                var month = date.getMonth() + 1;
                var day = date.getDate();

                month = ('0' + month).slice(-2);
                day = ('0' + day).slice(-2);

                return year + '-' + month + '-' + day;
            }

            var presentUsers = _.reduce(vm.presentUsers, function (presentUsers, item) {
                presentUsers[item.$id] = true;
                return presentUsers;
            }, {});

            meetings.$add({
                date: formatDate(new Date()),
                presentUsers: presentUsers,
                selectedMovieName: currentMovie.name,
                selectedMovieUserId: currentMovieUser.userId
            });
        }

        function selectWinner() {
            var chances = {};
            getPossibleWinners(chances);
            generateProbabilitiesFromMeetings(chances, meetings);
            return selectRandomWinner(chances);
        }

        function getPossibleWinners(chances) {
            var usersWithMovies = getUsersWithMovies();
            if (usersWithMovies) {
                for (var i = 0; i < usersWithMovies.length; i++) {
                    var user = usersWithMovies[i];
                    chances[user.$id] = 1;
                }
            }
        }

        function generateProbabilitiesFromMeetings(chances, meetings) {
            if (meetings) {
                for (var i = 0; i < meetings.length; i++) {
                    var presentUsers = meetings[i].presentUsers;
                    if (presentUsers) {
                        for (var presentUserId in presentUsers) {
                            if (_.has(chances, presentUserId)) {
                                chances[presentUserId]++;
                            }
                        }
                    }
                    var seletedMovieUserId = meetings[i].selectedMovieUserId;
                    if (seletedMovieUserId && _.has(chances, seletedMovieUserId)) {
                        chances[seletedMovieUserId]--;
                    }
                }
            }
        }

        function selectRandomWinner(chances) {
            var totalProbability = _.reduce(chances, function(memo, num) { return memo + num; }, 0);
            var num = Math.random() * totalProbability;
            for (var userId in chances) {
                if (typeof chances[userId] === 'number') {
                    num -= chances[userId];
                    if (num <= 0) {
                        return userId;
                    }
                }
            }
        }
    }

}(window.angular));
