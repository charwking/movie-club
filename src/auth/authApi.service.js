(function (angular) {
    'use strict';

    angular
        .module('movieClub.auth')
        .factory('authApi', authApi);

    function authApi($firebaseAuth, firebaseRef) {
        var factory = {
                getCurrentUser: getCurrentUser,
                login: login,
                logout: logout,
                register: register
            },
            authRef = $firebaseAuth(firebaseRef);
        return factory;

        function login(email, password) {
            var credentials = {
                email: email,
                password: password
            };
            return authRef.$authWithPassword(credentials);
        }

        function logout() {
            authRef.$unauth();
        }

        function register(email, password) {
            var credentials = {
                email: email,
                password: password
            };

            return authRef.$createUser(credentials)
                .then(function () {
                    return login(email, password);
                });
        }

        function getCurrentUser() {
            return authRef.$getAuth();
        }
    }

}(window.angular));
