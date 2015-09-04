(function (angular) {
    'use strict';

    angular
        .module('movieClub')
        .factory('firebaseConverter', firebaseConverter);

    function firebaseConverter($firebaseObject) {

        var factory = {
            convertFirebaseArrayToArray: convertFirebaseArrayToArray,
            convertFirebaseObjectToArray: convertFirebaseObjectToArray,
            convertFirebaseObjectToObject: convertFirebaseObjectToObject
        };
        return factory;

        function convertFirebaseArrayToArray(firebaseArray) {
            return _.map(firebaseArray, function (firebaseObj) {
                return convertFirebaseObjectToObject(firebaseObj);
            });
        }

        function convertFirebaseObjectToArray(firebaseObj) {
            var obj = convertFirebaseObjectToObject(firebaseObj);
            return _.map(obj, function (val, key) {
                return {id: key, value: val};
            });
        }

        function convertFirebaseObjectToObject(firebaseObj) {
            var obj = {};
            if (firebaseObj.$id) {
                obj.id = firebaseObj.$id;
            }
            _.forEach(firebaseObj, function (val, key) {
                if (!_.startsWith(key, '$')) {
                    obj[key] = val;
                }
            });
            return obj;
        }
    }

}(window.angular));
