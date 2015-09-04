(function (angular) {
    'use strict';

    angular
        .module('movieClub')
        .factory('propertiesApi', propertiesApi);

    function propertiesApi(firebaseInterface, firebaseRef) {

        var propertiesRef = firebaseRef.child('propertyStore');
        var factory = {
            list: list
        };
        return factory;

        // GET /api/properties
        function list() {
            return firebaseInterface.getObjectAsArray(propertiesRef);
        }
    }

}(window.angular));
