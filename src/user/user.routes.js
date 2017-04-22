(function() {
  "use strict";
  angular.module("movieClub").config(appConfig);

  function appConfig($stateProvider) {
    $stateProvider.state("user", {
      abstract: true,
      template: "<ui-view/>",
      resolve: {
        currentAuth: function($firebaseAuthService) {
          return $firebaseAuthService.$requireSignIn();
        }
      }
    });
  }
})();
