(function (angular) {
    'use strict';

    angular
        .module('movieClub.users')
        .factory('usersApi', usersApi);

    function usersApi($firebaseObject, $q, firebaseRef) {
        var factory = {
            create: create,
            get: get
        };
        return factory;

        function create(userId, username) {
            var deferred = $q.defer();
            firebaseRef
                .child('users')
                .child(userId)
                .set({'username': username}, function () {
                    deferred.resolve();
                });
            return deferred.promise;
        }

        function get(userId) {
            return $firebaseObject(firebaseRef.child('users').child(userId));
        }
    }

}(window.angular));
