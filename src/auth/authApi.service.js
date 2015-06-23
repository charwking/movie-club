(function (angular) {
    'use strict';

    angular
        .module('movieClub')
        .factory('authApi', authApi);

    function authApi($firebaseAuth, $q, usersApi, firebaseRef) {
        var factory = {
                login: login,
                logout: logout,
                register: register,
                getCurrentUser: getCurrentUser,
                isLoggedIn: isLoggedIn
            },
            currentUserId,
            authRef = $firebaseAuth(firebaseRef);
        return factory;

        function login(email, password) {
            return authRef
                .$authWithPassword({email: email, password: password})
                .then(function (auth) {
                    currentUserId = auth.uid;
                    return auth;
                });
        }

        function logout() {
            currentUserId = null;
            authRef.$unauth();
        }

        function register(username, email, password) {
            return authRef.$createUser({email: email, password: password})
                .then(_.partial(login, email, password))
                .then(_.partialRight(addUsername, username));
        }

        function addUsername(auth, username) {
            var user = usersApi.getById(auth.uid);
            user.username = username;
            return user.$save();
        }

        function getCurrentUser() {
            return currentUserId ? usersApi.getById(currentUserId) : getUnauthorizedUser();
        }

        function getUnauthorizedUser() {
            var user = {'$id': null};
            user.$loaded = _.partial($q.when, user);
            return user;
        }

        function isLoggedIn() {
            return !!currentUserId;
        }
    }

}(window.angular));
