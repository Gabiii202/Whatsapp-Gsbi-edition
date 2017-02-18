(function (){

  'use strict';

  angular.module('myWhatsApp.controllers')
    .controller("ContactsCtrl",ContactsCtrl);

  ContactsCtrl.$inject=['$scope','ContactsSrv'];


  function ContactsCtrl($scope,ContactsSrv) {

    $scope.model = {};

    ContactsSrv.findAll().then(function (contacts) {
      $scope.contacts = contacts;
    });

    $scope.searchContact = function(contact) {
      if($scope.model.queryContact) {
        let query = $scope.model.queryContact.toLowerCase();
        return contact.firstName.toLowerCase().indexOf(query) > -1 || contact.lastName.toLowerCase().indexOf(query) > -1;
      } else {
        return true;
      }
    };

  }

})();
