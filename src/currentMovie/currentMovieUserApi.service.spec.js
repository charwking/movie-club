(function (angular) {
    'use strict';

    describe('currentMovieUserApi', function () {

        var $firebaseObjectMock;
        var firebaseObjectResult;
        var firebaseRef;
        var currentMovieUserApi;

        beforeEach(module('movieClub'));

        beforeEach(function () {
            firebaseObjectResult = {'$loaded': angular.noop};
            $firebaseObjectMock = jasmine.createSpy('$firebaseObject');
            $firebaseObjectMock.and.returnValue(firebaseObjectResult);

            module(function ($provide) {
                $provide.value('$firebaseObject', $firebaseObjectMock);
            });
        });

        beforeEach(inject(function (_firebaseRef_, _currentMovieUserApi_) {
            firebaseRef = _firebaseRef_;
            currentMovieUserApi = _currentMovieUserApi_;
        }));

        describe('get', function () {

            it('should get a firebase currentMovieUser object', function () {
                spyOn(firebaseRef, 'child');
                currentMovieUserApi.get();

                expect(firebaseRef.child).toHaveBeenCalledWith('currentMovieUser');
            });

        });

    });
}(window.angular));
