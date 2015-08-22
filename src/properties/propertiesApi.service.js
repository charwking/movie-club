(function (angular) {
    'use strict';

    angular
        .module('movieClub')
        .factory('propertiesApi', propertiesApi);

    function propertiesApi($firebaseObject, firebaseConverter, firebaseRef) {
        var factory = {
            list: list
        };
        return factory;

        // GET /api/properties
        function list() {
            return $firebaseObject(firebaseRef.child('propertyStore'))
                .$loaded()
                .then(firebaseConverter.cleanObject)
                .then(_.partialRight(firebaseConverter.convertObjectToArray, 'id', 'value'));
        }
    }

}(window.angular));
