// Chargement des différents modules

var app = require('express')(); //Charge express . L'utilisation d'Express est recommandée mais n'est pas obligatoire.
var server = require('http').Server(app); // Création du serveur
var io = require('socket.io')(server);// Charge de socket.io
var session = require('cookie-session'); // Charge le middleware de sessions
var bodyParser = require('body-parser'); // Charge le middleware de gestion des paramètres
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var ent = require('ent'); //Charge module ent pour éviter échange JavaScript malicieux en échappant caractère HTML (sécurité équivalente à htmlentities en PHP)
var fs = require('fs'); // Charge module extension inclus dans la librairie nodejs (fs = file system). Permet de lire de façon asynchrone tout le contenu d'un fichier

//Définition des variables
// Variable globale contenant un tableau reprenant toutes les tâches de la todolist
var todolist = [];



// Définition des routes et des redirections
/* On affiche la todolist et le formulaire avec express en récupérant la vue todo.ejs. On attribue le nom de todolist au contenu de la variable todolist (tableau)*/
app.get('/todo', function(req, res) {
    res.render('todo.ejs', {todolist: todolist});
});

/* On redirige vers la todolist si la page demandée n'est pas trouvée */
app.use(function(req, res, next){
    res.redirect('/todo');
});



// Echanges serveur socket.io
io.on('connection', function(socket) {

    //On envoie tout de suite à l'utilisateur connecté la dernière version de la liste
    socket.emit('listeActuelle', todolist);

    //Quand un utilisateur ajoute une tâche à la liste
    socket.on('ajout', function(nouvelleTache) {
        nouvelleTache = ent.encode(nouvelleTache);
        todolist.push(nouvelleTache);
        socket.broadcast.emit('ajout', {nouvelleTache: nouvelleTache});
    });

    //Quand un utilisateur supprime une tâche de la liste
    socket.on('suppression', function(index){
        todolist.splice(index);
        io.sockets.emit('listeActuelle', todolist);
    });
});

server.listen(8080);
