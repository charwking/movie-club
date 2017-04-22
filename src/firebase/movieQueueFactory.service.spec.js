(function() {
  "use strict";
  describe("movieQueueFactory", function() {
    var $firebaseArrayMock;
    var $firebaseAuthService;
    var firebaseRefFactory;
    var subject;

    beforeEach(function() {
      $firebaseArrayMock = jasmine.createSpy("$firebaseArrayMock");

      module("movieClub");
      module(function($provide) {
        $provide.value("$firebaseArray", $firebaseArrayMock);
      });

      inject(function(
        _$firebaseAuthService_,
        _firebaseRefFactory_,
        movieQueueFactory
      ) {
        $firebaseAuthService = _$firebaseAuthService_;
        spyOn($firebaseAuthService, "$getAuth");

        firebaseRefFactory = _firebaseRefFactory_;
        spyOn(firebaseRefFactory, "getRef");

        subject = movieQueueFactory;
      });
    });

    describe("getForUserId", function() {
      it("returns a firebase array for the movies of the user specified", function() {
        // given
        firebaseRefFactory.getRef.and.returnValue("fake reference");
        $firebaseArrayMock.and.returnValue("fake firebase array");

        // when
        var result = subject.getForUserId("fake user id");

        // then
        expect(firebaseRefFactory.getRef).toHaveBeenCalledWith([
          "userMovies",
          "fake user id",
          "movies"
        ]);
        expect($firebaseArrayMock).toHaveBeenCalledWith("fake reference");
        expect(result).toEqual("fake firebase array");
      });
    });

    describe("getForCurrentUser", function() {
      it("returns a firebase array for the movies for the current user", function() {
        // given
        $firebaseAuthService.$getAuth.and.returnValue({ uid: "fake uid" });
        firebaseRefFactory.getRef.and.returnValue("fake reference");
        $firebaseArrayMock.and.returnValue("fake firebase array");

        // when
        var result = subject.getForCurrentUser();

        // then
        expect($firebaseAuthService.$getAuth).toHaveBeenCalled();
        expect(firebaseRefFactory.getRef).toHaveBeenCalledWith([
          "userMovies",
          "fake uid",
          "movies"
        ]);
        expect($firebaseArrayMock).toHaveBeenCalledWith("fake reference");
        expect(result).toEqual("fake firebase array");
      });
    });
  });
})();
