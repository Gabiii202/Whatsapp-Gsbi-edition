(function (){

  'use strict';

  angular.module('myWhatsApp.controllers')
    .controller("ConversationsCtrl",ConversationsCtrl);

  ConversationsCtrl.$inject=['$scope','ConversationsSrv','$rootScope','$stateParams','$state','$ionicHistory','$ionicNavBarDelegate'];

  function ConversationsCtrl($scope, ConversationsSrv,$rootScope,$stateParams,$state,$ionicHistory,$ionicNavBarDelegate) {

    // cheat to clear history and hide back button
    $ionicHistory.clearHistory();
    $ionicNavBarDelegate.showBackButton(false);


    /**
     * Initialize scope data
     */
    $scope.initModel = function () {

      $scope.conversations = ConversationsSrv.findConversationsForContact($rootScope.user._id);

      // Checks if attribute is set to true. If that's the case redirect to the conversation detail view
      if($stateParams.straightToDetail){
        $state.go('tab.conversationDetail',{conversationId:$stateParams.conversationId,straightToDetail:false});
      }

    };

    /**
     * Helper to facilitate orderBy date in the view
     * @param conversation Conversation
     * @returns {Date} Conversation's last message date
     */
    $scope.lastMessageDateOrder = function(conversation) {
      return new Date(conversation.lastMessageDate);
    };

  }

})();
