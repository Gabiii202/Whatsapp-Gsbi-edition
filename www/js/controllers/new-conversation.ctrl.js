(function (){

  'use strict';

  angular.module('myWhatsApp.controllers')
    .controller("NewConversationCtrl",NewConversationCtrl);

  NewConversationCtrl.$inject=['$scope','ContactsSrv','ConversationsSrv','$location', '$ionicPopup','$rootScope'];


  function NewConversationCtrl($scope,ContactsSrv,ConversationsSrv,$location,$ionicPopup,$rootScope) {

    /**
     * Initialize scope data
     */
    $scope.initModel = function () {

      $scope.conversations = ConversationsSrv.findAll();
      $scope.contacts = ContactsSrv.findAll();

      $scope.newConversation = {
        private: false
      };

    };

    /**
     * Create a new conversation. If the conversation if private, a list of contacts is also provided
     * @param name Name of the conversation
     * @param description Description of the conversation
     * @param contacts Contacts to add to the conversation
     */
    $scope.createConversation = function(name,description,contacts){

      // Retrieve the status (public/private) of the new conversation
      const status = $scope.newConversation.private;

      const conversation = ConversationsSrv.addConversation(name,description,status);

      if(conversation !== null){

        // Adds the new conversation to the synced object
        $scope.conversations.$ref().child(conversation._id).set(conversation);

        // If the conversation will be private, we select the members checked and the current user to add them as members of the conversation
        if(status){
          const contactsToAdd = contacts.filter(c => c.checked === true || c._id === $rootScope.user._id);
          ConversationsSrv.setPrivateConversationMembers(conversation._id,contactsToAdd);
        }

        $location.path('/tab/conversations');
      }
      else {
        // Throws an error if the conversation cannot be added
        $ionicPopup.alert({
          title: 'Erreur création conversation',
          template: 'Veuillez renseigner les champs nom et description'
        });
      }

    }

  }

})();
