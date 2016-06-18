(function (angular) {
    'use strict';

    angular
        .module('movieClub')
        .config(configureFirebaseAuthService);

    function configureFirebaseAuthService($provide) {
        $provide.decorator('$firebaseAuthService', decorateFirebaseAuthService);
    }

    function decorateFirebaseAuthService($delegate, $q, firebaseUtils) {

        $delegate.requireSignInAsAdmin = requireSignInAsAdmin;
        return $delegate;

        function requireSignInAsAdmin() {
            return $q.all([
                    $delegate.$requireSignIn(),
                    firebaseUtils.promiseObject('adminStore')
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
}(window.angular));

