(function (angular) {
    'use strict';

    angular
        .module('movieClub.core', [
            'angular-google-analytics',
            'firebase',
            'movieClub.firebase',
            'templates-main',
            'utils.router',
            'ui.router'
        ]);

}(window.angular));
