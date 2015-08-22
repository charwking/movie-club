(function (angular) {
    'use strict';

    angular
        .module('movieClub')
        .factory('firebaseConverter', firebaseConverter);

    function firebaseConverter() {

        var factory = {
            cleanObject: cleanObject,
            convertObjectToArray: convertObjectToArray
        };
        return factory;

        function cleanObject(obj) {
            var cleanObj = {};
            _.forEach(obj, function (val, key) {
                if (!_.startsWith(key, '$')) {
                    cleanObj[key] = val;
                }
            });
            return cleanObj;
        }

        function convertObjectToArray(obj, keyAttrName, valAttrName) {
            var arr = [];
            _.forEach(obj, function (val, key) {
                var elem = {};
                elem[keyAttrName] = key;
                elem[valAttrName] = val;
                arr.push(elem);
            });
            return arr;
        }
    }

}(window.angular));
