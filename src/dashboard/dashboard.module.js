(function (angular) {
    'use strict';

    angular
        .module('movieClub.dashboard', [
            'movieClub.core',
            'movieClub.propertyStore',
            'movieClub.users',
            'firebase'
        ]);

}(window.angular));
