'use strict';

angular.module('rewarners', ['ionic', 'starter.controllers', 'starter.services',
    'ui.router',
  'rewarnersServices',
  'ngCordova'])

.config(function($stateProvider, $urlRouterProvider){
  // default path
  // $urlRouterProvider.otherwise('/login/main');
  $urlRouterProvider.otherwise('/tab/dash');
  $stateProvider
    .state('home.main', {
      url: '/main',
      views: {
        'content': {
          templateUrl: 'views/home-main.html',
          controller: 'HomeController'
        }
      },
      data: {
        authentication: true
      }
    })
    .state('login', {
      url: '/login',
      abstract: true,
      templateUrl: 'views/login.html'
    })
    .state('login.main', {
      url: '/main',
      views: {
        'login': {
          templateUrl: 'views/login-main.html',
          controller: 'LoginController'
        }
      }
    })
    .state('register', {
      url: '/register',
      abstract: true,
      templateUrl: 'views/login.html'
    })
    .state('register.main', {
      url: '/main',
      views: {
        'login': {
          templateUrl: 'views/register-main.html',
          controller: 'RegistrationController'
        }
      }
    })
    .state('register.success', {
      url: '/success',
      views: {
        'login': {
          templateUrl: 'views/register-success.html'
        }
      }
    })
    .state('reset.password', {
      url: '/password',
      views: {
        'login': {
          templateUrl: 'views/reset-password.html',
          controller: 'ResetPasswordController'
        }
      }
    }).
    state('reset.success', {
      url: '/success',
      views: {
        'login': {
          templateUrl: 'views/reset-success.html'
        }
      }
    }).
    state('reset.failure', {
      url: '/failure',
      views: {
        'login': {
          templateUrl: 'views/reset-failure.html'
        }
      }
    })

  // TODO: remove these mockups
  // setup an abstract state for the tabs directive
  .state('tab', {
    url: "/tab",
    abstract: true,
    templateUrl: "templates/tabs.html"
  })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  });;
})

.run(function($ionicPlatform, $rootScope, $state, CurrentSession) {
  var session = CurrentSession.session;

  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }

    // hide the splash screen
    if (navigator.splashscreen) {
      navigator.splashscreen.hide();
    }

    // manage state changes
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {

      if (toState.data && toState.data.authentication && !CurrentSession.session.isAuthenticated()) {
        event.preventDefault();
        // test for authentication
        console.log('redirect to login');
        $state.go('login.main');
      }
    });
  });
});

// define the module
angular.module('rewarnersServices', ['ngResource']);

// .config(function($stateProvider, $urlRouterProvider) {

//   // Ionic uses AngularUI Router which uses the concept of states
//   // Learn more here: https://github.com/angular-ui/ui-router
//   // Set up the various states which the app can be in.
//   // Each state's controller can be found in controllers.js
//   $stateProvider

//   // setup an abstract state for the tabs directive
//     .state('tab', {
//     url: "/tab",
//     abstract: true,
//     templateUrl: "templates/tabs.html"
//   })

//   // Each tab has its own nav history stack:

//   .state('tab.dash', {
//     url: '/dash',
//     views: {
//       'tab-dash': {
//         templateUrl: 'templates/tab-dash.html',
//         controller: 'DashCtrl'
//       }
//     }
//   })

//   .state('tab.chats', {
//       url: '/chats',
//       views: {
//         'tab-chats': {
//           templateUrl: 'templates/tab-chats.html',
//           controller: 'ChatsCtrl'
//         }
//       }
//     })
//     .state('tab.chat-detail', {
//       url: '/chats/:chatId',
//       views: {
//         'tab-chats': {
//           templateUrl: 'templates/chat-detail.html',
//           controller: 'ChatDetailCtrl'
//         }
//       }
//     })

//   .state('tab.account', {
//     url: '/account',
//     views: {
//       'tab-account': {
//         templateUrl: 'templates/tab-account.html',
//         controller: 'AccountCtrl'
//       }
//     }
//   });

//   // if none of the above states are matched, use this as the fallback
//   $urlRouterProvider.otherwise('/tab/dash');

// });