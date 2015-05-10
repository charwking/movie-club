(function (angular) {
    'use strict';

    angular
        .module('movieClub', [
            'movieClub.auth',
            'movieClub.clubs',
            'movieClub.nav',
            'movieClub.users'
        ]);

}(window.angular));
