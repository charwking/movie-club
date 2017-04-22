(function(angular) {
  "use strict";
  angular.module("movieClub").controller("LogoutController", LogoutController);

  function LogoutController(authApi) {
    authApi.logout();
  }
})(window.angular);
