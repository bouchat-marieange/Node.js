var app = require('express')(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server),
    cookieParser = require('cookie-parser'),
    session = require('cookie-session'),
    bodyParser = require('body-parser'),
    todoliste = [], // stocke la todolist
    newtodo ='',
    ent = require('ent'), // Permet de bloquer les caractères HTML (sécurité équivalente à htmlentities en PHP)
    fs = require('fs');

/* On utilise les cookies, les sessions et les formulaires */
app.use(cookieParser())
.use(session({secret: 'todotopsecret'}))
.use(bodyParser())
// S'il n'y a pas de todolist dans la session,
//on en crée une vide sous forme d'array avant la suite et
//permet de récuperer la liste
.use(function(req, res, next){
    if (todoliste.length != 0) {
        req.session.todolist = [];
        req.session.todolist = todoliste;
    }else{
        req.session.todolist = [];
    }
    next();
})

/* On affiche la todolist et le formulaire */
.get('/todo', function(req, res) {

    res.render('todo.ejs', {todolist: todoliste,newtodo : newtodo});

})

/* On ajoute un élément à la todolist et le stoche dans newtodo*/
.post('/todo/ajouter/', function(req, res) {
    if (req.body.newtodo != '') {
        //req.session.todolist.push(req.body.newtodo);
        newtodo = req.body.newtodo;
        todoliste.push(newtodo);
        //req.body.newtodo = '';

    }
    res.redirect('/todo');
})

/* Supprime un élément de la todolist */
.get('/todo/supprimer/:id', function(req, res) {
    if (req.params.id != '') {
        req.session.todolist.splice(req.params.id, 1);
    }
    res.redirect('/todo');
})

/* On redirige vers la todolist si la page demandée n'est pas trouvée */
.use(function(req, res, next){
    res.redirect('/todo');
});


server.listen(8080);
/*on lance l'écoute sur la connexion d'un nouvel utilisateur*/
 io.sockets.on('connection', function (socket) {
                    console.log('client connecte');
                    // on envoie la tache à tout le mmonde

                       socket.broadcast.emit('newtodo',newtodo);

                });
