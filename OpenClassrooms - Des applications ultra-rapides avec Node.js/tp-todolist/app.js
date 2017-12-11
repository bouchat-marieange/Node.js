var express = require('express'); //on demande l'inclusion d'Express
var session = require ('cookie-session'); // Charge le middleware de sessions. On demande l'inclusion du module cookie-session préalablement installé avec npm install cookie-session
var bodyParser = require ('body-parser'); // Charge le middleware de gestion des paramètres. On demande l'inclusion du module body-parser qui va nous permettre de récupérer les infos transmise avec la méthode poste à partir du formulaire d'ajout de tâches dans la todolist.
// var morgan = require('morgan'); // Charge le middleware morgan pour logging

var app = express(); // on crée un objet app en appelant la fonctionc express()


// On commencen par mettre en place le systeme de session
// Avec le module cookie-session, on va mettre un place un système de session pour notre application
// Ce middleware var attacher la propriété `session` à `req`, qui fournit un objet représentant la session chargée
// Cette session est soit une nouvelle session si aucune session valide n'a été fournie dans la requête , soit une session chargée à partir de la requête.
app.use (session ({
  secret: 'todotopsecret',//le paramètre ´secret´ envoyé au module de session est obligatoire, il permet de sécuriser les cookies de session. Envoyer la valeur de votre choix. D'autres options peuvent être envoyée comme la durée de vie du cookie de session (par défaut, la session durera tant que le navigateur restera ouvert) - cfr documentation : https://www.npmjs.com/package/cookie-session
}))


// On écrit les différentes routes qui corresponde chacune à une des tâches que l'application doit pouvoir réaliser
// Route 1 : l'application doit pouvoir lister les tâches
.get('/todo', function(req, res) {

});

// Route 2 : l'application doit pouvoir ajouter des tâches
// Attention .post() et pas .get() . Les données de formulaire se transmette généralement avec la méthode post et pas get. On fait donc appel à .post() pour ajouter des tâches au lieu de faire appel à .get()
.post('/todo/ajouter', function(req, res) {

});

// Route 3 : l'application doit pouvoir supprimer des tâche en fonction de leur n°d'ID
.get('/todo/supprimer/:id', function(req, res) {

});


// // On s'occupe du logging en premier car c'est ce qui va décider le contenu de la liste qui va s'afficher en fonction de l'utilisateur
// app.use(morgan('combined')) // Active le middleware de logging
// .use(express.static(__dirname + '/public')) // Indique que le dossier /public contient des fichiers statiques (middleware chargé de base)
//
// // Le middleware de loggin renvoie la réponse? ou doit directement renvoyé la vue?
// .use(function(req, res){ // Répond enfin
//   res.send('Hello');
// });
//
// //Se charge du rendu visuel de la page avec module ejs avec le html (il faut pour cela récupérer l'utilisateur loggé) placé dans le fichier todoview.ejs
// app.get('/public/:user', function(req, res) {
//     res.render('todoview.ejs', {utilisateur: req.params.user});
// });
//
// app.listen(8080);
