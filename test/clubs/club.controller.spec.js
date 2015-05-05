(function () {
    'use strict';

    describe('ClubController', function () {

        var subject,
            club = 'club',
            clubId = 'clubId',
            firebaseApi;

        beforeEach(module('movieClub.clubs'));
        beforeEach(inject(function ($controller, $stateParams, _firebaseApi_) {

            firebaseApi = _firebaseApi_;

            spyOn(firebaseApi, 'getClubById');
            firebaseApi.getClubById.and.returnValue(club);

            $stateParams.clubId = clubId;

            subject = $controller('ClubController', {
                $stateParams: $stateParams,
                firebaseApi: firebaseApi
            });
        }));

        it('should pass the clubId to the firebaseApi', function () {
            expect(firebaseApi.getClubById).toHaveBeenCalledWith(clubId);
        });

        it('should expose the result of the firebaseApi call as club', function () {
            expect(subject.club).toBe(club);
        });
    });
}());
