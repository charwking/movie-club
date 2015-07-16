(function (angular) {
    'use strict';

    angular
        .module('movieClub')
        .factory('youtubeValidator', youtubeValidator);

    function youtubeValidator() {
        var factory = {
            validateYoutubeUrl: validateYoutubeUrl,
            youtubeIdParser: youtubeIdParser
        };
        return factory;

        function validateYoutubeUrl(url) {
            var regExp = /.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/;
            var match = url.match(regExp);
            if (match && match[1].length === 11) {
                return true;
            }
        }

        function youtubeIdParser(url) {
            var regExp = /.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/;
            var match = url.match(regExp);
            if (match && match[1].length === 11) {
                return match[1];
            }
            else {
                return 'dQw4w9WgXcQ';
            }
        }
    }

}(window.angular));
