(function(angular) {
  "use strict";
  angular.module("movieClub").factory("youtubeValidator", youtubeValidator);

  function youtubeValidator() {
    var factory = {
      getYoutubeId: getYoutubeId
    };
    return factory;

    function getYoutubeId(url) {
      if (url && url.length > 0) {
        var regExp = /.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/;
        var match = url.match(regExp);
        if (match && match[1].length === 11) {
          return match[1];
        }
      }
    }
  }
})(window.angular);
