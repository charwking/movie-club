(function() {
  "use strict";
  describe("firebaseRefFactory", function() {
    var $firebaseRef;
    var subject;

    beforeEach(function() {
      module("movieClub");
      inject(function(_$firebaseRef_, firebaseRefFactory) {
        subject = firebaseRefFactory;
        $firebaseRef = _$firebaseRef_;
        spyOn($firebaseRef.default, "child");
      });
    });

    describe("getRef", function() {
      it("gets a reference for a string input", function() {
        $firebaseRef.default.child.and.returnValue("child reference");

        var result = subject.getRef("string path");

        expect($firebaseRef.default.child).toHaveBeenCalledWith("string path");
        expect(result).toEqual("child reference");
      });

      it("gets a reference for an array input", function() {
        var childRef1 = { child: jasmine.createSpy("childRef1") };
        var childRef2 = { child: jasmine.createSpy("childRef2") };
        $firebaseRef.default.child.and.returnValue(childRef1);
        childRef1.child.and.returnValue(childRef2);
        childRef2.child.and.returnValue("child reference");

        var result = subject.getRef(["child1", "child2", "child3"]);

        expect($firebaseRef.default.child).toHaveBeenCalledWith("child1");
        expect(childRef1.child).toHaveBeenCalledWith("child2");
        expect(childRef2.child).toHaveBeenCalledWith("child3");
        expect(result).toEqual("child reference");
      });
    });
  });
})();
