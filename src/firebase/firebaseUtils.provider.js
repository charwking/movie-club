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
                getArray: getArray,
                getObject: getObject,
                promiseArray: promiseArray,
                promiseObject: promiseObject
            };

            function getArray(path) {
                var ref = firebaseRefFactory.getRef(path);
                return $firebaseArray(ref);
            }

            function getObject(path) {
                var ref = firebaseRefFactory.getRef(path);
                return $firebaseObject(ref);
            }

            function promiseArray(path) {
                return getArray(path).$loaded();
            }

            function promiseObject(path) {
                return getObject(path).$loaded();
            }
        }
    }
}());
