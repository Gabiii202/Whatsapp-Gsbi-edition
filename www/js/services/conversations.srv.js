(function (){

  'use strict';

  angular.module('myWhatsApp.services')
    .service('ConversationsSrv', ConversationsSrv);

  ConversationsSrv.$inject = ['$q','$firebaseArray','firebase'];

  function ConversationsSrv($q,$firebaseArray) {

    this.findAll = function(){
      let ref = firebase.database().ref("/conversations/");
      return $firebaseArray(ref);
    };

    this.getConversation = function(conversationId){

      let deferred = $q.defer();

      firebase.database().ref("/conversations/"+conversationId)
        .once('value', function (v) {
          if(v.exists()) {
            deferred.resolve(v.val());
          } else {
            deferred.reject('Conversation non trouvée');
          }
        });

      return deferred.promise;
    };

     function getConversationMembers(conversationId){

      let deferred = $q.defer();

      firebase.database().ref("/members/"+conversationId)
        .once('value', function (v) {
          if(v.exists()) {
            deferred.resolve(v.val());
          } else {
            deferred.reject('Membres de la conversation non trouvés');
          }
        });

      return deferred.promise;
    }


    this.findConversationsForContact = function(contactId){
      let conversations = this.findAll();

      let conversationsForContact = [];

      conversations.$loaded()
        .then(function(){
          angular.forEach(conversations, function(conversation) {

            if(conversation.private){
              isAPrivateConversationMember(contactId,conversation._id).then(function(value){
                if(value){
                  conversationsForContact.push(conversation);
                }
              })
            } else{
              conversationsForContact.push(conversation);
            }

          })
        });

      return conversationsForContact;
    };

     function isAPrivateConversationMember(contactId,conversationId){
      return getConversationMembers(conversationId).then(function(members){
        return contactId in members;
      });


    }

    this.addConversation = function(nom, description,status) {

      if(!nom || !description){
        return null;
      }

      return {
        _id: Date.now(),
        name: nom,
        description: description,
        creationDate: new Date().toString(),
        lastMessage: "",
        lastMessageDate: "",
        private: status
      };
    };

    this.updateLastText = function(conversationId,message,date){
      firebase.database().ref("/conversations/"+conversationId).update({
        lastMessage: message,
        lastMessageDate: date
      });
    };

    this.setPrivateConversationMembers = function(conversationId,contacts){

      let contactsToAdd = [];

      contacts.forEach(function (contact){
          contactsToAdd[contact._id] = true;
      });

      firebase.database().ref("/members/"+conversationId).set(contactsToAdd);
    };


    // function loadConversationsFromJSON() {
    //   if(!conversations) {
    //     return $http.get('data/conversations.json').then(function (response) {
    //       conversations = response.data;
    //       return conversations;
    //     }, function (response) {
    //       console.log('Erreur conversations.json : ' + response.status);
    //     });
    //   } else {
    //     let c = $q.defer();
    //     c.resolve(conversations);
    //     return c.promise;
    //   }
    // }
    //
    // function findConversationIndex(conversations,id){
    //   for (let i = 0; i < conversations.length; i++) {
    //     if(conversations[i]._id === id) {
    //       return i;
    //     }
    //   }
    //   return -1;
    // }

  }

})();
