(function (angular) {
    'use strict';

    describe('currentMovieApi', function () {

        var $firebaseObjectMock;
        var firebaseObjectResult;
        var firebaseRef;
        var currentMovieApi;

        beforeEach(module('movieClub'));

        beforeEach(function () {
            firebaseObjectResult = {'$loaded': angular.noop};
            $firebaseObjectMock = jasmine.createSpy('$firebaseObject');
            $firebaseObjectMock.and.returnValue(firebaseObjectResult);

            module(function ($provide) {
                $provide.value('$firebaseObject', $firebaseObjectMock);
            });
        });

        beforeEach(inject(function (_firebaseRef_, _currentMovieApi_) {
            firebaseRef = _firebaseRef_;
            currentMovieApi = _currentMovieApi_;
        }));

        describe('get', function () {

            it('should get a firebase currentMovie object', function () {
                spyOn(firebaseRef, 'child');
                currentMovieApi.get();

                expect(firebaseRef.child).toHaveBeenCalledWith('currentMovie');
            });

        });

    });
}(window.angular));
