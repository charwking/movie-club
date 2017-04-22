(function() {
  "use strict";
  angular.module("movieClub").config(appConfig);

  function appConfig($stateProvider) {
    $stateProvider.state("dashboard", {
      controller: "DashboardController as dashboardVm",
      templateUrl: "dashboard/dashboard.html",
      url: "/"
    });
  }
})();
