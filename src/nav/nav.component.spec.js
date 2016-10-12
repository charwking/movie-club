(function (angular) {
    'use strict';

    describe('navComponent', function () {

        var authApi;
        var subject;

        beforeEach(module('movieClub'));
        beforeEach(inject(function ($componentController, _authApi_) {
            authApi = _authApi_;
            subject = $componentController('mcNav', {
                authApi: authApi
            });
        }));

        it('exposes the authApi.isAdmin function', function () {
            expect(subject.isAdmin).toBe(authApi.isAdmin);
        });

        it('exposes the authApi.isLoggedIn function', function () {
            expect(subject.isLoggedIn).toBe(authApi.isLoggedIn);
        });
    });

}(window.angular));
