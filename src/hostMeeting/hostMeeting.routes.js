(function (angular) {
    'use strict';

    angular
        .module('movieClub')
        .config(appConfig);

    function appConfig($stateProvider) {

        $stateProvider
            .state('hostMeeting', {
                controller: 'HostMeetingController as hostMeetingVm',
                templateUrl: 'hostMeeting/hostMeeting.html',
                url: '/admin/host-meeting',

                adminRequired: true,

                resolve: {
                    currentMovie: function (currentMovieApi) {
                        return currentMovieApi.get().$loaded();
                    },
                    currentMovieUser: function (currentMovieUserApi) {
                        return currentMovieUserApi.get().$loaded();
                    },
                    users: function (usersApi) {
                        return usersApi.list();
                    },
                    userMovies: function (userMoviesApi) {
                        return userMoviesApi.getAll().$loaded();
                    }
                }
            });
    }

}(window.angular));
