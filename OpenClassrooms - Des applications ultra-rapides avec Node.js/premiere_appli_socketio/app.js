// Ceci est le fichier serveur : c'est lui qui centralise et gère les connexions des différents clients connectés au site.

var http = require('http');
var fs = require('fs');

// Chargement du fichier index.html affiché au client
var server = http.createServer(function(req, res) {
    fs.readFile('./index.html', 'utf-8', function(error, content) {
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end(content);
    });
});

// Chargement de socket.io
var io = require('socket.io').listen(server);

// Quand un client se connecte, on le note dans la console
io.sockets.on('connection', function (socket) {
    console.log('Un client est connecté !');
});

// Lorsqu'on détecte une connexion, on émet un message au client avec socket.emit(). La fonction prend 2 paramètres (le type de message, ici "message" et le contenu du message)
io.sockets.on('connection', function (socket) {
        socket.emit('message', 'Vous êtes bien connecté !');
});

server.listen(8080);
