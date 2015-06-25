(function (angular) {
    'use strict';

    angular
        .module('movieClub')
        .factory('adminStoreApi', adminStoreApi);

    function adminStoreApi($firebaseObject, firebaseRef) {
        var factory = {
            get: get
        };
        return factory;

        function get() {
            return $firebaseObject(firebaseRef.child('adminStore'));
        }
    }

}(window.angular));
