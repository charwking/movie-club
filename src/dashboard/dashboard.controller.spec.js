(function(angular) {
  "use strict";
  describe("DashboardController", function() {
    var subject;

    beforeEach(function() {
      module("movieClub");
      inject(function($controller) {
        subject = $controller("DashboardController", {
          currentMovie: "current movie value",
          propertyStore: "property store value",
          users: "users value"
        });
      });
    });

    describe("after initialization", function() {
      it("should expose the currentMovie", function() {
        expect(subject.currentMovie).toEqual("current movie value");
      });

      it("should expose the propertyStore", function() {
        expect(subject.propertyStore).toEqual("property store value");
      });

      it("should expose the users", function() {
        expect(subject.users).toEqual("users value");
      });
    });
  });
})(window.angular);
