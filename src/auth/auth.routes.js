(function (angular) {
    'use strict';

    angular
        .module('movieClub.auth')
        .run(appRun);

    function appRun(routerHelper) {
        routerHelper.configureStates([
            {
                state: 'login',
                config: {
                    url: '/auth/login',
                    templateUrl: 'auth/login.html'
                }
            },
            {
                state: 'register',
                config: {
                    url: '/auth/register',
                    templateUrl: 'auth/register.html'
                }
            },
            {
                state: 'logout',
                config: {
                    url: '/auth/logout',
                    templateUrl: 'auth/logout.html'
                }
            }
        ]);
    }

}(window.angular));
