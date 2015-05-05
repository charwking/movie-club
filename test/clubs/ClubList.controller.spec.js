(function () {
    'use strict';

    describe('ClubListController', function () {

        var subject,
            clubs = 'available clubs';

        beforeEach(module('movieClub.clubs'));
        beforeEach(inject(function ($controller, firebaseApi) {

            spyOn(firebaseApi, 'getClubs');
            firebaseApi.getClubs.and.returnValue(clubs);

            subject = $controller('ClubListController', firebaseApi);
        }));

        it('should expose the result of the firebaseApi call as clubs', function () {
            expect(subject.clubs).toBe(clubs);
        });
    });
}());
