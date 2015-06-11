(function (angular) {
    'use strict';

    angular
        .module('movieClub.users')
        .factory('currentUser', currentUser);

    function currentUser(authApi, usersApi) {
        var factory = {
                isLoggedIn: isLoggedIn,
                get: get
            },
            user;
        init();
        return factory;

        function init() {
            authApi.onAuth(function (data) {
                user = (data && data.uid) ? usersApi.getById(data.uid) : null;
            });
        }

        function isLoggedIn() {
            return !!user;
        }

        function get() {
            return user;
        }
    }

}(window.angular));
