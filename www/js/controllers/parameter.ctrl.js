(function () {

  'use strict';

  angular.module('myWhatsApp.controllers')
    .controller("ParameterCtrl",ParameterCtrl);

  ParameterCtrl.$inject=['$scope','$rootScope','$location'];


  function ParameterCtrl($scope,$rootScope,$location) {

    /**
     * Disconnect the user from the app
     */
    $scope.disconnect = function(){

      $rootScope.user = null;
      $location.path("/login");
    }

  }

})();
