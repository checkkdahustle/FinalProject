// Ionic theplugsview App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'theplugsview' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('theplugsview', ['ionic', 'firebase'])

.run(function($ionicPlatform, $rootScope) {
  $rootScope.$on("$stateChangeError", function(event, toState, toParams, fromState, fromParams, error) {
    // We can catch the error thrown when the $requireSignIn promise is rejected
    // and redirect the user back to the home page
    if (error === "AUTH_REQUIRED") {
      $state.go("tabs.home");
    }
  });

  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

// Config Routes
.config(function ($stateProvider, $urlRouterProvider) {
  // firebaseapp config;
  var config = {
    apiKey: "AIzaSyBSge6gGPF-JOyqq70FJLFBaoKNA6V5glo",
    authDomain: "the-plugs-view.firebaseapp.com",
    databaseURL: "https://the-plugs-view.firebaseio.com",
    storageBucket: "the-plugs-view.appspot.com",
  };
  firebase.initializeApp(config);

  $stateProvider
    .state('tabs', {
      url: '/tab',
      abstract: true,
      templateUrl: 'views/templates/tabs.html'
  })
  // Features home tab state route
  .state('tabs.home', {
    url: '/home',
    views: {
      'home-tab' : {
        templateUrl: 'views/featuredView.html',
        controller: 'FeaturedController'
      }
    }
  })
  // Features Details home tab state route
  .state('tabs.home-detailsFeatures', {
    url: '/home/:cId',
    views: {
      'home-tab' : {
        templateUrl: 'views/templates/detail.html',
        controller: 'FeaturedController',
      }
    }
  })
  // Concert tab state route
  .state('tabs.concerts', {
    url: '/concerts',
    views: {
      'concerts-tab' : {
        templateUrl: 'views/concertView.html',
        controller: 'ConcertsController',
        // resolve: {
        //   "currentAuth": ["Auth", function(Auth) {
        //     return Auth.$requireSignIn();
        //   }]
        // }
      }
    }
  })
  .state('tabs.concerts-details', {
    url: '/concerts/:cId',
    views: {
      'concerts-tab' : {
        templateUrl: 'views/templates/detail.html',
        controller: 'ConcertsController',
        // resolve: {
        //   "currentAuth": ["Auth", function(Auth) {
        //     return Auth.$requireSignIn();
        //   }]
        // }
      }
    }
  })
  .state('tabs.calendar', {
    url: '/calendar',
    views: {
      'calendar-tab': {
        templateUrl: 'views/favoriteView.html',
        controller: 'FavoritesController'
      }
    }
  })
  // .state('tabs.detailConcert', {
  //   url: '/concerts/:cId',
  //   views: {
  //     'concerts-tab' : {
  //       templateUrl: 'views/detail.html',
  //       controller: 'ConcertsController'
  //     }
  //   }
  // })
  // .state('tabs.special', {
  //   url: '/special',
  //   views: {
  //     'special-tab' : {
  //       templateUrl: 'views/templates/specials.html',
  //       controller: 'FavoritesController'
  //     }
  //   }
  // })
$urlRouterProvider.otherwise('/tab/home');
})