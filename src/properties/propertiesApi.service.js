(function (angular) {
    'use strict';

    angular
        .module('movieClub')
        .factory('propertiesApi', propertiesApi);

    function propertiesApi($firebaseObject, firebaseCleaner, firebaseInterface, firebaseRef) {
        var factory = {
            list: list
        };
        return factory;

        // GET /api/properties
        function list() {
            return $firebaseObject(firebaseRef.child('propertyStore'))
                .$loaded()
                .then(firebaseCleaner.cleanObject)
                .then(_.partialRight(firebaseInterface.convertObjectToArray, 'id', 'value'));
        }
    }

}(window.angular));
