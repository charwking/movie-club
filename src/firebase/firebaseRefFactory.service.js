(function () {
    'use strict';

    angular
        .module('movieClub')
        .factory('firebaseRefFactory', firebaseRefFactory);

    /* @ngInject */
    function firebaseRefFactory($firebaseRef) {

        return {
            getRef: getRef
        };

        function getRef(path) {
            var pathSegments = Array.isArray(path) ? path : [path];
            return _.reduce(pathSegments, function (ref, segment) {
                return ref.child(segment);
            }, $firebaseRef.default);
        }
    }
}());
