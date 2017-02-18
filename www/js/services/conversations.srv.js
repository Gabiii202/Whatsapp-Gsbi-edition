(function (){

  'use strict';

  angular.module('myWhatsApp.services')
    .service('ConversationsSrv', ConversationsSrv);

  ConversationsSrv.$inject = ['$http','$q','Guid'];

  function ConversationsSrv($http,$q,Guid) {

    var conversations;


    this.findAll = function(){
      return loadConversationsFromJSON();
    };

    this.remove = function(conversation){
      conversations.splice(conversations.indexOf(conversation),1)
    };

    this.getConversation = function(conversationId){
      return conversations ? conversations[findConversationIndex(conversations,conversationId)] : null;
    };


    this.addConversation = function(nom, description) {

      if(!nom || !description){
        return -1;
      }

      let newConversation = {
        _id: Guid.newGuid(),
        name: nom,
        description: description,
        creationDate: new Date()
      };

      conversations.push(newConversation);
      return 0;
    };

    function loadConversationsFromJSON() {
      if(!conversations) {
        return $http.get('data/conversations.json').then(function (response) {
          conversations = response.data;
          return conversations;
        }, function (response) {
          console.log('Erreur conversations.json : ' + response.status);
        });
      } else {
        let c = $q.defer();
        c.resolve(conversations);
        return c.promise;
      }
    }

    function findConversationIndex(conversations,id){
      for (let i = 0; i < conversations.length; i++) {
        if(conversations[i]._id === id) {
          return i;
        }
      }
      return -1;
    }

  }

})();
