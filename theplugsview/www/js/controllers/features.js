theplugsview
.controller('FeaturedController', [
	'$scope',
	'$http',
	'$state',
	 function($scope, $http, $state) {

	$scope.logo = "<img class='logo' src='img/logo.png' />"

	// retrive concert data from json file.
	// Set all concerts info & each concert in a variable.
	// hide delete and reorder button, for Admins only.
  $http.get('js/data.json').success(function(data) {
      $scope.concerts = data.concerts;
      $scope.whichconcert = $state.params.cId;
      $scope.data = {
        showDelete:false, showReorder: false
      };

			// Delete item from list, for Admin only.
      $scope.onItemDelete = function(item) {
        $scope.concerts.splice($scope.concerts.indexOf(item), 1);
      }
			// on pull down, refresh page and retrive concert data.
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
