(function () {
    'use strict';

    describe('environmentService', function () {

        var $location;
        var environmentService;

        beforeEach(module('movieClub'));
        beforeEach(inject(function (_$location_, _environmentService_) {
            $location = _$location_;
            environmentService = _environmentService_;
        }));

        describe('constants', function () {

            it('should expose environment constants with unique values', function () {
                expect(environmentService.LOCAL).not.toEqual(environmentService.DEV);
                expect(environmentService.LOCAL).not.toEqual(environmentService.PROD);
                expect(environmentService.DEV).not.toEqual(environmentService.PROD);
            });
        });

        describe('get', function () {

            it('should return LOCAL when host is localhost', function () {
                spyOn($location, 'host').and.returnValue('localhost');

                expect(environmentService.get()).toBe(environmentService.LOCAL);
            });

            it('should return DEV when host has dev subdomain', function () {
                spyOn($location, 'host').and.returnValue('dev.github.com');

                expect(environmentService.get()).toBe(environmentService.DEV);
            });

            it('should return PROD when host is neither localhost nor has dev subdomain', function () {
                spyOn($location, 'host').and.returnValue('github.com');

                expect(environmentService.get()).toBe(environmentService.PROD);
            });
        });
    });
}());
