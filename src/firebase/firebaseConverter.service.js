(function (angular) {
    'use strict';

    angular
        .module('movieClub')
        .factory('firebaseConverter', firebaseConverter);

    function firebaseConverter() {

        var factory = {
            cleanArray: cleanArray,
            cleanObject: cleanObject,
            convertObjectToArray: convertObjectToArray,
            removeObject: removeObject,
            updateObject: updateObject
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

        function removeObject(obj) {
            return obj.$remove()
                .then(function () {
                    return null;
                });
        }

        function updateObject(obj, newData) {
            return _.merge(obj, newData)
                .$save()
                .then(factory.cleanObject);
        }
    }

}(window.angular));
