var http = require('http');// module extension inclus dans la librairie nodejs pour créer un serveur (doc: https://www.w3schools.com/nodejs/nodejs_http.asp)
var fs = require('fs'); // module extension inclus dans la librairie nodejs (fs = file system). Permet de lire de façon asynchrone tout le contenu d'un fichier

// Chargement du fichier index.html et affichage du fichier index.html au client avec fs.readFile
// usage de fs.readfile (documentation: https://nodejs.org/api/fs.html#fs_fs_readfile_path_options_callback)
var server = http.createServer(function(req, res) {
    fs.readFile('./index.html', 'utf-8', function(error, content) {
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end(content);
    });
});

// Chargement de socket.io
var io = require('socket.io').listen(server);


io.sockets.on('connection', function (socket, pseudo) {
    // Quand un client se connecte, on lui envoie un message
    socket.emit('message', 'Vous êtes bien connecté !');
    // On signale aux autres clients qu'il y a un nouveau venu
    socket.broadcast.emit('message', 'Un autre client vient de se connecter ! ');

    // Dès qu'on nous donne un pseudo, on le stocke en variable de session
    socket.on('petit_nouveau', function(pseudo) {
        socket.pseudo = pseudo;
    });

    // Dès qu'on reçoit un "message" (clic sur le bouton), on le note dans la console
    socket.on('message', function (message) {
        // On récupère le pseudo de celui qui a cliqué dans les variables de session
        console.log(socket.pseudo + ' me parle ! Il me dit : ' + message);
    });
});

server.listen(8080);
