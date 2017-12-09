var express = require('express'); //on demande l'inclusiion d'Express
var app = express(); // on crée un objet app en appelant la fonctionc express()
var morgan = require('morgan'); // Charge le middleware morgan pour logging

// On s'occupe du logging en premier car c'est ce qui va décider le contenu de la liste qui va s'afficher en fonction de l'utilisateur
app.use(morgan('combined')) // Active le middleware de logging
.use(express.static(__dirname + '/public')) // Indique que le dossier /public contient des fichiers statiques (middleware chargé de base)

// Le middleware de loggin renvoie la réponse? ou doit directement renvoyé la vue?
.use(function(req, res){ // Répond enfin
  res.send('Hello');
});

//Se charge du rendu visuel de la page avec le html (il faut pour cela récupérer l'utilisateur loggé) placé dans le fichier todoview.ejs
app.get('/public/:user', function(req, res) {
    res.render('todoview.ejs', {user: req.params.user});
});

app.listen(8080);
