(function() {
  "use strict";
  describe("youtubeValidator", function() {
    var youtubeValidator;

    beforeEach(module("movieClub"));
    beforeEach(
      inject(function(_youtubeValidator_) {
        youtubeValidator = _youtubeValidator_;
      })
    );

    describe("getYoutubeId", function() {
      it("return NULL when URL is NULL", function() {
        expect(youtubeValidator.getYoutubeId(null)).toBe(undefined);
      });

      it("return NULL when URL is an empty string", function() {
        expect(youtubeValidator.getYoutubeId("")).toBe(undefined);
      });

      it("return NULL when URL is not a valid youtube URL", function() {
        expect(youtubeValidator.getYoutubeId("www.google.com")).toBe(undefined);
      });

      it("return YouTube video ID when passed a valid youtube URL", function() {
        expect(
          youtubeValidator.getYoutubeId(
            "https://www.youtube.com/watch?v=UhhCdJY3KMw"
          )
        ).toBe("UhhCdJY3KMw");
      });
    });
  });
})();
