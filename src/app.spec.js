(function (angular) {
    'use strict';

    describe('app', function () {

        describe('$urlRouterProvider', function () {

            var $urlRouterProvider;

            beforeEach(function () {
                module('ui.router', function (_$urlRouterProvider_) {
                    $urlRouterProvider = _$urlRouterProvider_;
                    spyOn($urlRouterProvider, 'when').and.callThrough();
                });
                module('movieClub');
            });

            beforeEach(inject);

            it('should be configured to use the default route when there is none', function () {
                expect($urlRouterProvider.when).toHaveBeenCalledWith('', '/');
            });
        });

        describe('AnalyticsProvider', function () {

            var analyticsProvider;

            beforeEach(function () {
                module('angular-google-analytics', function (_AnalyticsProvider_) {
                    analyticsProvider = _AnalyticsProvider_;
                    spyOn(analyticsProvider, 'setAccount').and.callThrough();
                    spyOn(analyticsProvider, 'trackPages').and.callThrough();
                    spyOn(analyticsProvider, 'trackUrlParams').and.callThrough();
                    spyOn(analyticsProvider, 'trackPrefix').and.callThrough();
                });
                module('movieClub');
            });

            beforeEach(inject);

            it('should be configured with the correct analytics account', function () {
                expect(analyticsProvider.setAccount).toHaveBeenCalledWith('UA-52798669-1');
            });

            it('should be configured to track pages', function () {
                expect(analyticsProvider.trackPages).toHaveBeenCalledWith(true);
            });

            it('should be configured to track url params', function () {
                expect(analyticsProvider.trackUrlParams).toHaveBeenCalledWith(true);
            });

            it('should be configured to use the movie-club prefix', function () {
                expect(analyticsProvider.trackPrefix).toHaveBeenCalledWith('movie-club');
            });
        });

        describe('$sceDelegateProvider', function () {

            var $sceDelegateProvider;

            beforeEach(function () {
                module('ng', function (_$sceDelegateProvider_) {
                    $sceDelegateProvider = _$sceDelegateProvider_;
                    spyOn($sceDelegateProvider, 'resourceUrlWhitelist').and.callThrough();
                });
                module('movieClub');
            });

            beforeEach(inject);

            it('should be configured to whitelist calls from the current domain', function () {
                var lastCall = $sceDelegateProvider.resourceUrlWhitelist.calls.mostRecent();
                expect(lastCall.args[0]).toContain('self');
            });

            it('should be configured to whitelist youtube URLs', function () {
                var lastCall = $sceDelegateProvider.resourceUrlWhitelist.calls.mostRecent();
                expect(lastCall.args[0]).toContain('*://www.youtube.com/**');
            });
        });
    });

}(window.angular));
