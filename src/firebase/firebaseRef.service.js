(function (angular, Firebase) {
    'use strict';

    angular
        .module('movieClub')
        .factory('firebaseRef', firebaseRef);

    function firebaseRef(environmentService) {

        var env = environmentService.get();

        var firebaseUrl =
            (env === environmentService.LOCAL || env === environmentService.DEV) ?
            'https://glowing-inferno-1828.firebaseio.com/' :
            'https://movie-club.firebaseio.com/';

        return new Firebase(firebaseUrl);
    }

}(window.angular, window.Firebase));
