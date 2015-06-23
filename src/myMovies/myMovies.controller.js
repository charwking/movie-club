(function (angular) {
    'use strict';

    angular
        .module('movieClub')
        .controller('MyMoviesController', MyMoviesController);

    function MyMoviesController(movies) {
        var vm = this;
        vm.movies = movies;
        vm.isSubmitting = false;
        vm.addMovie = addMovie;
        vm.removeMovie = removeMovie;
        vm.moveDown = moveDown;
        vm.moveUp = moveUp;

        function addMovie() {
            vm.movies.$add({name: vm.newMovieName, order: vm.movies.length});
            vm.newMovieName = '';
        }

        function removeMovie(movie) {
            vm.movies.$remove(movie).then(function () {
                _.forEach(vm.movies, function (movie, index) {
                    movie.order = index;
                    vm.movies.$save(movie);
                });
            });
        }

        function moveDown(movie) {
            var movieBelow = _.find(vm.movies, {order: currentOrder + 1});
            swapMovies(movie, movieBelow);
        }

        function moveUp(movie) {
            var movieAbove = _.find(vm.movies, {order: currentOrder - 1});
            swapMovies(movie, movieAbove);
        }

        function swapMovies(movieA, movieB) {
            var tempOrder = movieA.order;
            movieA.order = movieB.order;
            movieB.order = tempOrder;

            vm.movies.$save(movieA);
            vm.movies.$save(movieB);
        }
    }

}(window.angular));
