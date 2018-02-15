// var express = require('express');//On inclus Express
// var app = express();//on crée un objet app en appellant la fonction express()
//
//
// // On indique ensuite les différentes routes
// // Lorsque l'on quelqu'un demande une route, une fonction callback est appelée
//
// // La route / correspond à la racine et donc à l'accueil du suite ou en local à l'adresse localhost:8080
// app.get('/', function(req, res) {
//     res.setHeader('Content-Type', 'text/plain');
//     res.end('Vous êtes à l\'accueil');
// });
//
// // La route /sous-sol correspond à une sous page ou en local à l'adresse localhost:8080/sous-sol/
// app.get('/sous-sol', function(req, res) {
//     res.setHeader('Content-Type', 'text/plain');
//     res.end('Vous êtes dans la cave à vins, ces bouteilles sont à moi !');
// });
//
// // La route /etage/1/chambre correspond à une sous-sous-sous-page ou en local à l'adresse localhost:8080/etage/1/chambre/
// app.get('/etage/1/chambre', function(req, res) {
//     res.setHeader('Content-Type', 'text/plain');
//     res.end('Hé ho, c\'est privé ici !');
// });
//
// // Code permettant de gérer les erreurs 404 à inclure à la fin du code obligatoirement juste avant app.listen
// app.use(function(req, res, next){
//     res.setHeader('Content-Type', 'text/plain');
//     res.send(404, 'Page introuvable !');
// });
//
// app.listen(8080);





//Ce code permet également de tester si le paramètre du numéro d'étage est bien un numéro
// Si l'étage envoyé en get est bien un numéro, la page affiche "Vous êtes à la chambre de l'étage n°(numéro de l'étage transmis en get)"
// Si l'étage envoyé en get n'est pas un numéro, la page affiche , "Erreur 4040 - Pas un numéro etage"
// Si la page demandée en get n'existe pas, la page affiche, "Erreur 404 - Page introuvable"

var express = require('express'); //on demande l'inclusiion d'Express

var app = express(); // on crée un objet app en appelant la fonctionc express()

// Je crée une seule route pour commencer vers le repertoire racine "/" avec une fonction callback qui est appellée quand quelqu'un demande cette route et indique "Vous êtes à l'accueil"
app.get('/', function(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.end('Vous êtes à l\'accueil');
});

//On peut ensuite ajouter autant de routes (adresse URL) qu'on le souhaite par exemple (http://localhost:8080/sous-sol)
app.get('/sous-sol', function(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.end('Vous êtes dans la cave à vins, ces bouteilles sont à moi !');
});

//Pour le cas ou les étages sont transmis en get (ex: route URL http://localhost:8080/etage/1/chambre), j'utilise un systeme pour récupérer les routes dynamiques (le numéro d'étage varie et est récupérer) et en plus je teste si la variable correspondant à l'étage est bien un nombre, si ce n'est pas le cas je redirige vers page 404, si c'est bien un nombre j'affiche la page correspondante avec l'étage transmis en Get
app.get('/etage/:etagenum/chambre', function(req, res)
{
    res.setHeader('Content-Type', 'text/plain');
    if (isNaN(req.params.etagenum) == true)
    // On utilise la fonction javascript navitve isNAN() qui prend en paramètre la valeur à tester pour vérifier si la valeur en question est un nombre ou non. isNaN signifie "is not a Number", donc si l'étage renvoyé n'est pas un nombre (isNaN==true), alors on affiche la page 404 sinon (else) on affiche la page correxpondante à l'étage transmise en GET dans l'URL
    {
    // app.use(function(req, res, next){ // gestion particulière par les erreurs 404 - la page demandée n'existe aps
        res.setHeader('Content-Type', 'text/plain');
        res.status(404).send('Erreur 404- Pas un numero etage !');
    // });
    }
  else{
      res.setHeader('Content-Type', 'text/plain');
      res.end('Vous êtes à la chambre de l\'étage n°' + req.params.etagenum);
    }
});

// gestion des erreurs 404 - la page demandée n'existe pas
app.use(function(req, res, next){
    res.setHeader('Content-Type', 'text/plain');
    res.status(404).send('Erreur 404- Page introuvable !');
});

app.listen(8080);
