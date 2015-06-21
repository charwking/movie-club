(function (angular) {
    'use strict';

    angular
        .module('movieClub')
        .config(appConfig);

    function appConfig($stateProvider) {

        $stateProvider
            .state('userMovies', {
                controller: 'UserMovieController as userMovieVm',
                templateUrl: 'userMovies/userMovies.html',
                url: '/my-movies'
            });
    }

}(window.angular));
