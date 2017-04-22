(function() {
  "use strict";
  angular.module("movieClub").component("mcNav", {
    templateUrl: "nav/nav.html",
    controller: NavController
  });

  /* @ngInject */
  function NavController(authState) {
    var vm = this;
    vm.isAdmin = authState.isAdmin;
    vm.isLoggedIn = authState.isLoggedIn;
  }
})();
