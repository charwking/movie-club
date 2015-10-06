(function (angular) {
    'use strict';

    describe('userMoviesApi', function () {

        var $firebaseArrayMock;
        var firebaseArrayResult;
        var firebaseRef;
        var userMoviesApi;

        beforeEach(module('movieClub'));

        beforeEach(function () {
            firebaseArrayResult = {'$loaded': angular.noop};
            $firebaseArrayMock = jasmine.createSpy('$firebaseArray');
            $firebaseArrayMock.and.returnValue(firebaseArrayResult);

            module(function ($provide) {
                $provide.value('$firebaseArray', $firebaseArrayMock);
            });
        });

        beforeEach(inject(function (_firebaseRef_, _userMoviesApi_) {
            firebaseRef = _firebaseRef_;
            userMoviesApi = _userMoviesApi_;
        }));

        describe('getAll', function () {

            it('should get a firebase userMovies array', function () {
                spyOn(firebaseRef, 'child');
                userMoviesApi.getAll();

                expect(firebaseRef.child).toHaveBeenCalledWith('userMovies');
            });

        });

        describe('getById', function () {

            it('should get a firebase User object', function () {
                var user = {
                    id: 1,
                    username: 'Brandon'
                };
                var firebaseRefChildResponseChildResponse = {
                    child: function() {
                        return user;
                    }
                };
                var firebaseRefChildResponse = {
                    child: function() {
                        return firebaseRefChildResponseChildResponse;
                    }
                };
                spyOn(firebaseRef, 'child').and.returnValue(firebaseRefChildResponse);
                spyOn(firebaseRef.child('userMovies').child(user.id), 'child');
                userMoviesApi.getAllByUserId(user.id);

                expect(firebaseRef.child('userMovies').child(user.id).child).toHaveBeenCalledWith('movies');
            });

        });
    });
}(window.angular));
