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
                    controller: 'LoginController as loginVm',
                    templateUrl: 'auth/login.html',
                    url: '/auth/login'
                }
            },
            {
                state: 'register',
                config: {
                    controller: 'RegisterController as registerVm',
                    templateUrl: 'auth/register.html',
                    url: '/auth/register',
                    resolve: {
                        users: function (usersApi) {
                            return usersApi.getAll().$loaded();
                        }
                    }
                }
            },
            {
                state: 'logout',
                config: {
                    controller: 'LogoutController as logoutVm',
                    templateUrl: 'auth/logout.html',
                    url: '/auth/logout'
                }
            }
        ]);
    }

}(window.angular));
