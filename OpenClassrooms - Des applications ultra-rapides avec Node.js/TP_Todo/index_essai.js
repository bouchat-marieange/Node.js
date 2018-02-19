var express = require('express');// On inclus express
var session = require('cookie-session'); // Charge le middleware de sessions
var bodyParser = require('body-parser'); // Charge le middleware de gestion des paramètres. ody-parser pour récupérer les données du formulaire d'ajout de tâches
var urlencodedParser = bodyParser.urlencoded({ extended: false });

var app = express();

/* On utilise les sessions */
app.use(session({secret: 'todotopsecret'}))

// La liste des tâches est stockée dans un array (tableau). Comme javascript n'apprécie pas qu'on essaie de parcourir des arrays qui n'existent pas (comme c'est le cas au début d'une session quand la liste est encore vide),
// Pour résoudre ce problème, on créer un middleware qui crée un array vide si le visiteur n'a pas de todolist.
// La création d'un middleware est le seule moyen d'exécuter des fonctionnalités avant le chargement  de la page.
// Pour que le middleware passe l'info à la fonction qui suit, il ne faut pas oublier de faire appel à la fonciton suivante avece next() c'est à dire à .get('/todo', fucntion({})
// S'il n'y a pas de todolist dans la session, on en crée une vide sous forme d'array (un array vide []) avant la suite */
.use(function(req, res, next){
    if (typeof(req.session.todolist) == 'undefined') {//Si il n'y a pas de todolist dans la session
        req.session.todolist = []; // Alors on crée un array vide.
    }
    next();
})

/* On affiche la todolist et le formulaire */
.get('/todo', function(req, res) {
    res.render('todo.ejs', {todolist: req.session.todolist});
    // On affiche la page avec le templat todo.ejs qui se trouve dans le dossier views
    // On récupère la todolist existante dans la session avec req.session.todolist que l'on stocke sous le nom de todolist
})

/* On ajoute un élément à la todolist */
.post('/todo/ajouter/', urlencodedParser, function(req, res) {
    if (req.body.newtodo != '') { // Si la requête newtodo (nouvelle tâche) est différente de rien, donc si il y a une nouvelle tâche encodée et envoyée par le formulaire
        req.session.todolist.push(req.body.newtodo); // Avec push, on ajoute un elément à la fin du tableau dans la session à la fin de la todolist, de la liste des tâches (push)
    }
    res.redirect('/todo'); // Ensuite on redirige vers la page d'accueil qui affiche la liste et le formulaire
})

/* Supprime un élément de la todolist */
.get('/todo/supprimer/:id', function(req, res) {
    if (req.params.id != '') {// Si le paramètre id transmis dans l'url n'est pas vide, donc si un id est transmis dans l'url
        req.session.todolist.splice(req.params.id, 1); // Avec splice on retire un élément du tableau stocké en session, mais pas n'importe lequel. Celui dont l'id correspond à celui que l'on a récupérer dans l'url, ici 1 (soit la deuxième de la liste car tableau commence à 0)
    }
    res.redirect('/todo'); // Ensuite on redirige vers la page d'accueil qui affiche la liste et le formulaire
})

/* On redirige vers la todolist si la page demandée n'est pas trouvée */
.use(function(req, res, next){
  res.redirect('/todo');
})

.listen(8080);
