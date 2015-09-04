(function (angular) {
    'use strict';

    angular
        .module('movieClub')
        .factory('firebaseInterface', firebaseInterface);

    function firebaseInterface($firebaseArray, $firebaseObject, firebaseConverter) {

        var factory = {
            deleteObject: deleteObject,
            getArray: getArray,
            getObject: getObject,
            getObjectAsArray: getObjectAsArray,
            updateObject: updateObject
        };
        return factory;

        function getDeferredMethodInvocation(method) {
            return function (obj) {
                return obj[method]();
            };
        }

        function deleteObject(ref) {
            return $firebaseObject(ref)
                .$loaded()
                .then(getDeferredMethodInvocation('$remove'))
                .then(function () {
                    return null;
                });
        }

        function getArray(ref) {
            return $firebaseArray(ref)
                .$loaded()
                .then(firebaseConverter.convertFirebaseArrayToArray);
        }

        function getObject(ref) {
            return $firebaseObject(ref)
                .$loaded()
                .then(firebaseConverter.convertFirebaseObjectToObject);
        }

        function getObjectAsArray(ref) {
            return $firebaseObject(ref)
                .$loaded()
                .then(firebaseConverter.convertFirebaseObjectToArray);
        }

        // TODO: id?
        function updateObject(ref, data) {
            return $firebaseObject(ref)
                .$loaded()
                .then(_.partialRight(_.merge, data))
                .then(getDeferredMethodInvocation('$save'))
                .then(getObject);
        }
    }

}(window.angular));
