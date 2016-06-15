(function (angular) {
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

        function firebaseUtils($firebaseArray, $firebaseObject, $firebaseRef) {

            return {
                promiseArray: promiseArray,
                promiseObject: promiseObject
            };

            function getReference(path) {
                path = Array.isArray(path) ? path : [path];
                return _.reduce(path, function (ref, child) {
                    return ref.child(child);
                }, $firebaseRef.default);
            }

            function promiseArray(path) {
                var ref = getReference(path);
                return $firebaseArray(ref).$loaded();
            }

            function promiseObject(path) {
                var ref = getReference(path);
                return $firebaseObject(ref).$loaded();
            }
        }
    }

}(window.angular));

