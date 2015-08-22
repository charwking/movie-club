(function (angular) {
    'use strict';

    describe('DashboardController', function () {

        var subject;

        beforeEach(function () {
            module('movieClub');
            inject(function ($controller) {
                subject = $controller('DashboardController', {
                    currentMovie: 'current movie value',
                    properties: [{id: 'clubDesc'}, {id: 'clubName'}, {id: 'clubOwner'}],
                    users: [{username: 'Tom'}, {username: 'Dick'}, {username: 'Harry'}]
                });
            });
        });

        describe('after initialization', function () {

            it('should expose the currentMovie', function () {
                expect(subject.currentMovie).toEqual('current movie value');
            });

            it('should expose the clubName property', function () {
                expect(subject.clubNameProp).toEqual({id: 'clubName'});
            });

            it('should expose the usernames', function () {
                expect(subject.usernames).toEqual(['Tom', 'Dick', 'Harry']);
            });
        });
    });

}(window.angular));
