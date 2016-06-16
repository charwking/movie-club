(function (angular) {
    'use strict';

    angular
        .module('movieClub')
        .config(appConfig);

    function appConfig($stateProvider, firebaseUtilsProvider) {

        $stateProvider
            .state('hostMeeting', {
                controller: 'HostMeetingController as hostMeetingVm',
                templateUrl: 'hostMeeting/hostMeeting.html',
                url: '/admin/host-meeting',

                resolve: {
                    currentAuth: function ($firebaseAuthService) {
                        return $firebaseAuthService.requireAuthAsAdmin();
                    },
                    currentMovie:       firebaseUtilsProvider.resolveObject('currentMovie'),
                    currentMovieUser:   firebaseUtilsProvider.resolveObject('currentMovieUser'),
                    meetings:           firebaseUtilsProvider.resolveArray('meetings'),
                    users:              firebaseUtilsProvider.resolveArray('users'),
                    userMovies:         firebaseUtilsProvider.resolveArray('userMovies')
                }
            });
    }

}(window.angular));
