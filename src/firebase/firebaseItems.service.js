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
    module.factory('myMoviesFactory', function ($firebaseAuthService, firebaseUtils) {
        return {
            get: function () {
                var uid = $firebaseAuthService.$getAuth().uid;
                return firebaseUtils.getArray(['userMovies', uid, 'movies']);
            }
        };
    });
}());
