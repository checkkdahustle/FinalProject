angular.module('starter').controller('SignInController', ['$scope', '$rootScope', '$http', '$state', '$firebaseAuth', function($scope, $rootScope, $http, $state, $firebaseAuth) {
  console.log("Sign In View");
  $scope.authObj = $firebaseAuth();

  $scope.loginWithFacebook = function () {
    console.log("HOLLA!")
    $scope.authObj.$signInWithPopup("facebook").then(function(result) {
      console.log("Signed in as:", result.user);
      $rootScope.currentUser = result.user;
    }).catch(function(error) {
      console.error("Authentication failed:", error);
    });
  }


}]);
