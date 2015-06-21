(function (angular) {
    'use strict';

    angular
        .module('movieClub')
        .factory('usersApi', usersApi);

    function usersApi($firebaseArray, $firebaseObject, firebaseRef) {
        var factory = {
            getById: getById,
            getAll: getAll
        };
        return factory;

        function getById(userId) {
            return $firebaseObject(firebaseRef.child('users').child(userId));
        }

        function getAll() {
            return $firebaseArray(firebaseRef.child('users'));
        }
    }

}(window.angular));
