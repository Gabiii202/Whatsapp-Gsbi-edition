(function () {

  'use strict';

  angular.module('myWhatsApp.controllers')
    .controller("ConversationDetailCtrl",ConversationDetailCtrl);

  ConversationDetailCtrl.$inject=['$scope', '$stateParams', 'ConversationsSrv', 'ConversationDetailSrv','$ionicHistory','$ionicNavBarDelegate'];

  function ConversationDetailCtrl($scope, $stateParams, ConversationsSrv, ConversationDetailSrv,$ionicHistory,$ionicNavBarDelegate) {

    $ionicNavBarDelegate.showBackButton(true);

    let conversationId = $stateParams.conversationId;

    $scope.initModel = function() {

      $scope.messages = ConversationDetailSrv.findAll(conversationId);

      // TODO : doesn't work: conversation title isn't shown on the conversationDetail view
      ConversationsSrv.getConversation(conversationId).then(function (conversation) {
        $scope.conversation = conversation;
      });

      var historyId = $ionicHistory.currentHistoryId();
      var history = $ionicHistory.viewHistory().histories[historyId];
      for (var i = history.stack.length - 1; i >= 0; i--){
        if (history.stack[i].stateName == 'tab.conversations'){
          history.stack[i].stateParams.straightToDetail = false;
          console.log(history.stack[i]);
        }
      }

    };

    $scope.sendMessage = function(message) {
      let newMessage = ConversationDetailSrv.addMessage(message);

      $scope.messages.$ref().child(newMessage._id).set(newMessage);

      ConversationsSrv.updateLastText(conversationId,message,new Date().toString());

      $scope.message = null;

    };

    $scope.dateOrder = function(message) {
      return new Date(message.sentDate);
    };

  }

})();
