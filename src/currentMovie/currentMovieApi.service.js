(function (angular) {
    'use strict';

    angular
        .module('movieClub')
        .factory('currentMovieApi', currentMovieApi);

    function currentMovieApi($firebaseObject, firebaseRef) {
        var factory = {
            get: get
        };
        return factory;

        function get() {
            return $firebaseObject(firebaseRef.child('currentMovie'));
        }
    }

}(window.angular));
