var express = require('express');//On inclus Express
var app = express();//on crée un objet app en appellant la fonction express()

app.get('/compter/:nombre', function(req, res) {
    var noms = ['Robert', 'Jacques', 'David'];
    res.render('template.ejs', {compteur: req.params.nombre, noms: noms});
});

// Code permettant de gérer les erreurs 404 à inclure à la fin du code obligatoirement juste avant app.listen
app.use(function(req, res, next){
    res.setHeader('Content-Type', 'text/plain');
    res.send(404, 'Page introuvable !');
});

app.listen(8080);
