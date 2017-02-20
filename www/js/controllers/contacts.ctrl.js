(function (){

  'use strict';

  angular.module('myWhatsApp.controllers')
    .controller("ContactsCtrl",ContactsCtrl);

  ContactsCtrl.$inject=['$scope','ContactsSrv','ConversationsSrv','$state','$location','$rootScope'];


  function ContactsCtrl($scope,ContactsSrv,ConversationsSrv,$state,$location,$rootScope) {

    $scope.model = {};

    $scope.initModel = function () {
      $scope.contacts = ContactsSrv.findAll();
      $scope.conversations = ConversationsSrv.findAll();
    };

    $scope.searchContact = function(contact) {
      if($scope.model.search) {
        let query = $scope.model.search.toLowerCase();
        return contact.firstName.toLowerCase().indexOf(query) > -1 || contact.lastName.toLowerCase().indexOf(query) > -1;
      } else {
        return true;
      }
    };

    $scope.newPrivateConversation = function(contact){
      let conversationTitle = contact.firstName +" "+contact.lastName;
      let description = "Conversation with " + conversationTitle;

      let conversation = ConversationsSrv.addConversation(conversationTitle,description,true);
      if(conversation !== null){

        $scope.conversations.$ref().child(conversation._id).set(conversation);

        ConversationsSrv.setPrivateConversationMembers(conversation._id,[$rootScope.user,contact]);

        $state.go('tab.conversations',{conversationId:conversation._id,straightToDetail:true});
        //$location.path('/tab/conversations/'+conversation._id);
      }
    }


  }

})();
