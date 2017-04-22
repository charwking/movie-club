(function(angular) {
  "use strict";
  angular.module("movieClub").controller("LoginController", LoginController);

  function LoginController($state, authApi) {
    var vm = this;

    // vars
    vm.isSubmitting = false;
    vm.hasLoginFailed = false;

    // funcs
    vm.login = login;

    function login() {
      if (!vm.loginForm.$valid) {
        return;
      }

      vm.isSubmitting = true;
      vm.hasLoginFailed = false;

      authApi
        .login(vm.email, vm.password)
        .then(function() {
          $state.go("dashboard");
        })
        .catch(function() {
          vm.password = "";
          vm.isSubmitting = false;
          vm.hasLoginFailed = true;
        });
    }
  }
})(window.angular);
