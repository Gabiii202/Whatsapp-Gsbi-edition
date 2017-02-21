(function () {

  'use strict';

  angular.module('myWhatsApp.controllers')
    .controller("ConversationDetailCtrl",ConversationDetailCtrl);

  ConversationDetailCtrl.$inject=['$scope', '$stateParams', 'ConversationsSrv', 'ConversationDetailSrv','$ionicNavBarDelegate','$ionicHistory'];

  function ConversationDetailCtrl($scope, $stateParams, ConversationsSrv, ConversationDetailSrv,$ionicNavBarDelegate,$ionicHistory) {

    $ionicNavBarDelegate.showBackButton(true);

    let conversationId = $stateParams.conversationId;

    /**
     * Initialize scope data
     */
    $scope.initModel = function() {

      $scope.messages = ConversationDetailSrv.findAll(conversationId);

      // TODO : doesn't work: conversation title isn't shown on the conversationDetail view
      ConversationsSrv.getConversation(conversationId).then(function (conversation) {
        $scope.conversation = conversation;
      });

      ConversationDetailSrv.setHistoryStraightToDetail(false);

    };

    /**
     * Sends a message to the conversation
     * @param message Message sent
     */
    $scope.sendMessage = function(message) {

      let newMessage = ConversationDetailSrv.addMessage(message);

      // Adds the new message to the synced object
      $scope.messages.$ref().child(newMessage._id).set(newMessage);

      ConversationsSrv.updateLastMessage(conversationId,message,new Date().toString());

      $scope.message = null; // Resets input content

    };

    /**
     * Helper to facilitate orderBy date in the view
     * @param message Message sent
     * @returns {Date} Message's date
     */
    $scope.dateOrder = function(message) {
      return new Date(message.sentDate);
    };

  }

})();
