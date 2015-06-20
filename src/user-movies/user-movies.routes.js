(function (angular) {
    'use strict';

    angular
        .module('movieClub.userMovies')
        .config(appConfig);

    function appConfig($stateProvider) {

        $stateProvider
            .state('user-movies', {
                templateUrl: 'user-movies/user-movies.html',
                url: '/my-movies'
            });
    }

}(window.angular));
