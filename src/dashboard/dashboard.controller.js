(function(angular) {
  "use strict";
  angular
    .module("movieClub")
    .controller("DashboardController", DashboardController);

  function DashboardController(currentMovie, propertyStore, users) {
    var vm = this;
    vm.currentMovie = currentMovie;
    vm.propertyStore = propertyStore;
    vm.users = users;
  }
})(window.angular);
