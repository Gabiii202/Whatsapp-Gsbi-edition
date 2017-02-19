(function () {
  'use strict';


  angular.module('myWhatsApp.services')
    .service('ConversationDetailSrv', ConversationDetailSrv);

  ConversationDetailSrv.$inject = ['$rootScope','$firebaseArray'];

  function ConversationDetailSrv($rootScope,$firebaseArray) {

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
