(function (angular) {
    'use strict';

    angular
        .module('movieClub.clubs')
        .factory('clubsApi', clubsApi);

    function clubsApi($firebaseArray, $firebaseObject, firebaseRef) {
        var factory = {
            getAll: getAll,
            getById: getById
        };
        return factory;

        function getAll() {
            return $firebaseArray(firebaseRef.child('clubs')).$loaded();
        }

        function getById(clubId) {
            return $firebaseObject(firebaseRef.child('clubs/' + clubId)).$loaded();
        }
    }

}(window.angular));
