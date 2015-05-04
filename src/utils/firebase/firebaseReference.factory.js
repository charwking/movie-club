(function (angular, Firebase) {
    'use strict';

    angular
        .module('utils.firebase')
        .factory('firebaseReference', firebaseReference);

    function firebaseReference() {
        return new Firebase('https://glowing-inferno-1828.firebaseio.com/');
    }

}(window.angular, window.Firebase));
