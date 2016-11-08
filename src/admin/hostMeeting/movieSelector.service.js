(function () {
    'use strict';

    angular
        .module('movieClub')
        .factory('movieSelector', movieSelector);

    function movieSelector() {
        var factory = {
            calculateUserAttendanceCredit: calculateUserAttendanceCredit
        };

        return factory;

        function calculateUserAttendanceCredit(meetings, userId) {

            // everyone gets credit for today if it's the first meeting
            if (meetings.length === 0) {
                return 1;
            }

            meetings = _.sortBy(meetings, 'date');

            // No user gets two movies in a row
            if (meetings[meetings.length - 1].selectedMovieUserId === userId) {
                return 0;
            }

            // trim the meetings to only those this user attended
            meetings = _.filter(meetings, function (meeting) {
                return meeting.presentUsers[userId];
            });

            var picks = _.filter(meetings, {selectedMovieUserId: userId});

            // Get credit for all your meetings if you've never had your movie picked
            if (picks.length === 0) {
                return meetings.length + 1;
            }

            // Get credit for every attendance since your last pick (including today)
            var lastPickIndex = _.findIndex(meetings, {date: picks[picks.length - 1].date});
            return meetings.length - lastPickIndex;
        }
    }

}());
