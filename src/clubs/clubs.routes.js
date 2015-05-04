(function (angular) {
    'use strict';

    angular
        .module('movieClub.clubs')
        .run(appRun);

    function appRun(routerHelper) {
        routerHelper.configureStates([
            {
                state: 'clubList',
                config: {
                    url: '/clubs',
                    templateUrl: 'clubs/clubList.html'
                }
            }
        ]);
    }

}(window.angular));
