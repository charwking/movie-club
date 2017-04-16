(function () {
    'use strict';

    angular
        .module('movieClub')
        .provider('firebaseUtils', firebaseUtilsProvider);

    function firebaseUtilsProvider() {

        /* jshint validthis: true */
        var that = this;
        that.resolveArray = resolveArray;
        that.resolveObject = resolveObject;
        that.$get = firebaseUtils;

        function resolveArray(path) {
            var func = function (firebaseUtils) {
                return firebaseUtils.promiseArray(path);
            };
            func.$inject = ['firebaseUtils'];
            return func;
        }

        function resolveObject(path) {
            var func = function (firebaseUtils) {
                return firebaseUtils.promiseObject(path);
            };
            func.$inject = ['firebaseUtils'];
            return func;
        }

        function firebaseUtils($firebaseArray, $firebaseObject, firebaseRefFactory) {

            return {
                promiseArray: promiseArray,
                promiseObject: promiseObject
            };

            function promiseArray(path) {
                var ref = firebaseRefFactory.getRef(path);
                return $firebaseArray(ref).$loaded();
            }

            function promiseObject(path) {
                var ref = firebaseRefFactory.getRef(path);
                return $firebaseObject(ref).$loaded();
            }
        }
    }

}());
