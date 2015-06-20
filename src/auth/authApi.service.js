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
            return authRef.$authWithPassword({email: email, password: password});
        }

        function logout() {
            authRef.$unauth();
        }

        function register(username, email, password) {
            return authRef.$createUser({email: email, password: password})
                .then(_.partial(login, email, password))
                .then(_.partialRight(addUsername, username));
        }

        function onAuth(func) {
            return authRef.$onAuth(func);
        }

        function addUsername(auth, username) {
            var user = usersApi.getById(auth.uid);
            user.username = username;
            user.$save();
            return user.$loaded();
        }
    }

}(window.angular));
