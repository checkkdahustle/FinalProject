angular.module('starter')
.controller('FeaturedController', ['$scope', '$http', '$state', 'currentAuth', function($scope, $http, $state, currentAuth) {
  console.log("sup USER ", currentAuth);
  $scope.currentUser = currentAuth;

  $http.get('js/data.json').success(function(data) {
    console.log(data);
      $scope.artists = data;
      $scope.concerts = data;
      $scope.whichconcert = $state.params.cId;
      $scope.data = {
        showDelete:false, showReorder: false
      };

      $scope.onItemDelete = function(item) {
        $scope.artists.splice($scope.artists.indexOf(item), 1);
      }

      $scope.doRefresh =function() {
      $http.get('js/data.json').success(function(data) {
          $scope.artists = data;
          $scope.$broadcast('scroll.refreshComplete');
        });
      }

      $scope.toggleStar = function(item) {
        item.star = !item.star;
      }

      $scope.moveItem = function (item, fromIndex, toIndex) {
        $scope.artists.splice(fromIndex, 1);
        $scope.artists.splice(toIndex, 0, item);
      };
  });
}]);
