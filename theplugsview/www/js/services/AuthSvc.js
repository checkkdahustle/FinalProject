// Authentication for checking routes
angular.module('theplugsview')
.factory("Auth", ["$firebaseAuth", function($firebaseAuth) {
    return $firebaseAuth();
  }
]);


angular.module('theplugsview')
.factory("User", ["$firebaseArray",
  function($firebaseArray) {
    // create a new service based on $firebaseObject
    var User = $firebaseObject.$extend({
      // these methods exist on the prototype, so we can access the data using `this`
      getFullName: function() {
        return this.currentUser.displayName;
      }
    });

    return function(userId) {
      var userRef = firebase.database().ref()
        .child("users").child(userId);

      // create an instance of User (the new operator is required)
      return new User(userRef);
    }
  }
]);
