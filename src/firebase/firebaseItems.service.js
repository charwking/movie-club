(function () {
    'use strict';

    var module = angular.module('movieClub');

    var arrayNames = [
        'meetings',
        'userMovies',
        'users'
    ];

    var objectNames = [
        'adminStore',
        'currentMovie',
        'currentMovieUser',
        'propertyStore'
    ];

    arrayNames.forEach(function (name) {
        var factoryFunc = getFactoryFunc('getArray', name);
        module.factory(name, factoryFunc);
    });

    objectNames.forEach(function (name) {
        var factoryFunc = getFactoryFunc('getObject', name);
        module.factory(name, factoryFunc);
    });

    function getFactoryFunc(nameOfUtilsGetMethod, firebaseItemName) {
        var func = function (firebaseUtils) {
            return firebaseUtils[nameOfUtilsGetMethod](firebaseItemName);
        };
        func.$inject = ['firebaseUtils'];
        return func;
    }

    /* @ngInject */
    module.factory('movieQueuesFactory', function ($firebaseAuthService, firebaseUtils) {
        return {
            getForCurrentUser: getForCurrentUser,
            getForUserId: getForUserId
        };

        function getForCurrentUser() {
            var uid = $firebaseAuthService.$getAuth().uid;
            return getForUserId(uid);
        }

        function getForUserId(uid) {
            return firebaseUtils.getArray(['userMovies', uid, 'movies']);
        }
    });

    /* @ngInject */
    module.factory('userFactory', function ($firebaseAuthService, firebaseUtils) {
        return {
            get: function () {
                var uid = $firebaseAuthService.$getAuth().uid;
                return firebaseUtils.getArray(['users', uid]);
            }
        };
    });
}());
