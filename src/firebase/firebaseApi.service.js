(function (angular, Firebase) {
    'use strict';

    angular
        .module('movieClub.firebase')
        .factory('firebaseApi', firebaseApi);

    function firebaseApi(firebaseUtils) {

        var factory = {
                getClubs: getClubs,
                getClubById: getClubById
            },
            firebaseRootRef = new Firebase('https://glowing-inferno-1828.firebaseio.com/');
        return factory;

        function getClubs() {
            return firebaseUtils.getArray(firebaseRootRef.child('clubs'));
        }

        function getClubById(clubId) {
            return firebaseUtils.getObject(firebaseRootRef.child('clubs/' + clubId));
        }
    }

}(window.angular, window.Firebase));
