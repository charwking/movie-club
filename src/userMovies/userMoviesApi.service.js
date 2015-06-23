(function (angular) {
    'use strict';

    angular
        .module('movieClub')
        .factory('userMoviesApi', userMoviesApi);

    function userMoviesApi($firebaseArray, firebaseRef) {
        var factory = {
            getAllByUserId: getAllByUserId
        };
        return factory;

        function getAllByUserId(userId) {
            return $firebaseArray(firebaseRef.child('userMovies').child(userId).child('movies'));
        }
    }

}(window.angular));
