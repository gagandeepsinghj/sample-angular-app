var app = angular.module('app', []);

app.controller('ListController', ['$scope', '$http', function($scope, $http) {
    $http.get('js/data.json').success(function(data) {
        $scope.artists = data;
        $scope.artistOrder = 'name';
    });
}]);

app.controller('DetailsController', ['$scope', '$http','$routeParams',function($scope, $http, $routeParams) {
    $http.get('js/data.json').success(function(data) {
        $scope.artists = data;
        $scope.whichItem = $routeParams.itemId;

        if($routeParams.itemId > 0){
          $scope.prevItem = Number($routeParams.itemId) - 1;
        }else{
          $scope.prevItem = $scope.artists.length - 1;
        }

        if($routeParams.itemId < $scope.artists.length-1){
          $scope.nextItem = Number($routeParams.itemId) + 1;
        }else{
          $scope.nextItem = 0;
        }
    });
}])

app.factory('Track', ['$http', function($http) {

  var service = {};

  service.getList = function() {
    return $http.get('https://api.soundcloud.com/tracks?client_id=8572d99be4b0efe33dad2c591c0d5b13');
  }

  service.update = function(track) {
    return $http.put('https://api.soundcloud.com/tracks/' + track.id + '?client_id=8572d99be4b0efe33dad2c591c0d5b13', { track: track });
  }

  return service;

}])

app.controller('SoundCloudController', ['$scope', 'Track', function($scope, Track) {

  Track.getList()
    .success(function(data) {
      $scope.tracks = data;
    })
    .error(function(data) {
      alert('request failed....');
    })

  $scope.updateTrack = function(track) {
    Track.update(track)
      .success(function(response) {

      })
      .error(function(response) {
        console.log(response);
      })
    track.editable = null;
  }

}])