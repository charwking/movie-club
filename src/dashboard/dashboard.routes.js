(function (angular) {
    'use strict';

    angular
        .module('movieClub.dashboard')
        .run(appRun);

    function appRun(routerHelper) {
        routerHelper.configureStates([
            {
                state: 'dashboard',
                config: {
                    url: '/',
                    templateUrl: 'dashboard/dashboard.html'
                }
            }
        ]);
    }

}(window.angular));
