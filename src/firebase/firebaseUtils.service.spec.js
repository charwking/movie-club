(function (angular) {
    'use strict';

    describe('firebaseUtils', function () {

        var $firebaseArrayMock;
        var $firebaseObjectMock;
        var firebasePromiseMock;
        var firebaseRef;
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

            inject(function (firebaseUtils, _firebaseRef_) {
                subject = firebaseUtils;
                firebaseRef = _firebaseRef_;
                spyOn(firebaseRef, 'child');
            });
        });

        describe('promiseArray', function () {

            it('gets a promise from a $firebaseArray for a string input', function () {
                firebaseRef.child.and.returnValue('childRef');
                $firebaseArrayMock.and.returnValue(firebasePromiseMock);
                firebasePromiseMock.$loaded.and.returnValue('promise');

                var result = subject.promiseArray('child');

                expect(firebaseRef.child).toHaveBeenCalledWith('child');
                expect($firebaseArrayMock).toHaveBeenCalledWith('childRef');
                expect(firebasePromiseMock.$loaded).toHaveBeenCalled();
                expect(result).toEqual('promise');
            });

            it('gets a promise from a $firebaseArray for an array input', function () {
                var childRef1 = {'child': jasmine.createSpy('childRef1')};
                var childRef2 = {'child': jasmine.createSpy('childRef2')};
                firebaseRef.child.and.returnValue(childRef1);
                childRef1.child.and.returnValue(childRef2);
                childRef2.child.and.returnValue('child4');
                $firebaseArrayMock.and.returnValue(firebasePromiseMock);
                firebasePromiseMock.$loaded.and.returnValue('promise');

                var result = subject.promiseArray(['child1', 'child2', 'child3']);

                expect(firebaseRef.child).toHaveBeenCalledWith('child1');
                expect(childRef1.child).toHaveBeenCalledWith('child2');
                expect(childRef2.child).toHaveBeenCalledWith('child3');
                expect($firebaseArrayMock).toHaveBeenCalledWith('child4');
                expect(firebasePromiseMock.$loaded).toHaveBeenCalled();
                expect(result).toEqual('promise');
            });
        });

        describe('promiseObject', function () {

            it('gets a promise from a $firebaseObject for a string input', function () {
                firebaseRef.child.and.returnValue('childRef');
                $firebaseObjectMock.and.returnValue(firebasePromiseMock);
                firebasePromiseMock.$loaded.and.returnValue('promise');

                var result = subject.promiseObject('child');

                expect(firebaseRef.child).toHaveBeenCalledWith('child');
                expect($firebaseObjectMock).toHaveBeenCalledWith('childRef');
                expect(firebasePromiseMock.$loaded).toHaveBeenCalled();
                expect(result).toEqual('promise');
            });

            it('gets a promise from a $firebaseObject for an array input', function () {
                var childRef1 = {'child': jasmine.createSpy('childRef1')};
                var childRef2 = {'child': jasmine.createSpy('childRef2')};
                firebaseRef.child.and.returnValue(childRef1);
                childRef1.child.and.returnValue(childRef2);
                childRef2.child.and.returnValue('child4');
                $firebaseObjectMock.and.returnValue(firebasePromiseMock);
                firebasePromiseMock.$loaded.and.returnValue('promise');

                var result = subject.promiseObject(['child1', 'child2', 'child3']);

                expect(firebaseRef.child).toHaveBeenCalledWith('child1');
                expect(childRef1.child).toHaveBeenCalledWith('child2');
                expect(childRef2.child).toHaveBeenCalledWith('child3');
                expect($firebaseObjectMock).toHaveBeenCalledWith('child4');
                expect(firebasePromiseMock.$loaded).toHaveBeenCalled();
                expect(result).toEqual('promise');
            });
        });
    });

}(window.angular));

