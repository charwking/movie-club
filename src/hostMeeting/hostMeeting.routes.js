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
                    users: function (usersApi) {
                        return usersApi.getAll().$loaded();
                    }
                }
            });
    }

}(window.angular));
