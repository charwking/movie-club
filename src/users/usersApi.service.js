(function (angular) {
    'use strict';

    angular
        .module('movieClub')
        .factory('usersApi', usersApi);

    function usersApi($firebaseArray, $firebaseObject, firebaseConverter, firebaseRef) {
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
                .then(firebaseConverter.removeObject);
        }

        // GET /api/users/:userId
        function get(userId) {
            return $firebaseObject(firebaseRef.child('users').child(userId))
                .$loaded()
                .then(firebaseConverter.cleanObject);
        }

        // GET /api/users
        function list() {
            return $firebaseArray(firebaseRef.child('users'))
                .$loaded()
                .then(firebaseConverter.cleanArray);
        }

        // PATCH /api/users/:userId
        function update(user) {
            $firebaseObject(firebaseRef.child('users').child(user.id))
                .$loaded()
                .then(firebaseConverter.updateObject);
        }
    }

}(window.angular));
