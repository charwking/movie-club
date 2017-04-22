"use strict";

describe("navComponent", function() {
  var authState;
  var subject;

  beforeEach(module("movieClub"));
  beforeEach(
    inject(function($componentController, _authState_) {
      authState = _authState_;
      subject = $componentController("mcNav", {
        authState: authState
      });
    })
  );

  it("exposes the authState.isAdmin function", function() {
    expect(subject.isAdmin).toBe(authState.isAdmin);
  });

  it("exposes the authState.isLoggedIn function", function() {
    expect(subject.isLoggedIn).toBe(authState.isLoggedIn);
  });
});
