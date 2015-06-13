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
            },
            {
                state: 'register',
                config: {
                    url: '/register',
                    templateUrl: 'auth/register.html'
                }
            }
        ]);
    }

}(window.angular));
