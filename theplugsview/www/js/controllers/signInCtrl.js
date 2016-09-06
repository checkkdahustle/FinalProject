
angular.module('theplugsview').controller('SignInController', ['$scope', '$rootScope', '$http', '$state', 'Auth', function($scope, $rootScope, $http, $state, Auth) {
  console.log("Sign In View");
  $rootScope.authObj = Auth;

  Auth.$onAuthStateChanged(function(user) {
    if(user){
      $rootScope.currentUser = user;
      console.log('signed in')
			$state.go("tabs.home")
    } else {
      $rootScope.currentUser = null;
      console.log('signed out')
			$state.go("landing")
    }
  })

  $scope.loginWithFacebook = function () {
    // console.log("HOLLA!")
    $scope.authObj.$signInWithPopup("facebook").then(function(result) {
      // console.log("Signed in as:", result.user);
      $rootScope.currentUser = result.user;
    }).catch(function(error) {
      console.error("Authentication failed:", error);
    });
  }

  $scope.debug = function () {
    console.log("HOLLA!")
  }


}]);
