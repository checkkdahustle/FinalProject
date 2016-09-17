// Authentication for checking routes
theplugsview
.constant('FirebaseUrl', 'https://the-plugs-view.firebaseio.com/')
.service('rootRef',['FirebaseUrl', firebase])
.factory("Auth", ["$firebaseAuth",
  function Auth($firebaseAuth, rootRef) {
    return $firebaseAuth(rootRef);
  }])
