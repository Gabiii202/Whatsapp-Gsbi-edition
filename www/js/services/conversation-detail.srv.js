(function () {
  'use strict';


  angular.module('myWhatsApp.services')
    .service('ConversationDetailSrv', ConversationDetailSrv);

  ConversationDetailSrv.$inject = ['$http'];

  function ConversationDetailSrv($http) {


    this.findAll = function(conversationId) {
      return loadMessagesFromJSON(conversationId);
    };


    function loadMessagesFromJSON(conversationId) {
      return $http.get('data/messages.json').then(function (response) {
        let conversationsDetail = response.data;
        for(let i=0; i<conversationsDetail.length; i++) {
          if(conversationsDetail[i].conversationId === conversationId) {
            return conversationsDetail[i].messages;
          }
          return null;
        }
      }, function (response) {
        console.log('Erreur messages.json : ' + response.status);
      });
    }

  }

})();
