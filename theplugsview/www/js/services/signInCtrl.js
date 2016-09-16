theplugsview
.controller('SignInController', [
  '$scope',
  '$rootScope',
  '$state',
  'Auth',
  function($scope, $rootScope, $state, Auth) {
  $rootScope.authObj = Auth;

  // login With Facebook
  $scope.loginWithFacebook = function () {
    $scope.authObj.$signInWithPopup("facebook").then(function(result) {
      $rootScope.currentUser = result.user;
    }).catch(function(error) {
      console.error("Authentication failed:", error);
    });
  }


  // Auth State Change - User signed in and out.
  Auth.$onAuthStateChanged(function(user) {
    if(user){
      $rootScope.currentUser = user;
      // redirect to featured home page after logged in.
      console.log('signed in', user)
      $state.go("tabs.home")
      // result is suppose to push into database but doesn't
      var userRef = firebase.database().ref('users/uid').push();
      return userRef;

    } else {
      // redirect to sign in landing page
      $rootScope.currentUser = null;
      console.log('signed out', user)
			$state.go("landing")
    }
  })
}]);
