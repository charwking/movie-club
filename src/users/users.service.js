(function (angular) {
    'use strict';

    angular
        .module('movieClub.users')
        .factory('usersService', usersService);

    function usersService(usersApi) {
        var factory = {
            getUsernames: getUsernames
        };
        return factory;

        function getUsernames() {
            return usersApi.getAll().$loaded()
                .then(function (users) {
                    return _(users)
                        .filter('username')
                        .pluck('username')
                        .value();
                });
        }
    }

}(window.angular));
