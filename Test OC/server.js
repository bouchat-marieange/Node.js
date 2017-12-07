// var http = require('http');
//
// var server = http.createServer(function(req, res) {
//     res.writeHead(200, {"Content-Type": "text/html"});
//     res.end('<p>Voici un paragraphe <strong>HTML</strong> !</p>');
// });
// server.listen(8080);



// var http = require('http');
//
// var server = http.createServer(function(req, res) {
//     res.writeHead(200, {"Content-Type": "text/html"});
//     res.write('<!DOCTYPE html>'+
// '<html>'+
// '    <head>'+
// '        <meta charset="utf-8" />'+
// '        <title>Ma page Node.js !</title>'+
// '    </head>'+
// '    <body>'+
// '     	<p>Voici un paragraphe <strong>HTML</strong> !</p>'+
// '    </body>'+
// '</html>');
//     res.end();
// });
// server.listen(8080);



// var http = require('http');
// var url = require('url');
//
// var server = http.createServer(function(req, res) {
//     var page = url.parse(req.url).pathname;
//     console.log(page);
//     res.writeHead(200, {"Content-Type": "text/plain"});
//     res.write('Bien le bonjour');
//     res.end();
// });
// server.listen(8080);


var http = require('http');
var url = require('url'); //récupère la page demandée par le visiteur et les données qui transite par l'url comme les données de formulaires transmises par la methode GET par exemple

var server = http.createServer(function(req, res) {
    var page = url.parse(req.url).pathname; // On parse la requête du visiteur pour extraire le nom de la page demandée par le visiteur
    console.log(page);
    res.writeHead(200, {"Content-Type": "text/plain"});// On écrit l'en-tête de la réponse avec Node.js avec en paramètre le code de la réponse 200 qui signifie "ok pas d'erreur" et le type de données que le serveur va envoyer au client
    if (page == '/') { // Si la page est la racine du site soit la home http://localhost:8080/
        res.write('Vous êtes à l\'accueil, que puis-je pour vous ?');//Alors on affiche dans la page du navigateur à l'adresse http://localhost:8080/ le message qui est indiqué ici
    }
    else if (page == '/sous-sol') {// si la page demandée est http://localhost:8080/sous-sol
        res.write('Vous êtes dans la cave à vins, ces bouteilles sont à moi !');
    }
    else if (page == '/etage/1/chambre') { // si la page demandée est http://localhost:8080/etage/1/chambre
        res.write('Hé ho, c\'est privé ici !');
    }
    else {
        res.write('Erreur 404 -  La page que vous avez demandé n\'existe pas!'); // le cas par defaut correspond au cas où la page n'existe pas et donc à une erreur 404 - On affiche alors une message erreur 404 - page non trouvée dans la fenêtre du navigateur à l'intention de l'utilisateur
    }
    res.end();
});
server.listen(8080);
