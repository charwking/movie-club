(function (angular) {
    'use strict';

    angular
        .module('movieClub')
        .config(appConfig);

    function appConfig($stateProvider, firebaseProvider) {

        $stateProvider
            .state('hostMeeting', {
                controller: 'HostMeetingController as hostMeetingVm',
                templateUrl: 'hostMeeting/hostMeeting.html',
                url: '/admin/host-meeting',

                adminRequired: true,

                resolve: {
                    currentMovie:       firebaseProvider.resolveObject('currentMovie'),
                    currentMovieUser:   firebaseProvider.resolveObject('currentMovieUser'),
                    meetings:           firebaseProvider.resolveArray('meetings'),
                    users:              firebaseProvider.resolveArray('users'),
                    userMovies:         firebaseProvider.resolveArray('userMovies')
                }
            });
    }

}(window.angular));
