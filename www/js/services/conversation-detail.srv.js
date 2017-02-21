(function () {
  'use strict';


  angular.module('myWhatsApp.services')
    .service('ConversationDetailSrv', ConversationDetailSrv);

  ConversationDetailSrv.$inject = ['$rootScope','$firebaseArray','$ionicHistory'];

  function ConversationDetailSrv($rootScope,$firebaseArray,$ionicHistory) {

    /**
     * Retrieves all the messages from a conversation in the Firebase database
     * @param conversationId ID of the conversation
     * @returns {*} Messages from the conversation
     */
    this.findAll = function(conversationId) {
      const ref = firebase.database().ref("/messages/"+conversationId);
      return $firebaseArray(ref);
    };


    /**
     * Build a Message object which will be added to the database
     * @param message
     * @returns {{_id: number, sender: *, text: *, sentDate}}
     */
    this.addMessage = function(message) {
      return {
        _id: Date.now(),
        sender: $rootScope.user.firstName,
        text: message,
        sentDate: new Date().toString()
      };
    };

    /**
     * Modifies the straightToDetail attribute in the state parameters of the previous state (tab.conversations)
     * This will disable the fast forward action in ConversationCtrl
     * @param value Value to affect to the straightToDetail attribute
     */
    this.setHistoryStraightToDetail = function (value) {
      const historyId = $ionicHistory.currentHistoryId();
      const history = $ionicHistory.viewHistory().histories[historyId];
      for (let i = history.stack.length - 1; i >= 0; i--){
        if (history.stack[i].stateName == 'tab.conversations'){
          history.stack[i].stateParams.straightToDetail = value;
        }
      }
    }


  }

})();
