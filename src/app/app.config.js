(function (angular) {

angular
    .module('movieClub')
    .config(appConfig);

function appConfig($urlRouterProvider) {
    $urlRouterProvider.when('', '/coming-soon');
}

}(window.angular));
