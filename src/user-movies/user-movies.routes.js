(function (angular) {
    'use strict';

    angular
        .module('movieClub.userMovies')
        .run(appRun);

    function appRun(routerHelper) {
        routerHelper.configureStates([
            {
                state: 'user-movies',
                config: {
                    url: '/my-movies',
                    templateUrl: 'user-movies/user-movies.html'
                }
            }
        ]);
    }

}(window.angular));
