var myApp = angular.module('myApp', [
  'ngRoute',
  'app'
]);

myApp.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
    when('/list', {
        templateUrl: 'partials/list.html',
        controller: 'ListController'
    }).
    when('/details/:itemId',{
      templateUrl: 'partials/details.html',
      controller: 'DetailsController'
    }).
    when('/soundcloud', {
      templateUrl: 'partials/soundcloud.html',
      controller: 'SoundCloudController'
    }). 
    otherwise({
        redirectTo: '/list'
    });
}]);