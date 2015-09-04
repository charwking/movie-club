(function (angular) {
    'use strict';

    angular
        .module('movieClub')
        .factory('usersApi', usersApi);

    function usersApi($firebaseArray, $firebaseObject, firebaseCleaner, firebaseInterface, firebaseRef) {
        var factory = {
            'delete': del,
            get: get,
            list: list,
            update: update
        };
        return factory;

        // DELETE /api/users/:userId
        function del(userId) {
            return $firebaseObject(firebaseRef.child('users').child(userId))
                .$loaded()
                .then(firebaseInterface.removeObject);
        }

        // GET /api/users/:userId
        function get(userId) {
            return $firebaseObject(firebaseRef.child('users').child(userId))
                .$loaded()
                .then(firebaseCleaner.cleanObject);
        }

        // GET /api/users
        function list() {
            return $firebaseArray(firebaseRef.child('users'))
                .$loaded()
                .then(firebaseCleaner.cleanArray);
        }

        // PATCH /api/users/:userId
        function update(user) {
            $firebaseObject(firebaseRef.child('users').child(user.id))
                .$loaded()
                .then(firebaseInterface.updateObject);
        }
    }

}(window.angular));
