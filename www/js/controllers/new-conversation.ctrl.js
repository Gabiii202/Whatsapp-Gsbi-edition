(function (){

  'use strict';

  angular.module('myWhatsApp.controllers')
    .controller("NewConversationCtrl",NewConversationCtrl);

  NewConversationCtrl.$inject=['$scope','ContactsSrv','ConversationsSrv','$location', '$ionicPopup'];

  function NewConversationCtrl($scope,ContactsSrv,ConversationsSrv,$location,$ionicPopup) {

    $scope.newConversation = {
      private: false
    };

    ContactsSrv.findAll().then(function (contacts){
      $scope.newConversationContacts = contacts;
    });

    $scope.createConversation = function(name,description,contacts){

      var status = $scope.newConversation.private;


      var ret = ConversationsSrv.addConversation(name,description);
      if(ret !== -1){
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
