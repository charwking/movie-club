(function (angular) {
    'use strict';

    angular
        .module('movieClub.comingSoon')
        .run(appRun);

    function appRun(routerHelper) {
        routerHelper.configureStates([
            {
                state: 'comingSoon',
                config: {
                    url: '/coming-soon',
                    templateUrl: 'coming-soon/coming-soon.html'
                }
            }
        ]);
    }

}(window.angular));
