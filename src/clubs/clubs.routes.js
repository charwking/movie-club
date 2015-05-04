(function (angular) {
    'use strict';

    angular
        .module('movieClub.clubs')
        .run(appRun);

    function appRun(routerHelper) {
        routerHelper.configureStates([
            {
                state: 'listClubs',
                config: {
                    url: '/clubs',
                    templateUrl: 'clubs/clubs.html'
                }
            }
        ]);
    }

}(window.angular));
