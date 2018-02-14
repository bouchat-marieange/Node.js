//Code minimal pour la création d'un serveur qui affiche "Salut tout le monde ! " lorsque l'on lance le fichier dans le terminal avec la commande node nomFichier.js (node serveur.js) et que l'on va ensuite voir le résultat dans notre navigateur à l'adresse  http://localhost:8080

var http = require('http');

var server = http.createServer(function(req, res) {
  res.writeHead(200);
  res.end('Salut tout le monde !');
});
server.listen(8080);
