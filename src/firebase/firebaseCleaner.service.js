(function (angular) {
    'use strict';

    angular
        .module('movieClub')
        .factory('firebaseCleaner', firebaseCleaner);

    function firebaseCleaner() {

        var factory = {
            cleanArray: cleanArray,
            cleanObject: cleanObject
        };
        return factory;

        function cleanArray(array) {
            var cleanArr = [];
            _.forEach(array, function (obj) {
                cleanArr.push(cleanObject(obj));
            });
            return cleanArr;
        }

        function cleanObject(obj) {
            var cleanObj = {};
            if (obj.$id) {
                cleanObj.id = obj.$id;
            }
            _.forEach(obj, function (val, key) {
                if (!_.startsWith(key, '$')) {
                    cleanObj[key] = val;
                }
            });
            return cleanObj;
        }

    }

}(window.angular));
