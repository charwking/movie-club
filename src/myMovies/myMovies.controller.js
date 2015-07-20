(function (angular) {
    'use strict';

    angular
        .module('movieClub')
        .controller('MyMoviesController', MyMoviesController);

    function MyMoviesController(movies, youtubeValidator) {
        var vm = this;
        vm.movies = movies;
        vm.isSubmitting = false;
        vm.addMovie = addMovie;
        vm.watchTrailer = watchTrailer;
        vm.removeMovie = removeMovie;
        vm.moveDown = moveDown;
        vm.moveUp = moveUp;
        vm.validateMovieData = validateMovieData;
        vm.newMovieName = '';
        vm.newMovieTrailer = '';

        function addMovie() {
            vm.movies.$add({name: vm.newMovieName, trailerUrl: vm.newMovieTrailer, order: vm.movies.length});
            vm.newMovieName = '';
            vm.newMovieTrailer = '';
        }

        function watchTrailer(movie) {
            vm.selectedTrailer = movie.trailerUrl;
        }

        function removeMovie(movie) {
            vm.movies.$remove(movie).then(function () {
                _(vm.movies)
                    .sortBy('order')
                    .forEach(function (movie, index) {
                        movie.order = index;
                        vm.movies.$save(movie);
                    });
            });
        }

        function moveDown(movie) {
            var movieBelow = _.find(vm.movies, {order: movie.order + 1});
            swapMovies(movie, movieBelow);
        }

        function moveUp(movie) {
            var movieAbove = _.find(vm.movies, {order: movie.order - 1});
            swapMovies(movie, movieAbove);
        }

        function swapMovies(movieA, movieB) {
            var tempOrder = movieA.order;
            movieA.order = movieB.order;
            movieB.order = tempOrder;

            vm.movies.$save(movieA);
            vm.movies.$save(movieB);
        }

        function validateMovieData() {
            var url = vm.newMovieTrailer;
            var name = vm.newMovieName;
            if (name && name.length > 0 && (!url || url.length === 0 || youtubeValidator.getYoutubeId(url))) {
                return true;
            }
        }
    }

}(window.angular));
