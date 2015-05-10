(function (angular) {
    'use strict';

    angular
        .module('movieClub.auth')
        .factory('authApi', authApi);

    function authApi($firebaseAuth, usersApi, firebaseRef) {
        var factory = {
                login: login,
                logout: logout,
                onAuth: onAuth,
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

        function onAuth(func) {
            return authRef.$onAuth(func);
        }

        function register(username, email, password) {
            var credentials = {
                email: email,
                password: password
            };

            return authRef.$createUser(credentials)
                .then(function () {
                    return login(email, password)
                        .then(function (auth) {
                            usersApi.create(auth.uid, username);
                        });
                });
        }
    }

}(window.angular));
