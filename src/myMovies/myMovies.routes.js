(function (angular) {
    'use strict';

    angular
        .module('movieClub')
        .config(appConfig);

    function appConfig($stateProvider) {

        $stateProvider
            .state('myMovies', {
                controller: 'MyMoviesController as myMoviesVm',
                templateUrl: 'myMovies/myMovies.html',
                url: '/my-movies',

                authRequired: true,

                resolve: {
                    movies: function (authApi, userMoviesApi) {
                        return authApi.getCurrentUser().then(function (user) {
                            return userMoviesApi.getAllByUserId(user.id).$loaded();
                        });
                    }
                }
            });
    }

}(window.angular));
