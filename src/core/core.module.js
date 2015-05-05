(function (angular) {
    'use strict';

    angular
        .module('movieClub.core', [
            'angular-google-analytics',
            'movieClub.firebase',
            'templates-main',
            'utils.router',
            'ui.router'
        ]);

}(window.angular));
