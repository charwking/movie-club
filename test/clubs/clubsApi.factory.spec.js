(function () {
    'use strict';

    describe('clubsApi', function () {

        var subject,
            firebaseArrayMock,
            firebaseReferenceMock;

        beforeEach(module('movieClub.clubs', function ($provide) {

            firebaseArrayMock = jasmine.createSpy('firebaseArrayMock');
            $provide.value('$firebaseArray', firebaseArrayMock);

            firebaseReferenceMock = jasmine.createSpyObj('firebaseReference', ['child']);
            $provide.value('firebaseReference', firebaseReferenceMock);
        }));

        beforeEach(inject(function (clubsApi) {
            subject = clubsApi;
        }));

        describe('getClubs', function () {

            it('should get a firebase reference for clubs', function () {
                subject.getClubs();
                expect(firebaseReferenceMock.child).toHaveBeenCalledWith('clubs');
            });

            it('should create a firebase array from the firebase clubs reference', function () {
                var clubsRef = 'clubs reference value';
                firebaseReferenceMock.child.and.returnValue(clubsRef);

                subject.getClubs();

                expect(firebaseArrayMock).toHaveBeenCalledWith(clubsRef);
            });

            it('should return the firebase array', function () {
                var clubsArray = 'clubs array value';
                firebaseArrayMock.and.returnValue(clubsArray);

                expect(subject.getClubs()).toBe(clubsArray);
            });
        });
    });
}());
