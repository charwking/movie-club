(function (angular) {
    'use strict';

    angular
        .module('movieClub.clubs')
        .factory('clubsApi', clubsApi);

    function clubsApi($firebaseArray, firebaseReference) {
        var factory = {
            getClubs: getClubs
        };
        return factory;

        function getClubs() {
            return $firebaseArray(firebaseReference.child('clubs'));
        }
    }

}(window.angular));
