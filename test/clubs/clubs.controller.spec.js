(function () {
    'use strict';

    describe('ClubsController', function () {

        var subject,
            clubs = 'available clubs';

        beforeEach(module('movieClub.clubs'));
        beforeEach(inject(function ($controller, clubsApi) {

            spyOn(clubsApi, 'getClubs');
            clubsApi.getClubs.and.returnValue(clubs);

            subject = $controller('ClubsController', clubsApi);
        }));

        it('should expose the result of the clubsApi call as clubs', function () {
            expect(subject.clubs).toBe(clubs);
        });
    });

}());
