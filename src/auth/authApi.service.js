(function () {
    'use strict';

    angular
        .module('movieClub')
        .factory('authApi', authApi);

    function authApi($firebaseAuthService, userFactory) {
        return {
            login: login,
            logout: logout,
            register: register
        };

        function login(email, password) {
            return $firebaseAuthService
                .$signInWithEmailAndPassword(email, password);
        }

        function logout() {
            $firebaseAuthService.$signOut();
        }

        function register(username, email, password) {
            return $firebaseAuthService
                .$createUserWithEmailAndPassword(email, password)
                .then(_.partial(login, email, password))
                .then(_.partial(addUsername, username));
        }

        function addUsername(username) {
            return userFactory
                .get()
                .$loaded()
                .then(function (user) {
                    user.username = username;
                    return user.$save();
                });
        }
    }
}());
