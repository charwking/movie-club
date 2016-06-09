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
                    currentMovie: function (firebase) {
                        return firebase.promiseObject('currentMovie');
                    },
                    currentMovieUser: function (firebase) {
                        return firebase.promiseObject('currentMovieUser');
                    },
                    users: function (firebase) {
                        return firebase.promiseArray('users');
                    },
                    userMovies: function (firebase) {
                        return firebase.promiseArray('userMovies');
                    }
                }
            });
    }

}(window.angular));
