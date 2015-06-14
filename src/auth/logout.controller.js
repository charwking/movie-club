(function (angular) {
    'use strict';

    angular
        .module('movieClub.auth')
        .controller('LogoutController', LogoutController);

    function LogoutController(authApi) {
        authApi.logout();
    }

}(window.angular));
