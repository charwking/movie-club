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
            return _.map(array, function (obj) {
                return cleanObject(obj);
            });
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
