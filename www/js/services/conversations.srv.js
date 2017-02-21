(function (){

  'use strict';

  angular.module('myWhatsApp.services')
    .service('ConversationsSrv', ConversationsSrv);

  ConversationsSrv.$inject = ['$q','$firebaseArray','firebase'];

  function ConversationsSrv($q,$firebaseArray) {

    /**
     * Retrieves all the conversations from the Firebase database
     * @returns {*} Conversations
     */
    this.findAll = function(){
      const ref = firebase.database().ref("/conversations/");
      return $firebaseArray(ref);
    };

    /**
     * Retrieves a particular conversation from the Firebase database
     * @param conversationId ID of the conversation
     * @returns {Promise} Promise containing the conversation
     */
    this.getConversation = function(conversationId){

      const deferred = $q.defer();

      // Retrieves the conversation from the given ID
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

    /**
     * Retrieves members of a particular conversation from the Firebase database
     * @param conversationId ID of the conversation
     * @returns {Promise} Promise containing the members of the conversation
     */
    function getConversationMembers(conversationId){

      const deferred = $q.defer();

      // Retrieves the members of a conversation from the given ID
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

    /**
     * Retrives all the conversations of a given contact
     * @param contactId ID of the contact
     * @returns {Array} Contact's conversations
     */
    this.findConversationsForContact = function(contactId){

      const conversations = this.findAll();

      let conversationsForContact = [];

      // when the conversations object is loaded, builds an array of all the contacts' conversations
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

    /**
     * Checks if a given contact is in a conversation
     * @param contactId ID of the contact
     * @param conversationId ID of the conversation
     * @returns {*|Promise.<TResult>} Promise indicating if the contact is a member of the conversation
     */
    function isAPrivateConversationMember(contactId,conversationId){
      return getConversationMembers(conversationId).then(function(members){
        return contactId in members;
      });
    }

    /**
     * Builds a conversation object which will
     * @param nom Name of the conversation
     * @param description Description of the conversation
     * @param status Status ( public/private ) of the conversation
     * @returns {*}
     */
    this.addConversation = function(nom, description,status) {

      // if the name or the description isn't defined we can't build a conversation
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

    /**
     * Updates the last message of a given conversation
     * @param conversationId ID of the conversation
     * @param message Last message
     * @param date Date of the message
     */
    this.updateLastMessage = function(conversationId,message,date){
      firebase.database().ref("/conversations/"+conversationId).update({
        lastMessage: message,
        lastMessageDate: date
      });
    };

    /**
     * Sets the members of a given conversation in the Firebase database
     * @param conversationId ID of the conversation
     * @param contacts Conversation's contacts
     */
    this.setPrivateConversationMembers = function(conversationId,contacts){

      let contactsToAdd = [];

      contacts.forEach(function (contact){
        contactsToAdd[contact._id] = true;
      });

      firebase.database().ref("/members/"+conversationId).set(contactsToAdd);
    };


  }

})();
