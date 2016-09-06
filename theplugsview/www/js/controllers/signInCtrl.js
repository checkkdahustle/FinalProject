
angular.module('theplugsview').controller('SignInController', ['$scope', '$rootScope', '$http', '$state', 'Auth', function($scope, $rootScope, $http, $state, Auth) {
  console.log("Sign In View");
  $rootScope.authObj = Auth;

  Auth.$onAuthStateChanged(function(user) {
    if(user){
      $rootScope.currentUser = user;
      // redirect to featured home page after logged in.
      console.log('signed in')
			$state.go("tabs.home")
    } else {
      $rootScope.currentUser = null;
      // redirect to sign in landing page
      console.log('signed out')
			$state.go("landing")
    }
  })
// login With Facebook
  $scope.loginWithFacebook = function () {
    $scope.authObj.$signInWithPopup("facebook").then(function(result) {
      $rootScope.currentUser = result.user;
    }).catch(function(error) {
      console.error("Authentication failed:", error);
    });
  }
}]);
