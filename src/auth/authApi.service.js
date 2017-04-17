(function () {
    'use strict';

    angular
        .module('movieClub')
        .factory('authApi', authApi);

    function authApi($firebaseAuthService, firebaseUtils) {
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
                .then(_.partialRight(addUsername, username));
        }

        function addUsername(auth, username) {
            return firebaseUtils
                .promiseObject(['users', auth.uid])
                .then(function (user) {
                    user.username = username;
                    return user.$save();
                });
        }
    }
}());
