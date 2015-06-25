(function (angular) {
    'use strict';

    angular
        .module('movieClub')
        .factory('currentMovieUserApi', currentMovieUserApi);

    function currentMovieUserApi($firebaseObject, firebaseRef) {
        var factory = {
            get: get
        };
        return factory;

        function get() {
            return $firebaseObject(firebaseRef.child('currentMovieUser'));
        }
    }

}(window.angular));
