(function () {
    'use strict';

    describe('authState', function () {

        var adminStoreMock;
        var authStateChangedCallback;
        var subject;

        beforeEach(function () {

            adminStoreMock = {};

            module('movieClub');
            module(function ($provide) {
                $provide.value('adminStore', adminStoreMock);
            });

            inject(function ($firebaseAuthService) {
                spyOn($firebaseAuthService, '$onAuthStateChanged').and.callFake(function (cb) {
                    authStateChangedCallback = cb;
                });
            });

            inject(function (authState, _$firebaseAuthService_) {
                subject = authState;
            });
        });

        describe('isLoggedIn', function () {

            it('returns false before the auth state has changed', function () {
                expect(subject.isLoggedIn()).toBeFalsy();
            });

            it('returns false if the user is present without an id', function () {
                authStateChangedCallback({});
                expect(subject.isLoggedIn()).toBeFalsy();
            });

            it('returns false if the user is present with a null id', function () {
                authStateChangedCallback({uid: null});
                expect(subject.isLoggedIn()).toBeFalsy();
            });

            it('returns true if the user is present with an id', function () {
                authStateChangedCallback({uid: 123});
                expect(subject.isLoggedIn()).toBeTruthy();
            });
        });

        describe('isAdmin', function () {

            it('returns false before the auth state has changed', function () {
                expect(subject.isAdmin()).toBeFalsy();
            });

            it('returns false if the user is present without an id', function () {
                authStateChangedCallback({});
                expect(subject.isAdmin()).toBeFalsy();
            });

            it('returns false if the user is present with a null id', function () {
                authStateChangedCallback({uid: null});
                expect(subject.isAdmin()).toBeFalsy();
            });

            it('returns false if the user is set but not present in the adminStore', function () {
                authStateChangedCallback({uid: 123});
                expect(subject.isAdmin()).toBeFalsy();
            });

            it('returns false if the user is set and is present in the adminStore with a false flag', function () {
                authStateChangedCallback({uid: 123});
                adminStoreMock[123] = false;
                expect(subject.isAdmin()).toBeFalsy();
            });

            it('returns true if the user is set and is present in the adminStore with a true flag', function () {
                authStateChangedCallback({uid: 123});
                adminStoreMock[123] = true;
                expect(subject.isAdmin()).toBeTruthy();
            });
        });
    });
}());
