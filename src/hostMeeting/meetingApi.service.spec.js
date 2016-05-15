(function (angular) {
    'use strict';

    describe('meetingApi', function () {

        var $firebaseArrayMock;
        var firebaseArrayResult;
        var $firebaseObjectMock;
        var firebaseObjectResult;
        var firebaseRef;
        var meetingApi;

        beforeEach(module('movieClub'));

        beforeEach(function () {
            firebaseArrayResult = {'$loaded': angular.noop};
            $firebaseArrayMock = jasmine.createSpy('$firebaseArray');
            $firebaseArrayMock.and.returnValue(firebaseArrayResult);

            firebaseObjectResult = {'$loaded': angular.noop};
            $firebaseObjectMock = jasmine.createSpy('$firebaseObjectMock');
            $firebaseObjectMock.and.returnValue(firebaseObjectResult);

            module(function ($provide) {
                $provide.value('$firebaseArray', $firebaseArrayMock);
                $provide.value('$firebaseObject', $firebaseObjectMock);
            });
        });

        beforeEach(inject(function (_firebaseRef_, _meetingApi_) {
            firebaseRef = _firebaseRef_;
            meetingApi = _meetingApi_;
        }));

        describe('getAll', function () {

            it('should get a firebase meetings array', function () {
                spyOn(firebaseRef, 'child');
                meetingApi.getAll();

                expect(firebaseRef.child).toHaveBeenCalledWith('meetings');
            });

        });
    });

    function formatDate(date) {
        return date.getFullYear() + '-' +
               (date.getMonth() + 1) + '-' +
               date.getDate();
    }
}(window.angular));
