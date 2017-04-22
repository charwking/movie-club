(function() {
  "use strict";
  angular.module("movieClub").factory("movieQueueFactory", movieQueueFactory);

  /* @ngInject */
  function movieQueueFactory(
    $firebaseArray,
    $firebaseAuthService,
    firebaseRefFactory
  ) {
    return {
      getForCurrentUser: getForCurrentUser,
      getForUserId: getForUserId
    };

    function getForCurrentUser() {
      var uid = $firebaseAuthService.$getAuth().uid;
      return getForUserId(uid);
    }

    function getForUserId(uid) {
      var ref = firebaseRefFactory.getRef(["userMovies", uid, "movies"]);
      return $firebaseArray(ref);
    }
  }
})();
