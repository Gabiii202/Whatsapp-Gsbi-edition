(function (){

  'use strict';

  angular.module('myWhatsApp.controllers')
    .controller("ConversationsCtrl",ConversationsCtrl);

  ConversationsCtrl.$inject=['$scope','ConversationsSrv','$rootScope'];

  function ConversationsCtrl($scope, ConversationsSrv,$rootScope) {


    $scope.initModel = function () {
      $scope.conversations = ConversationsSrv.findConversationsForContact($rootScope.user._id);
    };


    $scope.creationDateOrder = function(conversation) {
      return new Date(conversation.creationDate);
    };

  }

})();
