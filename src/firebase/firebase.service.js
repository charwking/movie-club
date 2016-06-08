(function (angular) {
    'use strict';

    angular
        .module('movieClub')
        .factory('firebase', firebase);

    function firebase($firebaseArray, $firebaseObject, firebaseRef) {

        return {
            promiseArray: promiseArray,
            promiseObject: promiseObject
        };

        function getReference(path) {
            path = Array.isArray(path) ? path : [path];
            return _.reduce(path, function (ref, child) {
                return ref.child(child);
            }, firebaseRef);
        }

        function promiseArray(path) {
            var ref = getReference(path);
            return $firebaseArray(ref).$loaded();
        }

        function promiseObject(path) {
            var ref = getReference(path);
            return $firebaseObject(ref).$loaded();
        }
    }

}(window.angular));

