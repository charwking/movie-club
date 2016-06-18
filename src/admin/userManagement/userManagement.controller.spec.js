(function (angular) {
    'use strict';

    describe('UserManagementController', function () {

        var subject;

        beforeEach(function () {
            module('movieClub');
            inject(function ($controller) {
                subject = $controller('UserManagementController', {
                    users: 'users value'
                });
            });
        });

        describe('after initialization', function () {

            it('should expose the users', function () {
                expect(subject.users).toEqual('users value');
            });
        });
    });

}(window.angular));

