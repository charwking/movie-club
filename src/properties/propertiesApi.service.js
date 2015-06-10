(function (angular) {
    'use strict';

    angular
        .module('movieClub.properties')
        .factory('propertiesApi', propertiesApi);

    function propertiesApi($firebaseObject, firebaseRef) {
        var factory = {
            getAll: getAll
        };
        return factory;

        function getAll() {
            return $firebaseObject(firebaseRef.child('properties')).$loaded();
        }
    }

}(window.angular));
