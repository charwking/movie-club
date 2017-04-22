(function(angular) {
  "use strict";
  angular.module("movieClub").directive("youtube", youtube);

  function youtube() {
    return {
      restriction: "EA",
      scope: {
        videoUrl: "=",
        autoPlay: "@",
        width: "@",
        height: "@"
      },
      controller: function($scope, youtubeValidator) {
        $scope.getIframeSrc = getIframeSrc;
        $scope.width = $scope.width || 560;
        $scope.height = $scope.height || 315;

        function getIframeSrc(videoUrl) {
          var embedUrl =
            "https://www.youtube.com/embed/" +
            youtubeValidator.getYoutubeId(videoUrl);
          if ($scope.autoPlay) {
            embedUrl += "?autoplay=1";
          }
          return embedUrl;
        }
      },
      template: '<iframe width="{{width}}"' +
        'height="{{height}}"' +
        'ng-src="{{getIframeSrc(videoUrl)}}"' +
        'frameborder="0"' +
        "allowfullscreen>" +
        "</iframe>"
    };
  }
})(window.angular);
