(function (angular) {
    'use strict';

    describe('usersApi', function () {

        var $firebaseArrayMock;
        var firebaseArrayResult;
        var $firebaseObjectMock;
        var firebaseObjectResult;
        var firebaseRef;
        var usersApi;

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

        beforeEach(inject(function (_firebaseRef_, _usersApi_) {
            firebaseRef = _firebaseRef_;
            usersApi = _usersApi_;
        }));

        describe('getAll', function () {

            it('should get a firebase Users array', function () {
                spyOn(firebaseRef, 'child');
                usersApi.getAll();

                expect(firebaseRef.child).toHaveBeenCalledWith('users');
            });

        });

        describe('getById', function () {

            it('should get a firebase User object', function () {
                var user = {
                    id: 1,
                    username: 'Brandon'
                };
                var firebaseRefChildResponse = {
                    child: function() {
                        return user;
                    }
                };
                spyOn(firebaseRef, 'child').and.returnValue(firebaseRefChildResponse);
                spyOn(firebaseRef.child('user'), 'child');
                usersApi.getById(user.id);

                expect(firebaseRef.child('user').child).toHaveBeenCalledWith(user.id);
            });

        });
    });
}(window.angular));
