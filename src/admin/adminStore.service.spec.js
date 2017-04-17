(function () {
    'use strict';

    describe('adminStore', function () {

        var firebaseObjectMock;
        var firebaseUtils;
        var subject;

        beforeEach(function () {

            firebaseObjectMock = {value: 'adminStoreFromFirebase'};

            module('movieClub');

            inject(function (_firebaseUtils_) {
                firebaseUtils = _firebaseUtils_;
                spyOn(firebaseUtils, 'getObject').and.returnValue(firebaseObjectMock);
            });

            inject(function (adminStore) {
                subject = adminStore;
            });
        });

        it('is a firebase object at the adminStore path', function () {
            expect(firebaseUtils.getObject).toHaveBeenCalledWith('adminStore');
            expect(subject).toBe(firebaseObjectMock);
        });
    });
}());
