(function () {

  'use strict';

  angular.module('myWhatsApp.controllers')
    .controller("ConversationDetailCtrl",ConversationDetailCtrl);

  ConversationDetailCtrl.$inject=['$scope', '$stateParams', 'ConversationsSrv', 'ConversationDetailSrv'];

  function ConversationDetailCtrl($scope, $stateParams, ConversationsSrv, ConversationDetailSrv) {

    let conversationId = $stateParams.conversationId;

    $scope.initModel = function() {
      $scope.messages = ConversationDetailSrv.findAll(conversationId);

      // TODO : doesn't work: conversation title isn't shown on the conversationDetail view
      ConversationsSrv.getConversation(conversationId).then(function (conversation) {
        $scope.conversation = conversation;
      });
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
