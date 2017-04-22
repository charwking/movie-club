(function(angular) {
  "use strict";
  angular
    .module("movieClub")
    .controller("RegisterController", RegisterController);

  function RegisterController($state, authApi, users) {
    var vm = this;

    // vars
    vm.isSubmitting = false;
    vm.hasRegistrationFailed = false;
    vm.usernames = _.map(users, "username");

    // funcs
    vm.register = register;

    function register() {
      if (!vm.registrationForm.$valid) {
        return;
      }

      vm.isSubmitting = true;
      vm.hasRegistrationFailed = false;

      authApi
        .register(vm.username, vm.email, vm.password)
        .then(function() {
          $state.go("dashboard");
        })
        .catch(function() {
          vm.password = "";
          vm.hasRegistrationFailed = true;
        })
        .finally(function() {
          vm.isSubmitting = false;
        });
    }
  }
})(window.angular);
