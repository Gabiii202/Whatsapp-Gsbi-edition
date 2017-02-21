(function () {

  'use strict';

  angular.module('myWhatsApp.services')
    .service('ContactsSrv', ContactsSrv);

  ContactsSrv.$inject = ['$q','$firebaseArray'];

  function ContactsSrv($q,$firebaseArray){

    /**
     * Retrieves all the contacts in the Firebase database
     * @returns {*} Contacts
     */
    this.findAll = function(){
      const ref = firebase.database().ref("/contacts");
      return $firebaseArray(ref);
    };


    /**
     * Authenticates the user.
     * @param email Email
     * @param password Password
     * @returns {Promise} Promise containing the authenticated user
     */
    this.authenticate = function(email, password) {

      const deferred = $q.defer();

      // Retrieves the user in the database from the email and checks is the password matches
      firebase.database().ref("/contacts/")
        .equalTo(email)
        .orderByChild('email')
        .once('value', function(v){
          const user = findFirst(v.val());
          if(user && user.password === password){
            deferred.resolve(user);
          }
          else {
            deferred.reject('Erreur d\'authentification');
          }
        });

      return deferred.promise;

    };

    /**
     * Builds a Contact object which will be added to the database
     * @param email Email
     * @param prenom firstName
     * @param nom lastName
     * @param password Password
     * @returns {{_id: number, email: *, firstName: *, lastName: *, password: *, face: string}} Contact object
     */
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

    /**
     * Helper to find the first element of an object
     * @param obj Object
     * @returns {*} First element of the object
     */
    function findFirst(obj){
      for(const o in obj)
        return obj[o];
    }

  }

})();
