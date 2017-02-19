(function () {

  'use strict';

  angular.module('myWhatsApp.services')
    .service('ContactsSrv', ContactsSrv);

  ContactsSrv.$inject = ['$q','$firebaseArray'];

  function ContactsSrv($q,$firebaseArray){

    this.findAll = function(){
      let ref = firebase.database().ref("/contacts");
      return $firebaseArray(ref);
    };


    this.authenticate = function(email, password) {

      let deferred = $q.defer();

      firebase.database().ref("/contacts/")
        .equalTo(email)
        .orderByChild('email')
        .once('value', function(v){
          let user = findFirst(v.val());
          if(user && user.password === password){
            deferred.resolve(user);
          }
          else {
            deferred.reject('Erreur d\'authentification');
          }
        });

      return deferred.promise;

    };

    this.addContact = function( email,prenom, nom, password) {
      return {
        _id: Date.now(),
        email: email,
        firstName: prenom,
        lastName: nom,
        password: password,
        face: "img/profile.png"
      };

    };

    function findFirst(obj){
      for(let o in obj)
        return obj[o];
    };


    // function loadContactsFromJSON() {
    //   if(!contacts) {
    //     return $http.get('data/contacts.json').then(function (response) {
    //       contacts = response.data;
    //       return contacts;
    //     }, function (response) {
    //       console.log('Erreur contacts.json : ' + response.status);
    //     });
    //   } else {
    //     let c = $q.defer();
    //     c.resolve(contacts);
    //     return c.promise;
    //   }
    // }

  }

})();
