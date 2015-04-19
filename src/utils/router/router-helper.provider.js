(function (angular) {
    'use strict';

angular
    .module('utils.router')
    .provider('routerHelper', routerHelperProvider);

function routerHelperProvider($stateProvider, $urlRouterProvider) {

    // jshint validthis:true
    this.$get = RouterHelper;

    function RouterHelper($state) {

        var service = {
            configureStates: configureStates,
            getStates: getStates
        };
        return service;

        function configureStates(states) {
            states.forEach(function (state) {
                $stateProvider.state(state.state, state.config);
            });
        }

        function getStates() {
            return $state.get();
        }
    }
}

}(window.angular));
