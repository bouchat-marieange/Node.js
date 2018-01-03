var EventEmitter = require('events').EventEmitter; //on inclut le module EventEmitter

var jeu = new EventEmitter();// On crée un objet basé sur EventEmitter

// jeu.on('gameover', function(message){ // On écoute l'évènemnet et on exécute une action quand l'évènement se produit
//     console.log(message);
// });
//
//
// jeu.emit('gameover', 'Vous avez perdu !');// On emet un évènement dans notre code en faisant appel à emit() depuis l'objet basé sur EventEmitter.

//on peut envoyer autant de paramètres que necessaire à la fonction callback
// jeu.emit('nouveaujoueur', 'Mario', 35); // Envoie le nom d'un nouveau joueur qui arrive et son âge


// Un autre exemple avec d'autres paramètres
// jeu.on('nouveaujoueur', function(nom, age){ // On écoute l'évènemnet et on exécute une action quand l'évènement se produit
//     console.log(nom, age);
// });
//
// jeu.emit('nouveaujoueur', 'Mario', 35);
// Va afficher Mario 35 dans la console


// Une explication claire et détaillée
// Source: https://www.w3schools.com/nodejs/nodejs_events.asp

// Vous pouvez affecter des gestionnaires d'événements à vos propres événements avec l'objet EventEmitter.
// Dans l'exemple ci-dessous, nous avons créé une fonction qui sera exécutée lorsqu'un événement "scream" est déclenché.
// Pour déclencher un événement, utilisez la méthode emit ().
//
// Example
// var events = require('events');
// var eventEmitter = new events.EventEmitter();
//
// //Create an event handler:
// var myEventHandler = function () {
//   console.log('I hear a scream!');
// }
//
// //Assign the event handler to an event:
// eventEmitter.on('scream', myEventHandler);
//
// //Fire the 'scream' event:
// eventEmitter.emit('scream');
