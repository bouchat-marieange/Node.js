// Ceci est le fichier serveur : c'est lui qui centralise et gère les connexions des différents clients connectés au site.

var http = require('http');
var fs = require('fs');// fs signifie "file system" et permet de travailler avec le systeme de fichiers sur votre ordinateur. Pour utiliser le module file system de Node.js, il faut l'inclure avec un require()

// Chargement du fichier index.html affiché au client
var server = http.createServer(function(req, res) {
    fs.readFile('./index.html', 'utf-8', function(error, content) { // Quand on ouvre le navigateur à l'adresse de l'appli, ici http://localhost:8080 - le fichier index.html est envoyé et chargé. Ce fichier html contient un code javascript qui va se connecter au serveur non pas en http mias via socket.io (donc généralement via les WebSockets généralement)
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end(content);
    });
});

// Ce code fait 2 choses :
// Il renvoie le fichier index.html quand un client demande à charger la page dans son navigateur.
// Il se prépare à recevoir des requêtes via socket.io. Ici, on s'attend à recevoir un seul type de message : la connexion. Lorsqu'on se connecte via socket.io, on logge ici l'information dans la console.


// Le client effectue donc 2 types de connexion:
//Connexion classique au serveur HTTP pour charger la page index.html
// Connexion "temps réel" pour ouvrir un tunnel via les WebSockets grâce à socket.io

// Chargement de socket.io
var io = require('socket.io').listen(server);

// Quand un client se connecte, on le note dans la console
// io.sockets.on('connection', function (socket) {
    //console.log('Un client est connecté !'); // Affichage du message "Un client est connecté" dans la console lorsque le processus de connexion client-serveur s'est bien passé


// Lorsqu'il détecte une connexion, le serveur envoie un message au client avec socket.emit() pour lui confirmer que la connexion à bien fonctionner. La fonction prend 2 paramètres (le type de message, ici "message" (nom choisi arbitrairement par le développeur) et le contenu du message 'Vous êtes bien connecté !')
//Si on veut envoyer plusieurs données différents avec notre message, il faut les regrouper sous forme d'objet comme ceci: socket.emit('message', { content: 'Vous êtes bien connecté !', importance: '1' });


io.sockets.on('connection', function (socket) {
        socket.emit('message', 'Vous êtes bien connecté !');// socket.emit() permet d'envoyer un message au client avec qui on est en train de discuter. Avec socket.broadcast.emit(), on envoie un broadcast, c'est à dire un message destiné à tous les autres client (excepté celui qui vient de sollicite le serveur). Par exemple on transmet le message reçu du client A à tout les autres clients actuellement connectés en même temps (comme c'est le cas dans une Chat)
        socket.broadcast.emit('message', 'Un autre client vient de se connecter !'); //On broadcast ce message à tous les autres clients connectés lors de la connexion d'un client. De cette manière toutes les autres clients connectés recevront une message leur indiquant "Un autre client vient de se connecter !"

// Dès que le serveur reçoit un signal de type "petit_nouveau" contenant le pseudo de l'utilisateur (que celui-ci a entrer dans fenêtre prompt) on le stocke en variable de session
socket.on('petit_nouveau', function(pseudo) {
    socket.pseudo = pseudo;// Stocker le pseudo du l'utilisateur n'est pas la meilleure c'est une bidouille pour débuter. Plus tard pour gérer les sessions il est préférable d'utiliser un middleware comme session.socket.io (https://www.npmjs.com/package/session.socket.io)
});


// Quand le serveur reçoit un signal de type "message" du client, il affiche dans la console: "PseudoDuClient me parle ! Il me dit : contenu du message"
        socket.on('message', function (message) {
        console.log(socket.pseudo + ' me parle ! Il me dit : ' + message); //Lorsque le serveur reçoit un message de type "message"( déclenché par l'appui sur le bouton embêter le serveur de la page index.html) il va afficher dans la console le pseudo de l'utilisateur qui a été stocké en variable de session dans socket.pseudo , un texte , le contenu du message. Le pseudo de l'utilisateur est récupérer à partir de la variable pseudo.socket de l'objet socket que l'on a créer plus haut.
        });
});

server.listen(8080);
