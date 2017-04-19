(function () {
    'use strict';

    angular
        .module('movieClub')
        .factory('firebaseUtils', firebaseUtils);

    function firebaseUtils($firebaseArray, $firebaseObject, firebaseRefFactory) {

        return {
            getArray: getArray,
            getObject: getObject,
            promiseArray: promiseArray
        };

        function getArray(path) {
            var ref = firebaseRefFactory.getRef(path);
            return $firebaseArray(ref);
        }

        function getObject(path) {
            var ref = firebaseRefFactory.getRef(path);
            return $firebaseObject(ref);
        }

        function promiseArray(path) {
            return getArray(path).$loaded();
        }
    }
}());
