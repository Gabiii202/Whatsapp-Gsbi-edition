(function (){

  'use strict';

  angular.module('myWhatsApp.controllers')
    .controller("NewConversationCtrl",NewConversationCtrl);

  NewConversationCtrl.$inject=['$scope','ContactsSrv','ConversationsSrv','$location', '$ionicPopup','$rootScope'];

  function NewConversationCtrl($scope,ContactsSrv,ConversationsSrv,$location,$ionicPopup,$rootScope) {

    $scope.conversations = ConversationsSrv.findAll();

    $scope.contacts = ContactsSrv.findAll();

    $scope.newConversation = {
      private: false
    };


    $scope.createConversation = function(name,description,contacts){

      let status = $scope.newConversation.private;


      let conversation = ConversationsSrv.addConversation(name,description,status);
      if(conversation !== null){

        $scope.conversations.$ref().child(conversation._id).set(conversation);

        if(status){
          let contactsToAdd = contacts.filter(c => c.checked === true || c._id === $rootScope.user._id);
          ConversationsSrv.setPrivateConversationMembers(conversation._id,contactsToAdd);
        }

        $location.path('/tab/conversations');
      }
      else {
        $ionicPopup.alert({
          title: 'Erreur création conversation',
          template: 'Veuillez renseigner les champs nom et description'
        });
      }

    }

  }

})();
