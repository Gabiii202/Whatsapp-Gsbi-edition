(function () {

  'use strict';

  angular.module('myWhatsApp.controllers')
    .controller("LoginCtrl",LoginCtrl);

  LoginCtrl.$inject=['$scope', '$rootScope', '$location', 'ContactsSrv', '$ionicPopup'];


  function LoginCtrl($scope, $rootScope, $location, ContactsSrv, $ionicPopup) {

    ContactsSrv.findAll().then(function (contacts) {
      $scope.contacts = contacts;
    });

    $scope.login = function(email, password) {

      $rootScope.user = ContactsSrv.authenticate(email, password);

      if($rootScope.user !== null) {
        $location.path('/conversations');
      } else {
        $ionicPopup.alert({
          title: 'Erreur d\'authentification',
          template: 'Adresse mail ou mot de passe incorect'
        });
      }
    };

  }

})();

