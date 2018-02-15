// On inclus le module 'events' de EventEmitter et on créer un objet basé sur EventEmitter
var events = require('events');
var eventEmitter = new events.EventEmitter();


// On indique ce qui va se passer quand l'évènement va se produire - Quand l'évenement cri se produit afficher dans la console "J'entends un cri"
 var myEventHandler = function () {
   console.log('I hear a scream!');
 }

// On indique quel évènement doit être écouter (surveiller) - surveiller quand l'évènement cri se produit et indiquer l'action stockée dans une variable (myEventHandler) qui va être effectué quand l'évènement à surveiller se produit
eventEmitter.on('scream', myEventHandler);


// On emet l'évenement (ici un cri)
eventEmitter.emit('scream');
