theplugsview
.controller('ConcertsController', [
  '$scope',
  '$http',
  '$state' ,
   function($scope, $http, $state) {

     // retrive concert data from json file.
     $http.get('js/data.json').success(function(data) {
      // Set all concerts info & each concert in a variable.
      $scope.concerts = data.concerts;
      // hide delete and reorder button, for Admins only.
      $scope.whichconcert = $state.params.cId;
      $scope.data = {
        showDelete: false,
        showReorder: false
      };
      // Delete item from list, for Admin only.
      $scope.onItemDelete = function(item) {
        $scope.concerts.splice($scope.concerts.indexOf(item), 1);
      }
      // on refresh pull down, retrive concert data.
      $scope.doRefresh =function() {
      $http.get('js/data.json').success(function(data) {
          $scope.concerts = data.concerts;
          $scope.$broadcast('scroll.refreshComplete');
        });
      }
      // toggle selected list to show star an item.
      $scope.toggleStar = function(item) {
        item.star = !item.star;
      }
      // Reorder concert list items, Admins only.
      $scope.moveItem = function (item, fromIndex, toIndex) {
        $scope.concerts.splice(fromIndex, 1);
        $scope.concerts.splice(toIndex, 0, item);
      };
  });
}]);
