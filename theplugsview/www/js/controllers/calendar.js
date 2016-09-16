theplugsview
.controller('FavoritesController', ['$scope', '$http', '$state', function($scope, $http, $state) {
  console.log("Favorite - Calendar View")

  $http.get('js/data.json').success(function(data) {
    // console.log(data);
      $scope.calendar = data.calendar;

      $scope.onItemDelete = function(dayIndex, item) {
        $scope.calendar[dayIndex].schedule.splice($scope.calendar[dayIndex].schedule.indexOf(item), 1);
      }

      $scope.doRefresh = function() {
      $http.get('js/data.json').success(function(data) {
          $scope.calendar = data.calendar;
          $scope.$broadcast('scroll.refreshComplete');
        });
      }

      $scope.toggleStar = function(item) {
        item.star = !item.star;
      }

  });
}]);
