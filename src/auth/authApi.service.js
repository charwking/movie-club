(function (angular) {
    'use strict';

    angular
        .module('movieClub')
        .factory('authApi', authApi);

    function authApi($firebaseAuth, $q, adminStoreApi, firebaseRef, usersApi) {
        var factory = {
                login: login,
                logout: logout,
                register: register,
                getCurrentUser: getCurrentUser,
                isLoggedIn: isLoggedIn,
                isAdmin: isAdmin
            },
            currentUserId,
            isAdminFlag,
            authRef = $firebaseAuth(firebaseRef);

        init();
        return factory;

        function init() {
            recordUser(authRef.$getAuth());
        }

        function recordUser(authData) {
            if (authData && authData.uid) {
                currentUserId = authData.uid;
                return adminStoreApi.get().$loaded().then(function (adminStore) {
                    isAdminFlag = adminStore[currentUserId];
                    return authData;
                });
            }
        }

        function login(email, password) {
            return authRef
                .$authWithPassword({email: email, password: password})
                .then(recordUser);
        }

        function logout() {
            currentUserId = null;
            isAdminFlag = false;
            authRef.$unauth();
        }

        function register(username, email, password) {
            return authRef.$createUser({email: email, password: password})
                .then(_.partial(login, email, password))
                .then(_.partialRight(addUsername, username));
        }

        function addUsername(auth, username) {
            return usersApi.update({id: auth.uid, username: username});
        }

        function getCurrentUser() {
            return currentUserId ? usersApi.get(currentUserId) : getUnauthorizedUser();
        }

        function getUnauthorizedUser() {
            return $q.when({'id': null});
        }

        function isLoggedIn() {
            return !!currentUserId;
        }

        function isAdmin() {
            return isAdminFlag;
        }
    }

}(window.angular));
