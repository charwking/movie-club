(function (angular, Firebase) {
    'use strict';

    angular
        .module('movieClub.firebase')
        .factory('firebaseRef', firebaseRef);

    function firebaseRef() {
        return new Firebase('https://glowing-inferno-1828.firebaseio.com/');
    }

}(window.angular, window.Firebase));
