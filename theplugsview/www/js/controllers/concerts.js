theplugsview
.controller('ConcertsController', [
  '$scope',
  '$http',
  '$state' ,
   function($scope, $http, $state) {

  $http.get('js/data.json').success(function(data) {
    console.log(data);
      $scope.concerts = data.concerts;
      $scope.whichconcert = $state.params.cId;
      $scope.data = {
        showDelete: false,
        showReorder: false
      };

      $scope.onItemDelete = function(item) {
        $scope.concerts.splice($scope.concerts.indexOf(item), 1);
      }

      $scope.doRefresh =function() {
      $http.get('js/data.json').success(function(data) {
          $scope.concerts = data.concerts;
          $scope.$broadcast('scroll.refreshComplete');
        });
      }

      $scope.toggleStar = function(item) {
        item.star = !item.star;
      }

      $scope.moveItem = function (item, fromIndex, toIndex) {
        $scope.concerts.splice(fromIndex, 1);
        $scope.concerts.splice(toIndex, 0, item);
      };
  });
}]);
