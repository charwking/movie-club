(function (angular) {
    'use strict';

    describe('adminStoreApi', function () {

        var $firebaseObjectMock;
        var firebaseObjectResult;
        var firebaseRef;
        var adminStoreApi;

        beforeEach(module('movieClub'));

        beforeEach(function () {
            firebaseObjectResult = {'$loaded': angular.noop};
            $firebaseObjectMock = jasmine.createSpy('$firebaseObject');
            $firebaseObjectMock.and.returnValue(firebaseObjectResult);

            module(function ($provide) {
                $provide.value('$firebaseObject', $firebaseObjectMock);
            });
        });

        beforeEach(inject(function (_firebaseRef_, _adminStoreApi_) {
            firebaseRef = _firebaseRef_;
            adminStoreApi = _adminStoreApi_;
        }));

        describe('get', function () {

            it('should get a firebase adminStore object', function () {
                spyOn(firebaseRef, 'child');
                adminStoreApi.get();

                expect(firebaseRef.child).toHaveBeenCalledWith('adminStore');
            });

        });

    });
}(window.angular));
