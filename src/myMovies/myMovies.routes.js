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
                    movies: function (authApi, firebaseUtils) {
                        return authApi.getCurrentUser().then(function (user) {
                            return firebaseUtils.promiseArray(['userMovies', user.$id, 'movies']);
                        });
                    }
                }
            });
    }

}(window.angular));
