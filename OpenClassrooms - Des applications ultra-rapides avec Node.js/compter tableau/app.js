var express = require('express'); //on demande l'inclusiion d'Express

var app = express(); // on crée un objet app en appelant la fonctionc express()


app.get('/compter/:nombre', function(req, res) {
    var noms = ['Robert', 'Jacques', 'David'];
    res.render('page.ejs', {compteur: req.params.nombre, noms: noms});
});

app.listen(8080);
