(function () {
  'use strict';


  angular.module('myWhatsApp.services')
    .service('ConversationDetailSrv', ConversationDetailSrv);

  ConversationDetailSrv.$inject = ['$rootScope','$firebaseArray','$ionicHistory'];

  function ConversationDetailSrv($rootScope,$firebaseArray,$ionicHistory) {

    this.findAll = function(conversationId) {
      let ref = firebase.database().ref("/messages/"+conversationId);
      return $firebaseArray(ref);
    };


    this.addMessage = function(message) {
      return {
        _id: Date.now(),
        sender: $rootScope.user.firstName,
        text: message,
        sentDate: new Date().toString()
      };
    }

    this.setHistoryStraightToDetail = function (value) {
      let historyId = $ionicHistory.currentHistoryId();
      let history = $ionicHistory.viewHistory().histories[historyId];
      for (let i = history.stack.length - 1; i >= 0; i--){
        if (history.stack[i].stateName == 'tab.conversations'){
          history.stack[i].stateParams.straightToDetail = value;
        }
      }
    }


  }


    // function loadMessagesFromJSON(conversationId) {
    //   return $http.get('data/messages.json').then(function (response) {
    //     let conversationsDetail = response.data;
    //     for(let i=0; i<conversationsDetail.length; i++) {
    //       if(conversationsDetail[i].conversationId === conversationId) {
    //         return conversationsDetail[i].messages;
    //       }
    //       return null;
    //     }
    //   }, function (response) {
    //     console.log('Erreur messages.json : ' + response.status);
    //   });
    // }



})();
