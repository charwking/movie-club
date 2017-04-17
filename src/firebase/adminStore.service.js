(function () {
    'use strict';

    angular
        .module('movieClub')
        .factory('adminStore', adminStore);

    /* @ngInject */
    function adminStore(firebaseUtils) {
        return firebaseUtils.getObject('adminStore');
    }

}());
