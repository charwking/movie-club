(function () {
    'use strict';

    angular
        .module('movieClub')
        .factory('authState', authState);

    /* @ngInject */
    function authState($firebaseAuthService, adminStore) {

        var user;
        $firebaseAuthService.$onAuthStateChanged(function (newUser) {
            user = newUser;
        });

        return {
            isAdmin: isAdmin,
            isLoggedIn: isLoggedIn,
        };

        function isAdmin() {
            return isLoggedIn() && adminStore[user.uid];
        }

        function isLoggedIn() {
            return user && user.uid;
        }
    }
}());
