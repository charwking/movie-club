(function (angular) {
    'use strict';

    describe('propertiesApi', function () {

        var $firebaseObjectMock;
        var firebaseObjectResult;
        var firebaseRef;
        var propertiesApi;

        beforeEach(module('movieClub'));

        beforeEach(function () {
            firebaseObjectResult = {'$loaded': angular.noop};
            $firebaseObjectMock = jasmine.createSpy('$firebaseObjectMock');
            $firebaseObjectMock.and.returnValue(firebaseObjectResult);

            module(function ($provide) {
                $provide.value('$firebaseObject', $firebaseObjectMock);
            });
        });

        beforeEach(inject(function (_firebaseRef_, _propertiesApi_) {
            firebaseRef = _firebaseRef_;
            propertiesApi = _propertiesApi_;
        }));

        describe('promiseProperties', function () {

            it('should get a firebase reference to the propertyStore', function () {
                spyOn(firebaseRef, 'child');
                propertiesApi.get();

                expect(firebaseRef.child).toHaveBeenCalledWith('propertyStore');
            });

            it('should create a firebase object with the reference to the propertyStore', function () {
                spyOn(firebaseRef, 'child').and.returnValue('propertyStoreRef');
                propertiesApi.get();

                expect($firebaseObjectMock).toHaveBeenCalledWith('propertyStoreRef');
            });

            it('should return the promise from the firebase object', function () {
                spyOn(firebaseObjectResult, '$loaded').and.returnValue('promise');

                expect(propertiesApi.get()).toEqual('promise');
            });
        });
    });
}(window.angular));
