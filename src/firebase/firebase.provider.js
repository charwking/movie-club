(function (angular) {
    'use strict';

    angular
        .module('movieClub')
        .provider('firebase', firebaseProvider);

    function firebaseProvider() {

        /* jshint validthis: true */
        var that = this;
        that.resolveArray = resolveArray;
        that.resolveObject = resolveObject;
        that.$get = firebase;

        function resolveArray(path) {
            var func = function (firebase) {
                return firebase.promiseArray(path);
            };
            func.$inject = ['firebase'];
            return func;
        }

        function resolveObject(path) {
            var func = function (firebase) {
                return firebase.promiseObject(path);
            };
            func.$inject = ['firebase'];
            return func;
        }

        function firebase($firebaseArray, $firebaseObject, firebaseRef) {

            return {
                promiseArray: promiseArray,
                promiseObject: promiseObject
            };

            function getReference(path) {
                path = Array.isArray(path) ? path : [path];
                return _.reduce(path, function (ref, child) {
                    return ref.child(child);
                }, firebaseRef);
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

