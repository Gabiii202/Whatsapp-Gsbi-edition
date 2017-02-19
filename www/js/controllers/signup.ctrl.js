(function () {

  'use strict';

  angular.module('myWhatsApp.controllers')
    .controller("SignupCtrl",SignupCtrl);

  SignupCtrl.$inject=['$scope', '$rootScope', '$location', 'ContactsSrv', '$ionicPopup'];


  function SignupCtrl($scope, $rootScope, $location, ContactsSrv, $ionicPopup) {

    $scope.contacts = ContactsSrv.findAll();

    $scope.signup = function(prenom, nom, email, password) {

      if(prenom && nom && email && password) {
        $rootScope.user = ContactsSrv.addContact(prenom, nom, email, password);

        $scope.contacts.$add($rootScope.user);

        $location.path('/conversations');
      } else {

        $ionicPopup.alert({
          title: 'Erreur d\'inscription',
          template: 'Veuillez renseigner tous les champs'
        });
      }
    };

  }

})();

