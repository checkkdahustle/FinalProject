// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(ios.cordova && ios.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(ios.StatusBar) {
      StatusBar.styleDefault();
    }
  });


})
.config(function($stateProvider, $urlRouteProvider) {
  $stateProvider
    .state('tabs', {
      url: '/tabs',
      abstract: true,
      template: 'template/tabs.html'
    })
    .state('tabs', {
      url: '/tabs',
      views: {
        'Featured': {
          templateUrl: 'view/main.html',
          controller: 'featCtrl'
        },
        'concerts': {
          templateUrl: 'view/concerts.html',
          controller: 'concertsCtrl'
        }
      }
      template: 'template/list.html',
      controller: 'ListController'
    })

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBYULsN3R1Q1DMQWG7nrqtWHyICC_u9Yh4",
    authDomain: "blankapp-e1c82.firebaseapp.com",
    databaseURL: "https://blankapp-e1c82.firebaseio.com",
    storageBucket: "blankapp-e1c82.appspot.com",
  };
  firebase.initializeApp(config);
})
