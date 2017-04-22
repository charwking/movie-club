(function () {
    'use strict';

    describe('userFactory', function () {

        var $firebaseAuthService;
        var $firebaseObjectMock;
        var firebaseRefFactory;
        var subject;

        beforeEach(function () {

            $firebaseObjectMock = jasmine.createSpy('$firebaseObjectMock');

            module('movieClub');
            module(function ($provide) {
                $provide.value('$firebaseObject', $firebaseObjectMock);
            });

            inject(function (_$firebaseAuthService_, _firebaseRefFactory_, userFactory) {
                $firebaseAuthService = _$firebaseAuthService_;
                spyOn($firebaseAuthService, '$getAuth');

                firebaseRefFactory = _firebaseRefFactory_;
                spyOn(firebaseRefFactory, 'getRef');

                subject = userFactory;
            });
        });

        describe('get', function () {

            it('returns a firebase object for the current user', function () {

                // given
                $firebaseAuthService.$getAuth.and.returnValue({uid: 'fake uid'});
                firebaseRefFactory.getRef.and.returnValue('fake reference');
                $firebaseObjectMock.and.returnValue('fake firebase object');

                // when
                var result = subject.get();

                // then
                expect($firebaseAuthService.$getAuth).toHaveBeenCalled();
                expect(firebaseRefFactory.getRef).toHaveBeenCalledWith(['users', 'fake uid']);
                expect($firebaseObjectMock).toHaveBeenCalledWith('fake reference');
                expect(result).toEqual('fake firebase object');
            });
        });
    });
}());
