(function (angular) {
    'use strict';

    angular
        .module('movieClub')
        .factory('propertyStoreApi', propertyStoreApi);

    function propertyStoreApi($firebaseObject, firebaseRef) {
        var factory = {
            get: get
        };
        return factory;

        function get() {
            return $firebaseObject(firebaseRef.child('propertyStore'));
        }
    }

}(window.angular));
