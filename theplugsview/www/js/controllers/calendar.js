theplugsview
.controller('CalendarController', [
  '$scope',
  '$http',
  '$state', function($scope, $http, $state) {

    // retrive calendar data from json file.
    $http.get('js/data/concerts.json').success(function(data) {
      // Set all calendar info in a variable.
      $scope.calendar = data.calendar;
      // Delete item from calendar list.
      $scope.onItemDelete = function(dayIndex, item) {
        $scope.calendar[dayIndex].schedule.splice($scope.calendar[dayIndex].schedule.indexOf(item), 1);
      }
      // on refresh pull down, retrive calendar data.
      $scope.doRefresh = function() {
      $http.get('js/data/concerts.json').success(function(data) {
          $scope.calendar = data.calendar;
          $scope.$broadcast('scroll.refreshComplete');
        });
      }
      // toggle selected list to show star an item.
      $scope.toggleStar = function(item) {
        item.star = !item.star;
      }
  });
}]);
