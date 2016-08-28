// Authentication for checking routes
angular.module('theplugsview').factory("Auth", ["$firebaseAuth",
  function($firebaseAuth) {
    return $firebaseAuth();
  }
]);
