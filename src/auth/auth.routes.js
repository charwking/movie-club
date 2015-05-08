(function (angular) {
    'use strict';

    angular
        .module('movieClub.auth')
        .run(appRun);

    function appRun(routerHelper) {
        routerHelper.configureStates([
            {
                state: 'auth',
                config: {
                    url: '/auth/:action',
                    templateUrl: 'auth/auth.html'
                }
            }
        ]);
    }

}(window.angular));
