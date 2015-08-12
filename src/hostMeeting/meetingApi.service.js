(function (angular) {
    'use strict';

    angular
        .module('movieClub')
        .factory('meetingApi', meetingApi);

    function meetingApi(firebaseRef, $firebaseObject, $firebaseArray) {
        var factory = {
            getAll: getAll,
            getByDate: getByDate,
            saveMeeting: saveMeeting
        };
        return factory;

        function getAll() {
            return $firebaseArray(firebaseRef.child('meetings'));
        }

        function getByDate(date) {
            if (date) {
                return $firebaseObject(firebaseRef.child('meetings').child(formatDate(date)));
            }
        }

        function saveMeeting(date, presentUsers, selectedMovieName, selectedMovieUserId) {
            if (date) {
                var data = {
                    presentUsers: presentUsers,
                    selectedMovieName: selectedMovieName,
                    selectedMovieUserId: selectedMovieUserId
                };
                firebaseRef.child('meetings').child(formatDate(date)).set(data);
            }
        }

        function formatDate(date) {
            return date.getFullYear() + '-' +
                   (date.getMonth() + 1) + '-' +
                   date.getDate();
        }
    }

}(window.angular));
