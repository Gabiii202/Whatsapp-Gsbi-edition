(function () {

  'use strict';

  angular.module('myWhatsApp.controllers')
    .controller("LoginCtrl",LoginCtrl);

  LoginCtrl.$inject=['$scope', '$rootScope', '$location', 'ContactsSrv', '$ionicPopup'];


  function LoginCtrl($scope, $rootScope, $location, ContactsSrv, $ionicPopup) {

    /**
     * User authentication
     * @param email User's email
     * @param password User's password
     */
    $scope.login = function(email, password) {

      // Rejects the connection attempt if the email or password input isn't filled
      if(!email || !password){
        $ionicPopup.alert({
          title: 'Erreur d\'authentification',
          template: 'Veuillez renseigner votre adresse mail et votre mot de passe'
        });
        return;
      }


      ContactsSrv.authenticate(email, password).then(function(user){

        $rootScope.user = user;

        // Redirects to contacts view if the credentials are correct
        $location.path('/tab/contacts');

      }).catch(function () {
        // Throw error if authentication failed
        $ionicPopup.alert({
          title: 'Erreur d\'authentification',
          template: 'Adresse mail ou mot de passe incorect'
        });

      });

    };

  }

})();

