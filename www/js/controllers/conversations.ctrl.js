(function (){

  'use strict';

  angular.module('myWhatsApp.controllers')
    .controller("ConversationsCtrl",ConversationsCtrl);

  ConversationsCtrl.$inject=['$scope','ConversationsSrv','$rootScope','$stateParams','$state','$ionicHistory','$ionicNavBarDelegate'];

  function ConversationsCtrl($scope, ConversationsSrv,$rootScope,$stateParams,$state,$ionicHistory,$ionicNavBarDelegate) {

    // cheat to clear history and hide back button
    $ionicHistory.clearHistory();
    $ionicNavBarDelegate.showBackButton(false);


    $scope.initModel = function () {
      $scope.conversations = ConversationsSrv.findConversationsForContact($rootScope.user._id);

      if($stateParams.straightToDetail){
        $state.go('tab.conversationDetail',{conversationId:$stateParams.conversationId,straightToDetail:false});
      }
    };


    $scope.creationDateOrder = function(conversation) {
      return new Date(conversation.creationDate);
    };

  }

})();
