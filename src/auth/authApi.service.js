(function (angular) {
    'use strict';

    angular
        .module('movieClub')
        .factory('authApi', authApi);

    function authApi($firebaseAuthService, $q, firebaseUtils) {
        var factory = {
                login: login,
                logout: logout,
                register: register,
                isLoggedIn: isLoggedIn,
                isAdmin: isAdmin
            },
            currentUserId,
            isAdminFlag,
            authRef = $firebaseAuthService;

        init();
        return factory;

        function init() {
            recordUser(authRef.$getAuth());
        }

        function recordUser(authData) {
            if (authData && authData.uid) {
                currentUserId = authData.uid;
                return firebaseUtils.promiseObject('adminStore').then(function (adminStore) {
                    isAdminFlag = adminStore[currentUserId];
                    return authData;
                });
            }
        }

        function login(email, password) {
            return authRef
                .$signInWithEmailAndPassword(email, password)
                .then(recordUser);
        }

        function logout() {
            currentUserId = null;
            isAdminFlag = false;
            authRef.$signOut();
        }

        function register(username, email, password) {
            return authRef.$createUserWithEmailAndPassword(email, password)
                .then(_.partial(login, email, password))
                .then(_.partialRight(addUsername, username));
        }

        function addUsername(auth, username) {
            return firebaseUtils.promiseObject(['users', auth.uid])
                .then(function (user) {
                    user.username = username;
                    return user.$save();
                });
        }

        function isLoggedIn() {
            return !!currentUserId;
        }

        function isAdmin() {
            return isAdminFlag;
        }
    }

}(window.angular));
