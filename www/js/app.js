(function () {

  'use strict';

  angular.module('myWhatsApp', ['ionic', 'myWhatsApp.controllers', 'myWhatsApp.services','angularMoment',
                                'nl2br','firebase'])

    .run(function($ionicPlatform, $rootScope, $location, $state) {

      $rootScope.user = null;

      $ionicPlatform.ready(function() {

        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
          cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
          cordova.plugins.Keyboard.disableScroll(true);

        }
        if (window.StatusBar) {
          StatusBar.styleDefault();
        }

        // Authentication pattern. We redirect user to login page if rootScope.user isn't defined
        $rootScope.$on('$ionicView.beforeEnter', function(e, view) {

          if(view.stateId === 'signup' || view.stateId === 'login' ) {
            return;
          }

          if($rootScope.user === null) {
            e.preventDefault();
            $state.go('login');
          }
        });

      });
    })

    .config(function($stateProvider, $urlRouterProvider,$ionicConfigProvider) {

      $ionicConfigProvider.tabs.position('bottom');
      $ionicConfigProvider.navBar.alignTitle('center');

      $stateProvider

        .state('tab', {
          url: '/tab',
          abstract: true,
          templateUrl: 'templates/tabs.html'
        })

        .state('login', {
          url: '/login',
          templateUrl: 'templates/login.tpl.html',
          controller: 'LoginCtrl'
        })

        .state('signup', {
          url: '/signup',
          templateUrl: 'templates/signup.tpl.html',
          controller: 'SignupCtrl'
        })

        .state('tab.contacts', {
          url: '/contacts',
          views: {
            'tab-contacts': {
              templateUrl: 'templates/tab-contacts.tpl.html',
              controller: 'ContactsCtrl'
            }
          }
        })

        .state('tab.conversations', {
          url: '/conversations',
          params:{
            conversationId: null,
            straightToDetail: false
          },
          views: {
            'tab-conversations': {
              templateUrl: 'templates/tab-conversations.tpl.html',
              controller: 'ConversationsCtrl'
            }
          }
        })

        .state('newConversation', {
          url: '/newConversation',
              templateUrl: 'templates/new-conversation.tpl.html',
              controller: 'NewConversationCtrl'
        })

        .state('tab.conversationDetail', {
          url: '/conversations/:conversationId',
          params:{
            straightToDetail: false
          },
          views: {
            'tab-conversations': {
              templateUrl: 'templates/conversation-detail.tpl.html',
              controller: 'ConversationDetailCtrl'
            }
          }
        })

        .state('tab.parameters', {
          url: '/parameters',
          views: {
            'tab-parameters': {
              templateUrl: 'templates/tab-parameters.tpl.html',
              controller: 'ParameterCtrl'
            }
          }
        });

      // if none of the above states are matched, use this as the fallback
      $urlRouterProvider.otherwise('/login');

    });


})();
