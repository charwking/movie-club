(function (angular) {
    'use strict';

angular.module('movieClub.comingSoon')
    .controller('ComingSoonController', ComingSoonController);

function ComingSoonController() {
    var vm = this;
    vm.message = "Coming Soon!";
}

}(window.angular));
