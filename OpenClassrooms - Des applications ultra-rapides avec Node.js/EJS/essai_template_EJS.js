var express = require('express');//On inclus Express
var app = express();//on crée un objet app en appellant la fonction express()


// On indique ensuite les différentes routes
// Lorsque l'on quelqu'un demande une route, une fonction callback est appelée

// La route / correspond à la racine et donc à l'accueil du suite ou en local à l'adresse localhost:8080
app.get('/', function(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.end('Vous êtes à l\'accueil');
});

// La route /sous-sol correspond à une sous page ou en local à l'adresse localhost:8080/sous-sol/
app.get('/sous-sol', function(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.end('Vous êtes dans la cave à vins, ces bouteilles sont à moi !');
});

// La route /etage/1/chambre correspond à une sous-sous-sous-page ou en local à l'adresse localhost:8080/etage/1/chambre/
// app.get('/etage/:etagenum/chambre', function(req, res) {
//     res.setHeader('Content-Type', 'text/plain');
//     res.end('Vous êtes à la chambre de l\'étage n°' + req.params.etagenum);
// });

//On modifie le code dynamique qui gérait la route pour utiliser un template ejs et on ajoute un res.render qui fait référence à une views qui permettra d'afficher la page. La view doit se trouver dans un dossier views dans le dossier projet, ici elle porte le nom chambre.ejs
// L'affichage de la page en html est maintenant gérer par EJS grâce au fichier chambre.ejs situé dans le dossier views qui permet d'afficher de l'HTML et des données mélangées et de les mettre en forme facilement.
// Maintenant lorsque l'on affiche la page http://localhost:8080/etage/2/chambre par exemple, on peut voir qu'elle est mise en forme et récupère correctement les infos du numéro d'étage transmise en Get dans l'url
app.get('/etage/:etagenum/chambre', function(req, res) {
    res.render('chambre.ejs', {etage: req.params.etagenum});
});


// Code permettant de gérer les erreurs 404 à inclure à la fin du code obligatoirement juste avant app.listen
app.use(function(req, res, next){
    res.setHeader('Content-Type', 'text/plain');
    res.send(404, 'Page introuvable !');
});

app.listen(8080);
