(function () {
    'use strict';

    angular
        .module('movieClub')
        .config(appConfig);

    function appConfig($stateProvider) {

        $stateProvider
            .state('user.myMovies', {
                controller: 'MyMoviesController as myMoviesVm',
                templateUrl: 'user/myMovies/myMovies.html',
                url: '/user/my-movies'
            });
    }
}());
