// On importe le module events dans notre script avec un require()
var events = require('events');

//On crée un objet eventEmitter qui permet de faire fonctionner nos évènements
var eventEmitter = new events.EventEmitter();


// Creation de l'évenement
// On crée une fonction myEvent() que l'on voudra déclencher lors d'un évènement précis
// Notre fonction myEvent affichera "Vive le terminal" dans la console
var myEvent = function() {
 console.log('Vive le terminal');
}

// Application de l'événement à un cas
// On lance notre fonction lorsque l'objet eventEmitter reçoit le signal 'terminal'.(premier paramètre de on()). L'objet écoute, ou attend de recevoir ce signal
// En second paramètre de on() on indique la commande qui doit se déclencher, ici nous souhaitons exécuter notre fonction myEvent() qui affiche "Vive le terminal" dans la console
eventEmitter.on('terminal', myEvent);


// Lance l'évenement "aimeTerminal"
// Ce n'est qu'à cette ligne que notre fonction s'exécute et ce n'est que si le emit ('terminal) de la ligne précédente s'éxécute que le on() que nous avons écrit précédement se lance.
// L'interêt de emit() est qu'il peut s'exécuter quand vous le désirez (à l'appui d'une touche, sur un lien, sur un bouton, etc...)
eventEmitter.emit('terminal');


// Pour voir s'afficher "Vive le terminal" dans le terminal, il faut se placer dans le dossier du projet, ouvrir le terminal puis taper la commande node creer_evenement.js.
//Nodejs, va alors suivre tout le script qu'il contient, lancer le fichier en allant chercher ses dépendances "events" avec require, puis il va s'éxécuter, on lui a indiquer ce qu'il devait faire myfunction, on lui a envoyé le signal qu'il attendait pour lancer la fonction 'terminal' et on l'éxécute, donc le message s'affiche dans le terminal.
