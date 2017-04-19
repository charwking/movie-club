(function () {
    'use strict';

    angular
        .module('movieClub')
        .config(configureFirebaseAuthService);

    /* @ngInject */
    function configureFirebaseAuthService($provide) {
        $provide.decorator('$firebaseAuthService', decorateFirebaseAuthService);
    }

    /* @ngInject */
    function decorateFirebaseAuthService($delegate, $injector, $q) {

        $delegate.requireSignInAsAdmin = requireSignInAsAdmin;
        return $delegate;

        function requireSignInAsAdmin() {
            return $q.all([
                    $delegate.$requireSignIn(),
                    $injector.get('adminStore').$loaded()
                ])
                .then(assertUserIsAdmin);
        }

        function assertUserIsAdmin(vals) {
            var auth = vals[0];
            var adminStore = vals[1];

            if (!adminStore[auth.uid]) {
                throw 'AUTH_REQUIRED';
            }

            return auth;
        }
    }
}());
