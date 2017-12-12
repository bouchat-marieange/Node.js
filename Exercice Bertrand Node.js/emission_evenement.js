var http = require('http'); //On créer un serveur donc on fait obligatoirement appel au module http (ne pas oublier de l'installer dans le dossier de travail)
var EventEmitter = require('events').EventEmitter; //on inclut le module EventEmitter

var jeu = new EventEmitter();// On crée un objet basé sur EventEmitter



jeu.on('gameover', function(message){ // On écoute l'évènemnet et on exécute une action quand l'évènement se produit - fonction callback - coté serveur
    console.log(message); // Cela affiche uniquement dans le terminal['Mario',35] résultat sous forme de tableau. Le tableau porte le nom de  "message"
    if (message[1]>=25) // On cible le second élément du tableau qui nous intéresse, c'est à dire le nombre de point en utilisant le nom du tableau [index], c'est la seconde valeur du tableau qui commence à 0 donc imessage[1]
    {
        // console.log('Vous avez perdu!'); //Le message s'affiche correctement dans la console mais pas encore dans le navigateur. Pour cela on va devoir faire appel à res.write qui nécessite un serveur
        var status = "Vous avez gagné !"; // On stocke dans une variable status le message à afficher dans le navigateur si gagné
    }

    else if (message[1]<25)
    {
        // console.log('Vous avez gagné !');//Le message s'affiche correctement dans la console mais pas encore dans le navigateur.
        var status = "Vous avez perdu !";// On stocke dans une variable status le message à afficher dans le navigateur si perdu
    }

    // On crée un serveur pour afficher sur le navigateur - affichage coté client
    var server = http.createServer(function(req, res) {
        res.write(status);//
        res.end(); // On finit la tâche on le place dans var server car à cet endroit res est connu puisque dans les paramètres de la fonction.
    });

    server.listen(8080);// on écoute le serveur sur le port 8080 en attente de l'évènement qui va déclencher la fonction callback
});



// On peut envoyer autant de paramètres que necessaire à la fonction callback
// jeu.emit('nouveaujoueur', 'Mario', 35); // Envoie le nom d'un nouveau joueur qui arrive et son score ou son âge
jeu.emit ('gameover', ['Mario',21]);// On emet un évènement dans notre code en faisant appel à emit() depuis l'objet basé sur EventEmitter.
