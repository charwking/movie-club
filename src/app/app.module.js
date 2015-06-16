(function (angular) {
    'use strict';

    angular
        .module('movieClub', [
            'movieClub.auth',
            'movieClub.dashboard',
            'movieClub.nav',
            'movieClub.users',
            'movieClub.userMovies'
        ]);

}(window.angular));
