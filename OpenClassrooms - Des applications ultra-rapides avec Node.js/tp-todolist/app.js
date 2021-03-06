var express = require('express'); //on demande l'inclusion d'Express, le framework Node.js qui permet de réaliser des applications plus facilement. Ne pas oublier d'installer express dans le dossier de travail avec la commande npm install express (cela créer un dossier node_modules qui contient les fichiers du framework dans le dossier de travail)
var session = require ('cookie-session'); // Charge le middleware de sessions. On demande l'inclusion du module cookie-session préalablement installé avec npm install cookie-session
var bodyParser = require ('body-parser'); // Charge le middleware de gestion des paramètres. On demande l'inclusion du module body-parser qui va nous permettre de récupérer les infos transmise avec la méthode poste à partir du formulaire d'ajout de tâches dans la todolist.
var urlencodedParser = bodyParser.urlencoded({ extended: false }); // on utilise middleware bodyParser qui utiiser avec l'option bodyParser.urlendocded, qui analyse les urlencoded et récupère les content-type header d'un certain type. Le infos sur récupéré dans un objet req.body qui contient des paire de clé-valeur. La valeur peut être une chaine ou un tableau (when extended is false) ou un autre type (when extended is true)


var app = express(); // on crée un objet app en appelant la fonctionc express()


// On commence par mettre en place le systeme de session
// Avec le module cookie-session, on va mettre un place un système de session pour notre application
// Ce module middleware stocke les données de session sur le client (et non sur le serveur) dans un cookie
// cookie-session ne nécessite aucune base de données / ressources côté serveur, bien que les données de session totales ne puissent pas dépasser la taille maximale des cookies du navigateur.
// Ce middleware va attacher la propriété `session` à `req`, qui fournit un objet représentant la session chargée
// Cette session est soit une nouvelle session si aucune session valide n'a été fournie dans la requête , soit une session chargée à partir de la requête.
//le paramètre ´secret´ envoyé au module de session est obligatoire, il permet de sécuriser les cookies de session. Envoyer la valeur de votre choix. D'autres options peuvent être envoyée comme la durée de vie du cookie de session (par défaut, la session durera tant que le navigateur restera ouvert) - cfr documentation : https://www.npmjs.com/package/cookie-session
app.use(session({secret: 'todotopsecret'}))


// La liste des tâches est stockée dans un array (tableau). Comme JavaScript n'apprécie pas qu'on essaie de parcourir des arrays qui n'existent pas,
//On va créer un middleware qui crée automatiquement un array (tableau) vide si le visiteur n'a pas de todolist (parce qu'il vient de commencer sa session par exemple)
// Cette fonction middleware recoit la requête, la réponse et la prochaine fonction à exécuter. Ce middle ware que j'ai crée à une fonction toute simple, celle de vérifier qu'il y a une todolist dans la session et si ce n'est pas le cas, il crée un arrya vide [].Cela évite pas mal d'erreurs par la suite.
// La création d'un middleware est le seul moyen à ma disposition pour exécuter des fonctionnalités avant le chargement de n'importe quelle page.
// Et pour que le middleware "passe le bébé à son voisin", je dois définir impérativement par un appel à next() (la fonction suivante). Dans le cas présent, next() fait référence à .get('/todo',function(){})
.use(function(req, res, next){
    if (typeof(req.session.todolist) == 'undefined') { // Si pas encore de session et donc pas de tableau todolist à parcourir, alors on crée un tableau todolist vide todolist = []; que l'on stocke dans la session
        req.session.todolist = [];// On
    }
    next();
})

// On écrit les différentes routes qui corresponde chacune à une des tâches que l'application doit pouvoir réaliser
// Route 1 : l'application doit pouvoir lister les tâches - On affiche la todolist et le formulaire
.get('/todo', function(req, res) {
    res.render('todo.ejs', {todolist: req.session.todolist});
})

// Route 2 : l'application doit pouvoir ajouter des tâches - On ajoute un élément à la todolist
// Attention .post() et pas .get() . Les données de formulaire se transmette généralement avec la méthode post et pas get. On fait donc appel à .post() pour ajouter des tâches au lieu de faire appel à .get()
.post('/todo/ajouter/', urlencodedParser, function(req, res) {
    if (req.body.newtodo != '') {//les requêtes entrantes sont récupérée à partir de données transmise par la methode post par le middleware body-parser dans ma proproété appelé req.body (cfr doc: https://www.npmjs.com/package/body-parser)
        req.session.todolist.push(req.body.newtodo); // On ajoute des éléments à la fin du tableau déja stocké dans la session de l'utilisateur avec la méthode push() qui permet d'ajouter une ou plusieurs entrée à la fin d'un tableau et retourne la nouvelle taille du tableau. Cette méthode prend en paramètre les éléments à ajouter au tableau, c'est à dire la tache récupérée par la méthode post à partir du formulaire grâce au middleware body-parser
    }
    res.redirect('/todo');
})

// Route 3 : l'application doit pouvoir supprimer des tâche en fonction de leur n°d'ID
.get('/todo/supprimer/:id', function(req, res) {
    if (req.params.id != '') { // Si on le paramètre id récupérée dans l'url n'est pas vide, alors effectuer le code qui suit
        req.session.todolist.splice(req.params.id, 1); //suppression d'éléments du tableau avec .splice.
        //La methode splice() supprime un ou plusieurs éléments du tableau.
        //Elle prend en premier argument l'index à partir duquel on commence la suppression et en deuxième argument le nombre d'éléments à supprimer.
        //Après cette opération, elle réindexe les éléments du tableau, ce qui n'est pas le cas de la méthode delete qui supprime les éléments du tableau mais ne le restructure pas après et laisse de mot clé undefined à la place des élément supprimé, indiquant que cet élément supprimé est à présent non défini.
        //Il est donc préférable dans ce cas d'utiliser la méthode slice()
    }
    res.redirect('/todo');//redirige le visiteur vers la liste (/todo) après un ajout ou une suppression d'élément, avec res.redirect('/todo')
})


/* On redirige vers la todolist si la page demandée n'est pas trouvée */
.use(function(req, res, next){
    res.redirect('/todo');
})

app.listen(8080);
