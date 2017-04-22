(function() {
  "use strict";
  var module = angular.module("movieClub");

  var arrayNames = ["meetings", "userMovies", "users"];

  var objectNames = [
    "adminStore",
    "currentMovie",
    "currentMovieUser",
    "propertyStore"
  ];

  arrayNames.forEach(function(name) {
    var factoryFunc = getFactoryFunc("$firebaseArray", name);
    module.factory(name, factoryFunc);
  });

  objectNames.forEach(function(name) {
    var factoryFunc = getFactoryFunc("$firebaseObject", name);
    module.factory(name, factoryFunc);
  });

  function getFactoryFunc(firebaseServiceName, firebaseItemName) {
    var func = function(firebaseService, firebaseRefFactory) {
      var ref = firebaseRefFactory.getRef(firebaseItemName);
      return firebaseService(ref);
    };
    func.$inject = [firebaseServiceName, "firebaseRefFactory"];
    return func;
  }
})();
