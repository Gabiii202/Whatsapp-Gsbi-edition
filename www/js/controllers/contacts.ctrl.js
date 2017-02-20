(function () {

  'use strict';

  angular.module('myWhatsApp.controllers')
    .controller("ContactsCtrl", ContactsCtrl);

  ContactsCtrl.$inject = ['$scope', 'ContactsSrv', 'ConversationsSrv', '$state', '$rootScope'];


  function ContactsCtrl($scope, ContactsSrv, ConversationsSrv, $state, $rootScope) {

    $scope.model = {};

    /**
     * Initialize scope data
     */
    $scope.initModel = function () {
      $scope.contacts = ContactsSrv.findAll();
      $scope.conversations = ConversationsSrv.findAll();
    };

    /**
     * Custom filter for contact searching
     * @param contact Contact searched
     * @returns {boolean} Indicates if contact is found
     */
    $scope.searchContact = function (contact) {
      if ($scope.model.search) {
        let query = $scope.model.search.toLowerCase();
        return contact.firstName.toLowerCase().indexOf(query) > -1 || contact.lastName.toLowerCase().indexOf(query) > -1;
      }
      return true;
    };

    /**
     * Creates a new conversation with logged in user and a contact
     * @param contact Contact added to the conversation
     */
    $scope.newPrivateConversation = function (contact) {

      let conversationTitle = contact.firstName + " " + contact.lastName;
      let description = "Conversation with " + conversationTitle;
      let conversation = ConversationsSrv.addConversation(conversationTitle, description, true);

      if (conversation !== null) {

        // Adds the new conversation to the synced object
        $scope.conversations.$ref().child(conversation._id).set(conversation);

        ConversationsSrv.setPrivateConversationMembers(conversation._id, [$rootScope.user, contact]);

        // Redirecting to the conversation view
        $state.go('tab.conversations', {conversationId: conversation._id, straightToDetail: true});
      }
    }

  }

})();
