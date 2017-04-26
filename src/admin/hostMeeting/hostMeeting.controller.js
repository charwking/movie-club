(function(angular) {
  "use strict";
  angular
    .module("movieClub")
    .controller("HostMeetingController", HostMeetingController);

  function HostMeetingController(
    $state,
    currentMovie,
    currentMovieUser,
    meetings,
    movieSelector,
    movieQueueFactory,
    users,
    userMovies
  ) {
    var presentUsers = {};
    var userCredits = {};
    var totalCredits = 0;

    var vm = this;
    vm.allUsers = users;

    vm.anyUserHasMovies = anyUserHasMovies;
    vm.userHasMovies = userHasMovies;
    vm.userIsPresent = userIsPresent;
    vm.makeUserPresent = makeUserPresent;
    vm.makeUserAbsent = makeUserAbsent;
    vm.getUserOdds = getUserOdds;
    vm.selectMovie = selectMovie;

    function userHasMovies(user) {
      var movies = _.find(userMovies, { $id: user.$id });
      return movies && _.keys(movies).length > 0;
    }

    function anyUserHasMovies() {
      return _.some(vm.allUsers, function(user) {
        return userIsPresent(user) && userHasMovies(user);
      });
    }

    function userIsPresent(user) {
      return user.$id in presentUsers;
    }

    function makeUserPresent(user) {
      presentUsers[user.$id] = true;
      if (userHasMovies(user)) {
        userCredits[user.$id] = movieSelector.calculateUserAttendanceCredit(
          meetings,
          user.$id
        );
        totalCredits += userCredits[user.$id];
      }
    }

    function makeUserAbsent(user) {
      delete presentUsers[user.$id];
      if (userCredits[user.$id]) {
        totalCredits -= userCredits[user.$id];
        delete userCredits[user.$id];
      }
    }

    function getUserOdds(user) {
      if (user.$id in userCredits) {
        return totalCredits === 0
          ? 100 * 1 / _.keys(userCredits).length
          : 100 * userCredits[user.$id] / totalCredits;
      } else {
        return 0;
      }
    }

    function selectWinner() {
      var n = 0;
      var ranges = _.reduce(
        vm.allUsers,
        function(ranges, user) {
          var odds = getUserOdds(user);
          if (odds !== 0) {
            ranges = ranges.concat({ min: n, max: n + odds, userId: user.$id });
            n += odds;
          }
          return ranges;
        },
        []
      );
      n = _.random(0, 100, true);
      return _.find(ranges, function(range) {
        return range.min <= n && n < range.max;
      }).userId;
    }

    function selectMovie() {
      var userId = selectWinner();
      var movies = userMovies.$getRecord(userId).movies;
      var pick = _(movies).sortBy("order").first();

      currentMovie.name = pick.name;
      currentMovie.trailerUrl = pick.trailerUrl || null;
      currentMovie.$save();
      currentMovieUser.userId = userId;
      currentMovieUser.$save();

      movieQueueFactory.getForUserId(userId).$loaded().then(function(movies) {
        var movie = _.find(movies, { order: pick.order });
        return movies.removeMovie(movie);
      });

      saveMeeting();
      $state.go("dashboard");
    }

    function saveMeeting() {
      function formatDate(date) {
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();

        month = ("0" + month).slice(-2);
        day = ("0" + day).slice(-2);

        return year + "-" + month + "-" + day;
      }

      meetings.$add({
        date: formatDate(new Date()),
        presentUsers: presentUsers,
        selectedMovieName: currentMovie.name,
        selectedMovieUserId: currentMovieUser.userId
      });
    }
  }
})(window.angular);
