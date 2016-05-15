(function (angular) {
    'use strict';

    angular
        .module('movieClub')
        .factory('meetingApi', meetingApi);

    function meetingApi(firebaseRef, $firebaseObject, $firebaseArray) {
        var factory = {
            getAll: getAll,
            saveMeeting: saveMeeting
        };
        return factory;

        function getAll() {
            return $firebaseArray(firebaseRef.child('meetings'));
        }

        function saveMeeting(date, presentUsers, selectedMovieName, selectedMovieUserId) {
            var data = {
                date: formatDate(date),
                presentUsers: presentUsers,
                selectedMovieName: selectedMovieName,
                selectedMovieUserId: selectedMovieUserId
            };
            firebaseRef.child('meetings').push(data);
        }

        function formatDate(date) {
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            var day = date.getDate();

            month = ('0' + month).slice(-2);
            day = ('0' + day).slice(-2);

            return year + '-' + month + '-' + day;
        }
    }

}(window.angular));
