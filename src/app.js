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
        .config(appConfig)
        .run(appRun);

    function appConfig($urlRouterProvider, AnalyticsProvider) {

        // default route
        $urlRouterProvider.when('', '/');

        // setup analytics
        AnalyticsProvider.setAccount('UA-52798669-1');
        AnalyticsProvider.trackPages(true);
        AnalyticsProvider.trackUrlParams(true);
        AnalyticsProvider.trackPrefix('movie-club');
    }

    function appRun(Analytics) {
        // Analytics injected to enable automatic page tracking
    }

}(window.angular));
