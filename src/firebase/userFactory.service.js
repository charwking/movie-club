(function() {
  "use strict";
  angular.module("movieClub").factory("userFactory", userFactory);

  /* @ngInject */
  function userFactory(
    $firebaseAuthService,
    $firebaseObject,
    firebaseRefFactory
  ) {
    return {
      get: function() {
        var uid = $firebaseAuthService.$getAuth().uid;
        var ref = firebaseRefFactory.getRef(["users", uid]);
        return $firebaseObject(ref);
      }
    };
  }
})();
