(function() {
  "use strict";
  describe("movieSelector", function() {
    var subject;

    beforeEach(function() {
      module("movieClub");
      inject(function(movieSelector) {
        subject = movieSelector;
      });
    });

    describe("calculateUserAttendanceCredit", function() {
      it("returns 1 if there have never been any meetings", function() {
        var count = subject.calculateUserAttendanceCredit([], "1");
        expect(count).toEqual(1);
      });

      it("returns 1 if the user has never attended", function() {
        var meetings = [
          {
            date: "2015-12-10",
            selectedMovieUserId: "1",
            presentUsers: { "1": true, "2": true }
          },
          {
            date: "2016-01-10",
            selectedMovieUserId: "2",
            presentUsers: { "1": true, "2": true }
          }
        ];

        var count = subject.calculateUserAttendanceCredit(meetings, "3");

        expect(count).toEqual(1);
      });

      it("returns 0 if the last movie picked was from this user", function() {
        var meetings = [
          {
            date: "2015-01-01",
            selectedMovieUserId: "1",
            presentUsers: { "1": true, "2": true }
          },
          {
            date: "2015-01-08",
            selectedMovieUserId: "2",
            presentUsers: { "1": true, "2": true }
          }
        ];

        var count = subject.calculateUserAttendanceCredit(meetings, "2");

        expect(count).toEqual(0);
      });

      it("returns 1 if this is the first attendance since their movie was picked", function() {
        var meetings = [
          {
            date: "2015-01-01",
            selectedMovieUserId: "1",
            presentUsers: { "1": true, "2": true }
          },
          {
            date: "2015-01-08",
            selectedMovieUserId: "2",
            presentUsers: { "1": true, "2": true }
          },
          {
            date: "2015-01-15",
            selectedMovieUserId: "1",
            presentUsers: { "1": true, "3": true }
          },
          {
            date: "2015-01-22",
            selectedMovieUserId: "3",
            presentUsers: { "1": true, "3": true }
          }
        ];

        var count = subject.calculateUserAttendanceCredit(meetings, "2");

        expect(count).toEqual(1);
      });

      it("returns the number of attendances (including today) since the users movie was picked", function() {
        var meetings = [
          {
            date: "2015-01-01",
            selectedMovieUserId: "1",
            presentUsers: { "1": true, "2": true, "3": true }
          },
          {
            date: "2015-01-08",
            selectedMovieUserId: "2",
            presentUsers: { "1": true, "2": true, "3": true }
          },
          {
            date: "2015-01-15",
            selectedMovieUserId: "1",
            presentUsers: { "1": true, "3": true, "4": true }
          },
          {
            date: "2015-01-22",
            selectedMovieUserId: "3",
            presentUsers: { "1": true, "3": true }
          },
          {
            date: "2015-01-29",
            selectedMovieUserId: "4",
            presentUsers: { "1": true, "2": true, "3": true, "4": true }
          }
        ];

        var count = subject.calculateUserAttendanceCredit(meetings, "1");
        expect(count).toEqual(3);

        count = subject.calculateUserAttendanceCredit(meetings, "2");
        expect(count).toEqual(2);

        count = subject.calculateUserAttendanceCredit(meetings, "3");
        expect(count).toEqual(2);
      });
    });
  });
})();
