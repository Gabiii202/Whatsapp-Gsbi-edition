(function () {

  'use strict';

  angular.module('myWhatsApp.controllers')
    .controller("ConversationDetailCtrl",ConversationDetailCtrl);

  ConversationDetailCtrl.$inject=['$scope', '$stateParams', 'ConversationsSrv', 'ConversationDetailSrv', 'Guid', '$rootScope'];

  function ConversationDetailCtrl($scope, $stateParams, ConversationsSrv, ConversationDetailSrv, Guid, $rootScope) {

    var conversationId = $stateParams.conversationId;

    $scope.conversation = ConversationsSrv.getConversation(conversationId);


    ConversationDetailSrv.findAll(conversationId).then(function(messages){
      $scope.messages = messages;
    });

    $scope.sendMessage = function(message) {

      let newMessage = {
        _id: Guid.newGuid(),
        sender: $rootScope.user.firstName,
        text: message,
        sentDate: new Date()
      };

      $scope.messages.push(newMessage);

      $scope.message = null;

    };



  }

})();
