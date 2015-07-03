(function (angular) {
    'use strict';

    angular
        .module('movieClub')
        .factory('propertiesApi', propertiesApi);

    function propertiesApi($firebaseObject, firebaseRef) {
        var factory = {
            get: get
        };
        return factory;

        function get() {
            return $firebaseObject(firebaseRef.child('propertyStore')).$loaded();
        }
    }

}(window.angular));
