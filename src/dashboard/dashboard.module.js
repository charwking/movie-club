(function (angular) {
    'use strict';

    angular
        .module('movieClub.dashboard', [
            'movieClub.core',
            'movieClub.properties',
            'movieClub.users',
            'firebase'
        ]);

}(window.angular));
