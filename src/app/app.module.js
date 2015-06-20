(function (angular) {
    'use strict';

    angular
        .module('movieClub', [
            'movieClub.auth',
            'movieClub.dashboard',
            'movieClub.nav',
            'movieClub.users',
            'movieClub.userManagement',
            'movieClub.userMovies'
        ]);

}(window.angular));
