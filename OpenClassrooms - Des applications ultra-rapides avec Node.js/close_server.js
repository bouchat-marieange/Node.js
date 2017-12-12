var http = require('http');

var server = http.createServer(function(req, res) {
  res.writeHead(200); // si le serveur à répondu correctement, on l'indique avec le code 200 //res.writeHead : écoute la réponse du serveur et fait une action en conséquence - On idt ce qu'on va faire
  res.end('Salut tout le monde !'); //res.end met fin au processus de réponse // On écrit dedans
});

server.on('close', function() { // On écoute l'évènement close
    console.log('Bye bye !');
})

server.listen(8080); // Démarre le serveur

server.close(); // Arrête le serveur. Déclenche l'évènement close
