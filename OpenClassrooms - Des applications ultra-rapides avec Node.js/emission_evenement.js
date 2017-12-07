var EventEmitter = require('events').EventEmitter; //on inclut le module EventEmitter

var jeu = new EventEmitter();// On crée un objet basé sur EventEmitter

jeu.on('gameover', function(message){ // On écoute l'évènemnet et on exécute une action quand l'évènement se produit
    console.log(message);
});

jeu.emit('gameover', 'Vous avez perdu !');// On emet un évènement dans notre code en faisant appel à emit() depuis l'objet basé sur EventEmitter.

//on peut envoyer autant de paramètres que necessaire à la fonction callback
// jeu.emit('nouveaujoueur', 'Mario', 35); // Envoie le nom d'un nouveau joueur qui arrive et son âge
