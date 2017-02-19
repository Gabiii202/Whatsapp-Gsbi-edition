(function () {

  'use strict';

  angular.module('myWhatsApp.controllers')
    .controller("LoginCtrl",LoginCtrl);

  LoginCtrl.$inject=['$scope', '$rootScope', '$location', 'ContactsSrv', '$ionicPopup'];


  function LoginCtrl($scope, $rootScope, $location, ContactsSrv, $ionicPopup) {


    $scope.login = function(email, password) {

      ContactsSrv.authenticate(email, password).then(function(user){

        $rootScope.user = user;

        $location.path('/contacts');

      }).catch(function () {

        $ionicPopup.alert({
          title: 'Erreur d\'authentification',
          template: 'Adresse mail ou mot de passe incorect'
        });

      });

    };

  }

})();

