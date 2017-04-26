(function() {
  "use strict";
  angular
    .module("movieClub")
    .controller("MyMoviesController", MyMoviesController);

  function MyMoviesController(movieQueueFactory, youtubeValidator) {
    var vm = this;
    vm.movies = movieQueueFactory.getForCurrentUser();
    vm.isSubmitting = false;
    vm.addMovie = addMovie;
    vm.watchTrailer = watchTrailer;
    vm.removeMovie = vm.movies.removeMovie;
    vm.moveDown = vm.movies.moveMovieDown;
    vm.moveUp = vm.movies.moveMovieUp;
    vm.validateMovieData = validateMovieData;
    vm.newMovieName = "";
    vm.newMovieTrailer = "";

    function addMovie() {
      vm.movies.addMovie({
        name: vm.newMovieName,
        trailerUrl: vm.newMovieTrailer
      });
      vm.newMovieName = "";
      vm.newMovieTrailer = "";
    }

    function watchTrailer(movie) {
      vm.selectedTrailer = movie.trailerUrl;
    }

    function removeMovie(movie) {
      vm.movies.removeMovie(movie);
    }

    function validateMovieData() {
      var url = vm.newMovieTrailer;
      var name = vm.newMovieName;
      if (
        name &&
        name.length > 0 &&
        (!url || url.length === 0 || youtubeValidator.getYoutubeId(url))
      ) {
        return true;
      }
    }
  }
})();
