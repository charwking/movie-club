(function (angular) {
    'use strict';

    angular
        .module('movieClub')
        .config(appConfig);

    function appConfig($stateProvider, firebaseUtilsProvider) {

        $stateProvider
            .state('admin.hostMeeting', {
                controller: 'HostMeetingController as hostMeetingVm',
                templateUrl: 'admin/hostMeeting/hostMeeting.html',
                url: '/admin/host-meeting',

                resolve: {
                    currentMovie:       firebaseUtilsProvider.resolveObject('currentMovie'),
                    currentMovieUser:   firebaseUtilsProvider.resolveObject('currentMovieUser'),
                    meetings:           firebaseUtilsProvider.resolveArray('meetings'),
                    users:              firebaseUtilsProvider.resolveArray('users'),
                    userMovies:         firebaseUtilsProvider.resolveArray('userMovies')
                }
            });
    }

}(window.angular));
