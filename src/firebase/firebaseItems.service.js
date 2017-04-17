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
        module.factory(name, function (firebaseUtils) {
            return firebaseUtils.getArray(name);
        });
    });

    objectNames.forEach(function (name) {
        module.factory(name, function (firebaseUtils) {
            return firebaseUtils.getObject(name);
        });
    });
}());
