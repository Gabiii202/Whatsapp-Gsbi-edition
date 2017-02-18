(function () {

  'use strict';

  angular.module('myWhatsApp.services')
    .service('ContactsSrv', ContactsSrv);

  ContactsSrv.$inject = ['$http','$q','Guid'];

  function ContactsSrv($http,$q,Guid){

    var contacts;

    this.findAll = function(){
      return loadContactsFromJSON();
    };

    this.authenticate = function(email, password) {
      for(let i=0; i < contacts.length; i++) {
        if(contacts[i].email === email && contacts[i].password === password) {
          return contacts[i];
        }
      }
      return null;
    };

    this.addContact = function( email,prenom, nom, password) {
      let newContact = {
        _id : Guid.newGuid(),
        email: email,
        firstName: prenom,
        lastName: nom,
        password: password,
        face: "img/profile.png"
      };

      contacts.push(newContact);

      return newContact;

    };

    this.findByProperty = function(property,value){
      for(let i=0; i < contacts.length; i++) {
        if(contacts[i][property] === value) {
          return contacts[i];
        }
      }
      return null;
    };


    function loadContactsFromJSON() {
      if(!contacts) {
        return $http.get('data/contacts.json').then(function (response) {
          contacts = response.data;
          return contacts;
        }, function (response) {
          console.log('Erreur contacts.json : ' + response.status);
        });
      } else {
        let c = $q.defer();
        c.resolve(contacts);
        return c.promise;
      }
    }

  }

})();
