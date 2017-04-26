(function() {
  "use strict";
  describe("movieQueueFactory", function() {
    var $firebaseAuthService;
    var firebaseRefFactory;
    var MovieQueueMock;
    var subject;

    beforeEach(function() {
      MovieQueueMock = jasmine.createSpy("MovieQueueMock");

      module("movieClub");
      module(function($provide) {
        $provide.value("MovieQueue", MovieQueueMock);
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
      it("returns a MovieQueue for the movies of the user specified", function() {
        // given
        firebaseRefFactory.getRef.and.returnValue("fake reference");
        MovieQueueMock.and.returnValue("fake movie queue instance");

        // when
        var result = subject.getForUserId("fake user id");

        // then
        expect(firebaseRefFactory.getRef).toHaveBeenCalledWith([
          "userMovies",
          "fake user id",
          "movies"
        ]);
        expect(MovieQueueMock).toHaveBeenCalledWith("fake reference");
        expect(result).toEqual("fake movie queue instance");
      });
    });

    describe("getForCurrentUser", function() {
      it("returns a MovieQueue for the movies for the current user", function() {
        // given
        $firebaseAuthService.$getAuth.and.returnValue({ uid: "fake uid" });
        firebaseRefFactory.getRef.and.returnValue("fake reference");
        MovieQueueMock.and.returnValue("fake movie queue instance");

        // when
        var result = subject.getForCurrentUser();

        // then
        expect($firebaseAuthService.$getAuth).toHaveBeenCalled();
        expect(firebaseRefFactory.getRef).toHaveBeenCalledWith([
          "userMovies",
          "fake uid",
          "movies"
        ]);
        expect(MovieQueueMock).toHaveBeenCalledWith("fake reference");
        expect(result).toEqual("fake movie queue instance");
      });
    });
  });
})();
