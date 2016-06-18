(function (angular, firebase) {
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
        var isDev =
            location.match(/^http(s)?:\/\/localhost/) ||
            location.match(/^http(s)?:\/\/dev\./);
        var config = isDev ? getDevFirebaseConfig() : getProdFirebaseConfig();

        // HACK -- Calling initializeApp twice for the same app results in an exception,
        // and this happens during testing since the firebase library isn't completely
        // reloaded for each test. To circumvent that, we're only initalizing the app
        // if one doesn't exist -- which we know because app throws an error when no app
        // exists.
        try {
            firebase.app();
        } catch (e) {
            firebase.initializeApp(config);
        }
        $firebaseRefProvider.registerUrl(config.databaseURL);
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

    function getDevFirebaseConfig() {
        return {
            apiKey: 'AIzaSyB12FILGlMqlxgvLtZ29VaP0x5WEOLZT8M',
            authDomain: 'glowing-inferno-1828.firebaseapp.com',
            databaseURL: 'https://glowing-inferno-1828.firebaseio.com',
            storageBucket: 'glowing-inferno-1828.appspot.com'
        };
    }

    function getProdFirebaseConfig() {
        return {
            apiKey: 'AIzaSyAKfG5L2MyJ_iJu_DN7WQL30M6v7Or6-2E',
            authDomain: 'movie-club.firebaseapp.com',
            databaseURL: 'https://movie-club.firebaseio.com',
            storageBucket: ''
        };
    }

}(window.angular, window.firebase));

