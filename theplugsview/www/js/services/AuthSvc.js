// Authentication for checking routes
angular.module('theplugsview')
.factory("Auth", ["$firebaseAuth", function($firebaseAuth) {
    return $firebaseAuth();
  }
]);


angular.module('theplugsview')
.factory("User", ["$firebaseObject",
  function($firebaseObject) {
    // create a new service based on $firebaseObject
    return $firebaseObject.$extend({
      // these methods exist on the prototype, so we can access the data using `this`
      getFullName: function() {
        return this.first_name + " " + this.last_name;
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
