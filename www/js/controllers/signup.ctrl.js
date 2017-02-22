(function () {

  'use strict';

  angular.module('myWhatsApp.controllers')
    .controller("SignupCtrl",SignupCtrl);

  SignupCtrl.$inject=['$scope', '$rootScope', '$location', 'ContactsSrv', '$ionicPopup'];


  function SignupCtrl($scope, $rootScope, $location, ContactsSrv, $ionicPopup) {

    /**
     * Initialize scope data
     */
    $scope.initModel = function () {
      $scope.contacts = ContactsSrv.findAll();
    };

    /**
     * User inscription
     * @param prenom firstName
     * @param nom lastName
     * @param email Email
     * @param password Password
     */
    $scope.signup = function(prenom, nom, email, password) {

      if(prenom && nom && email && password) {

        $rootScope.user = ContactsSrv.addContact(prenom, nom, email, password);

        // Adds the new contact to the synced object
        $scope.contacts.$ref().child($rootScope.user._id).set($rootScope.user);

        $location.path('/tab/contacts');
      } else {
        // Throws an error when the signup failed
        $ionicPopup.alert({
          title: 'Erreur d\'inscription',
          template: 'Veuillez renseigner tous les champs'
        });
      }
    };

  }

})();

