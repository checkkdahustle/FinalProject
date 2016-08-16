starter.factory('Authentication', ['$rootScope', '$firebaseAuth', '$firebaseObject', '$location', 'FIREBASE_URL', function ($rootScope, $firebaseAuth, $firebaseObject, $location, FIREBASE_URL) {

	// var ref = new Firebase(FIREBASE_URL);
	// var auth = $firebaseAuth(ref);
	var userId = firebase.auth().currentUser.uid;


	firebase.auth().onAuthStateChanged(function(user) {
		var user = firebase.auth().currentUser;
		if (user) {
			var userRef = new Firebase(FIREBASE_URL + 'users/' + authUser.uid);
			var userObj = $firebaseObject(userRef);
			$rootScope.currentUser = userObj;
		}else {
			$rootScope.currentUser = '';
		}
	})

	var thisObject = {
		login: function (user) {
			auth.$authWithPassword({
				email: user.email,
				password: user.password
			}).then(function(rUser) {
				$location.path('/causes');
			}).catch(function(error) {
				$rootScope.message = error.message;
			});
		}, // close login return

		logout: function () {
			return auth.$unauth();
		}, // logout

		requireAuth: function() {
			return auth.$requireAuth();
		}, // require Authentication

		register: function(user) {
			auth.$createUser({
				email: user.email,
				password: user.password
			}).then(function (rUser) {

				var rRef = new Firebase(FIREBASE_URL + 'users')
				.child(rUser.uid).set({
					date: Firebase.ServerValue.TIMESTAMP,
					regUser: rUser.uid,
					firstName: user.fname,
					lastName: user.lname,
					email: user.email,
					causes: {}
				}); // users and or donators info stored in DB.

				thisObject.login(user);

			}).catch(function (error) {
				$rootScope.message = error.message;
			}); // close auth.createUser function, & promise of rUser and error handling.
		} // close register return
	}; // close return method


	return thisObject;

}]); // close factory
Contact GitHub API Training Shop Blog About
