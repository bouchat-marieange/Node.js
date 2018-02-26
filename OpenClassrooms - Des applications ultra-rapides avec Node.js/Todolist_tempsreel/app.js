// Chargement des différents modules

var app = require('express')(); //Charge express . L'utilisation d'Express est recommandée mais n'est pas obligatoire.
var server = require('http').createServer(app); // Création du serveur
var io = require('socket.io').listen(server);// Charge de socket.io
var session = require('cookie-session'); // Charge le middleware de sessions
var bodyParser = require('body-parser'); // Charge le middleware de gestion des paramètres
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var ent = require('ent'); //Charge module ent pour éviter échange JavaScript malicieux en échappant caractère HTML (sécurité équivalente à htmlentities en PHP)
var fs = require('fs'); // Charge module extension inclus dans la librairie nodejs (fs = file system). Permet de lire de façon asynchrone tout le contenu d'un fichier

/* On utilise les sessions */
app.use(session({secret: 'todotopsecret'}))


/* S'il n'y a pas de todolist dans la session,
on en crée une vide sous forme d'array avant la suite */
app.use(function(req, res, next){
    if (typeof(req.session.todolist) == 'undefined') {
        req.session.todolist = [];
    }
    next();
})


/* On affiche la todolist et le formulaire */
app.get('/todo', function(req, res) {
    res.render('todo.ejs', {todolist: req.session.todolist});
})

// Quand un client se connecte, il récupère la dernière Todolist connue du serveur
// Le serveur peut retenir la Todolist sous la forme d'un simple array qu'il gardera en mémoire.
// La persistence n'est pas demandée (inutile d'utiliser MySQL ou Mongodb)

io.sockets.on('connection', function (socket, pseudo) { //connection à socket.io

  // Dès qu'on nous donne un pseudo, on le stocke en variable de session et on informe les autres personnes
  socket.on('nouveau_client', function(pseudo) {
      pseudo = ent.encode(pseudo);// On utilise le module ent pour échapper tout les caractère html (on transforme ces caractère pour les rendre inoffensifs) du type < > etc... pour n'avoir qu'un contenu en pure texte
      socket.pseudo = pseudo;// On sauvegarde le pseudo dans une variable de session
      socket.broadcast.emit('nouveau_client', pseudo);// Le serveur envoi à tous les clients connectés un message de type nouveau_client qui contient le pseudo du client qui vient de se connecté (pseudo)
  });

  /* On ajoute un élément à la todolist */
  app.post('/todo/ajouter/', urlencodedParser, function(req, res) {
      if (req.body.newtodo != '') {
          req.session.todolist.push(req.body.newtodo);
      }
      res.redirect('/todo');
  })

  // Quand un client ajoute une tâche, celle-ci est immédiatment répercutée chez les autres clients




  /* Supprime un élément de la todolist */
  app.get('/todo/supprimer/:id', function(req, res) {
      if (req.params.id != '') {
          req.session.todolist.splice(req.params.id, 1);
      }
      res.redirect('/todo');
  })

  // Quand un client supprimer une tâche, celle-ci est immédiatment supprimée chez les autres clients



  /* On redirige vers la todolist si la page demandée n'est pas trouvée */
  app.use(function(req, res, next){
      res.redirect('/todo');
  })

});



server.listen(8080);
