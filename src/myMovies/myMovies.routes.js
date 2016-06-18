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

                resolve: {
                    movies: function ($firebaseAuthService, firebaseUtils) {
                        return $firebaseAuthService.$requireSignIn().then(function (auth) {
                            return firebaseUtils.promiseArray(['userMovies', auth.uid, 'movies']);
                        });
                    }
                }
            });
    }

}(window.angular));

