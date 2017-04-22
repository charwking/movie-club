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
        var factoryFunc = getFactoryFunc('$firebaseArray', name);
        module.factory(name, factoryFunc);
    });

    objectNames.forEach(function (name) {
        var factoryFunc = getFactoryFunc('$firebaseObject', name);
        module.factory(name, factoryFunc);
    });

    module.factory('movieQueueFactory', movieQueueFactory);

    function getFactoryFunc(firebaseServiceName, firebaseItemName) {
        var func = function (firebaseService, firebaseRefFactory) {
            var ref = firebaseRefFactory.getRef(firebaseItemName);
            return firebaseService(ref);
        };
        func.$inject = [firebaseServiceName, 'firebaseRefFactory'];
        return func;
    }

    /* @ngInject */
    function movieQueueFactory($firebaseArray, $firebaseAuthService, firebaseRefFactory) {
        return {
            getForCurrentUser: getForCurrentUser,
            getForUserId: getForUserId
        };

        function getForCurrentUser() {
            var uid = $firebaseAuthService.$getAuth().uid;
            return getForUserId(uid);
        }

        function getForUserId(uid) {
            var ref = firebaseRefFactory.getRef(['userMovies', uid, 'movies']);
            return $firebaseArray(ref);
        }
    }
}());
