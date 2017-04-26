(function() {
  "use strict";
  angular.module("movieClub").factory("MovieQueue", MovieQueue);

  /* @ngInject */
  function MovieQueue($firebaseArray, $q) {
    var MovieQueueType = $firebaseArray.$extend({
      addMovie: addMovie,
      removeMovie: removeMovie,
      moveMovieUp: moveMovieUp,
      moveMovieDown: moveMovieDown
    });

    return function(ref) {
      return new MovieQueueType(ref);
    };

    function addMovie(movie) {
      movie.order = this.$list.length;
      return this.$add(movie);
    }

    function removeMovie(movie) {
      var queue = this;
      return queue.$remove(movie).then(function() {
        var sortedMovies = _.sortBy(queue.$list, "order");
        _.forEach(sortedMovies, function(movie, index) {
          movie.order = index;
        });
        var promises = _.map(sortedMovies, function(movie) {
          return queue.$save(movie);
        });
        return $q.all(promises).then(function() {
          return queue;
        });
      });
    }

    function moveMovieUp(movie) {
      var queue = this;
      if (movie.order === 0) {
        return $q.when(queue);
      }

      var movieAbove = _.find(queue.$list, { order: movie.order - 1 });
      return swapMovies(queue, movie, movieAbove);
    }

    function moveMovieDown(movie) {
      var queue = this;
      if (movie.order === queue.$list.length - 1) {
        return $q.when(queue);
      }

      var movieBelow = _.find(queue.$list, { order: movie.order + 1 });
      return swapMovies(queue, movie, movieBelow);
    }

    function swapMovies(queue, movieA, movieB) {
      var tempOrder = movieA.order;
      movieA.order = movieB.order;
      movieB.order = tempOrder;

      return $q
        .all([queue.$save(movieA), queue.$save(movieB)])
        .then(function() {
          return queue;
        });
    }
  }
})();
