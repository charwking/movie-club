(function (angular) {
    'use strict';

    var subject;

    beforeEach(module('movieClub.comingSoon'));
    beforeEach(inject(function ($controller) {
        subject = $controller('ComingSoonController');
    }));

    describe('ComingSoonController', function () {

        it('should expose a message', function () {
            expect(subject.message).toEqual('Coming Soon Dude!');
        });
    });

}(window.angular));
