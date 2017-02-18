(function (){

  'use strict';

  angular.module('myWhatsApp.controllers')
    .controller("ConversationsCtrl",ConversationsCtrl);

  ConversationsCtrl.$inject=['$scope','ConversationsSrv'];

  function ConversationsCtrl($scope, ConversationsSrv) {


     ConversationsSrv.findAll().then(function (conversations) {
       $scope.conversations = conversations;
    });

  }

})();
