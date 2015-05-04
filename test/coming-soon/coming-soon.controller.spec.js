(function (angular) {
    'use strict';

    describe('ComingSoonController', function () {

        var subject;

        beforeEach(module('movieClub.comingSoon'));
        beforeEach(inject(function ($controller) {
            subject = $controller('ComingSoonController');
        }));

        it('should expose a message', function () {
            expect(subject.message).toEqual('Coming Soon Dude!');
        });
    });

}(window.angular));
