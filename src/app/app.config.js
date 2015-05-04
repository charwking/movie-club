(function (angular) {

    angular
        .module('movieClub')
        .config(appConfig);

    function appConfig($urlRouterProvider, AnalyticsProvider) {

        // default route
        $urlRouterProvider.when('', '/clubs');

        // setup analytics
        AnalyticsProvider.setAccount('UA-52798669-1');
        AnalyticsProvider.trackPages(true);
        AnalyticsProvider.trackUrlParams(true);
        AnalyticsProvider.trackPrefix('movie-club');
    }

}(window.angular));
