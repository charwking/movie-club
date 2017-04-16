(function () {
    'use strict';

    describe('firebaseUtils', function () {

        var $firebaseArrayMock;
        var $firebaseObjectMock;
        var firebasePromiseMock;
        var firebaseRefFactory;
        var subject;

        beforeEach(function () {
            $firebaseArrayMock = jasmine.createSpy('$firebaseArray');
            $firebaseObjectMock = jasmine.createSpy('$firebaseObject');
            firebasePromiseMock = {'$loaded': jasmine.createSpy('$loadedMock')};

            module('movieClub');
            module(function ($provide) {
                $provide.value('$firebaseArray', $firebaseArrayMock);
                $provide.value('$firebaseObject', $firebaseObjectMock);
            });

            inject(function (firebaseUtils, _firebaseRefFactory_) {
                subject = firebaseUtils;
                firebaseRefFactory = _firebaseRefFactory_;
                spyOn(firebaseRefFactory, 'getRef');
            });
        });

        describe('promiseArray', function () {

            it('gets a promise from a $firebaseArray', function () {
                firebaseRefFactory.getRef.and.returnValue('firebase ref');
                $firebaseArrayMock.and.returnValue(firebasePromiseMock);
                firebasePromiseMock.$loaded.and.returnValue('promise');

                var result = subject.promiseArray('firebase path');

                expect(firebaseRefFactory.getRef).toHaveBeenCalledWith('firebase path');
                expect($firebaseArrayMock).toHaveBeenCalledWith('firebase ref');
                expect(firebasePromiseMock.$loaded).toHaveBeenCalled();
                expect(result).toEqual('promise');
            });
        });

        describe('promiseObject', function () {

            it('gets a promise from a $firebaseObject for a string input', function () {
                firebaseRefFactory.getRef.and.returnValue('firebase ref');
                $firebaseObjectMock.and.returnValue(firebasePromiseMock);
                firebasePromiseMock.$loaded.and.returnValue('promise');

                var result = subject.promiseObject('firebase path');

                expect(firebaseRefFactory.getRef).toHaveBeenCalledWith('firebase path');
                expect($firebaseObjectMock).toHaveBeenCalledWith('firebase ref');
                expect(firebasePromiseMock.$loaded).toHaveBeenCalled();
                expect(result).toEqual('promise');
            });
        });
    });
}());
