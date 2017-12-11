var express = require('express'); //on demande l'inclusion d'Express, le framework Node.js qui permet de réaliser des applications plus facilement. Ne pas oublier d'installer express dans le dossier de travail avec la commande npm install express (cela créer un dossier node_modules qui contient les fichiers du framework dans le dossier de travail)
var session = require ('cookie-session'); // Charge le middleware de sessions. On demande l'inclusion du module cookie-session préalablement installé avec npm install cookie-session
var bodyParser = require ('body-parser'); // Charge le middleware de gestion des paramètres. On demande l'inclusion du module body-parser qui va nous permettre de récupérer les infos transmise avec la méthode poste à partir du formulaire d'ajout de tâches dans la todolist.
var urlencodedParser = bodyParser.urlencoded({ extended: false }); // on utilise middleware bodyParser qui utiiser avec l'option bodyParser.urlendocded, qui analyse les urlencoded et récupère les content-type header d'un certain type. Le infos sur récupéré dans un objet req.body qui contient des paire de clé-valeur. La valeur peut être une chaine ou un tableau (when extended is false) ou un autre type (when extended is true)


var app = express(); // on crée un objet app en appelant la fonctionc express()


// On commencen par mettre en place le systeme de session
// Avec le module cookie-session, on va mettre un place un système de session pour notre application
// Ce module middleware stocke les données de session sur le client (et non sur le serveur) dans un cookie
// cookie-session ne nécessite aucune base de données / ressources côté serveur, bien que les données de session totales ne puissent pas dépasser la taille maximale des cookies du navigateur.
// Ce middleware va attacher la propriété `session` à `req`, qui fournit un objet représentant la session chargée
// Cette session est soit une nouvelle session si aucune session valide n'a été fournie dans la requête , soit une session chargée à partir de la requête.
//le paramètre ´secret´ envoyé au module de session est obligatoire, il permet de sécuriser les cookies de session. Envoyer la valeur de votre choix. D'autres options peuvent être envoyée comme la durée de vie du cookie de session (par défaut, la session durera tant que le navigateur restera ouvert) - cfr documentation : https://www.npmjs.com/package/cookie-session
app.use(session({secret: 'todotopsecret'}))


// La liste des tâches est stockée dans un array (tableau). Comme JavaScript n'apprécie pas qu'on essaie de parcourir des arrays qui n'existent pas,
//On va créer un middleware qui crée automatiquement un array (tableau) vide si le visiteur n'a pas de todolist (parce qu'il vient de commencer sa session par exemple)
.use(function(req, res, next){
    if (typeof(req.session.todolist) == 'undefined') {
        req.session.todolist = [];
    }
    next();
})

// On écrit les différentes routes qui corresponde chacune à une des tâches que l'application doit pouvoir réaliser
// Route 1 : l'application doit pouvoir lister les tâches
.get('/todo', function(req, res) {
    res.render('todo.ejs', {todolist: req.session.todolist});
})

// Route 2 : l'application doit pouvoir ajouter des tâches
// Attention .post() et pas .get() . Les données de formulaire se transmette généralement avec la méthode post et pas get. On fait donc appel à .post() pour ajouter des tâches au lieu de faire appel à .get()
.post('/todo/ajouter/', urlencodedParser, function(req, res) {
    if (req.body.newtodo != '') {
        req.session.todolist.push(req.body.newtodo);
    }
    res.redirect('/todo');
})

// Route 3 : l'application doit pouvoir supprimer des tâche en fonction de leur n°d'ID
.get('/todo/supprimer/:id', function(req, res) {
    if (req.params.id != '') {
        req.session.todolist.splice(req.params.id, 1);
    }
    res.redirect('/todo');
})


/* On redirige vers la todolist si la page demandée n'est pas trouvée */
.use(function(req, res, next){
    res.redirect('/todo');
})

app.listen(8080);

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
