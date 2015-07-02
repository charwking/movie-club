(function (angular) {
    'use strict';

    angular
        .module('movieClub')
        .factory('environmentService', environmentService);

    function environmentService($location) {

        var factory = {
            get: get,
            LOCAL: 'local',
            DEV: 'dev',
            PROD: 'prod'
        };
        return factory;

        function get() {
            var host = $location.host();

            if (host === 'localhost') {
                return factory.LOCAL;
            }

            if (_.startsWith(host, 'dev.')) {
                return factory.DEV;
            }

            return factory.PROD;
        }
    }

}(window.angular));
