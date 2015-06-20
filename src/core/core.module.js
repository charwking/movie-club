(function (angular) {
    'use strict';

    angular
        .module('movieClub.core', [
            'angular-google-analytics',
            'firebase',
            'movieClub.firebase',
            'templates-main',
            'ui.router'
        ]);

}(window.angular));
