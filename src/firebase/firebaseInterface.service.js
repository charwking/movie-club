(function (angular) {
    'use strict';

    angular
        .module('movieClub')
        .factory('firebaseInterface', firebaseInterface);

    function firebaseInterface(firebaseCleaner) {

        var factory = {
            convertObjectToArray: convertObjectToArray,
            removeObject: removeObject,
            updateObject: updateObject
        };
        return factory;

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
                .then(firebaseCleaner.cleanObject);
        }
    }

}(window.angular));
