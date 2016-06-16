(function (angular) {
    'use strict';

    var moduleDependencies = [
        'angular-google-analytics',
        'firebase',
        'templates-main',
        'ui.router'
    ];

    angular
        .module('movieClub', moduleDependencies)
        .config(setDefaultRoute)
        .config(configureAnalytics)
        .config(whitelistTemplateSources)
        .config(configureFirebase)
        .run(injectAnalytics)
        .run(handleAuthStates);

    function setDefaultRoute($urlRouterProvider) {
        $urlRouterProvider.when('', '/');
    }

    function configureAnalytics(AnalyticsProvider) {
        AnalyticsProvider.setAccount('UA-52798669-1');
        AnalyticsProvider.trackPages(true);
        AnalyticsProvider.trackUrlParams(true);
        AnalyticsProvider.trackPrefix('movie-club');
    }

    function whitelistTemplateSources($sceDelegateProvider) {
        $sceDelegateProvider.resourceUrlWhitelist([
            'self',
            '*://www.youtube.com/**'
        ]);
    }

    function configureFirebase($firebaseRefProvider) {
        var location = window.location.href;
        var url = 'https://movie-club.firebaseio.com/';

        if (location.match(/^http(s)?:\/\/localhost/) ||
            location.match(/^http(s)?:\/\/dev\./)) {
            url = 'https://glowing-inferno-1828.firebaseio.com/';
        }

        $firebaseRefProvider.registerUrl(url);
    }

    function injectAnalytics(Analytics) {
        // Analytics injected to enable automatic page tracking
    }

    function handleAuthStates($rootScope, $state, authApi) {
        $rootScope.$on('$stateChangeError',
            function (event, toState, toParams, fromState, fromParams, error) {
                if (error === 'AUTH_REQUIRED') {
                    $state.go('login');
                }
            }
        );
    }

}(window.angular));
