(function () {
    'use strict';

    angular
        .module('movieClub')
        .config(appConfig);

    function appConfig($stateProvider) {

        $stateProvider
            .state('admin.hostMeeting', {
                controller: 'HostMeetingController as hostMeetingVm',
                templateUrl: 'admin/hostMeeting/hostMeeting.html',
                url: '/admin/host-meeting'
            });
    }

}());
