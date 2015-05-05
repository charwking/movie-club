(function (angular) {
    'use strict';

    angular
        .module('movieClub.firebase')
        .factory('firebaseUtils', firebaseUtils);

    function firebaseUtils($firebaseArray, $firebaseObject) {
        var factory = {
            getArray: getArray,
            getObject: getObject
        };
        return factory;

        function getArray(ref) {
            var arr = $firebaseArray(ref);
            addLoadingIndicator(arr);
            return arr;
        }

        function getObject(ref) {
            var obj = $firebaseObject(ref);
            addLoadingIndicator(obj);
            return obj;
        }

        function addLoadingIndicator(item) {
            item.$isLoading = true;
            item.$loaded()
                .then(function () { item.$isLoading = false; })
                .catch(function () { item.$isLoading = false; });
        }

    }

}(window.angular));
