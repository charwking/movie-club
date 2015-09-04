(function (angular) {
    'use strict';

    angular
        .module('movieClub')
        .factory('usersApi', usersApi);

    function usersApi(firebaseInterface, firebaseRef) {

        var usersRef = firebaseRef.child('users');
        var factory = {
            'delete': del,
            get: get,
            list: list,
            update: update
        };
        return factory;

        // DELETE /api/users/:userId
        function del(userId) {
            return firebaseInterface.deleteObject(usersRef.child(userId));
        }

        // GET /api/users/:userId
        function get(userId) {
            return firebaseInterface.getObject(usersRef.child(userId));
        }

        // GET /api/users
        function list() {
            return firebaseInterface.getArray(usersRef);
        }

        // PATCH /api/users/:userId
        function update(user) {
            return firebaseInterface.updateObject(usersRef.child(user.id), user);
        }
    }

}(window.angular));
