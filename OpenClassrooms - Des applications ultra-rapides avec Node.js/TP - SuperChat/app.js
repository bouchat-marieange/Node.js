// Appels aux différents modules (on ne met pas var devant chacun et on utilise un écritue abrégée quand c'est possible)

var app = require('express')(), //Ecriture abrégée qui peut également s'écrire en 2 ligne: va app = require('express') suivi de var app = express() la seconde ligne est remplacé par () à la fin de la ligne ce qui revient au même. Voir doc: https://www.npmjs.com/package/express
    server = require('http').createServer(app),// Ecriture abrégée qui habituellement s'écrit var=require('http'); suivi de var server = http.createServer((req, res)){}
    io = require('socket.io').listen(server),// // Chargement de socket.io
    ent = require('ent'), // Permet de bloquer les caractères HTML (sécurité équivalente à htmlentities en PHP). Evite aux visiteurs de pouvoir échanger du code JavaScript malicieux dans le Chat (sécurité)
    fs = require('fs'); // module extension inclus dans la librairie nodejs (fs = file system). Permet de lire de façon asynchrone tout le contenu d'un fichier

// Chargement de la page index.html - gestion des routes avec express. Voir doc: https://www.npmjs.com/package/express
app.get('/', function (req, res) {// '/' renvoie à l'index.html
  res.sendFile(__dirname + '/index.html'); // Renvoie le fichier index.html qui contient à la fois header de la page donc inutile res.setHeader et le contenu (sendfile car il s'agit d'un fichier) qui se trouve dans le dossier projet(dirname)/.index.htm. Bref renvoie index.html qui se trouve à la racine du dossier du projet. Voir doc: http://expressjs.com/en/api.html#res.sendFile
});

//Gestion des messages en temps réel avec socket.io. 2 types de message: nouveaux_client et message
// message type nouveau_client : envoyé par un nouveau client qui vient de charger la page. Il contient son pseudo en paramètre.Encoder avec ent.encode par sécurité et sauvegardé ce pseudo dans une variable de session.
io.sockets.on('connection', function (socket, pseudo) {
    // Dès qu'on nous donne un pseudo, on le stocke en variable de session et on informe les autres personnes
    socket.on('nouveau_client', function(pseudo) {
        pseudo = ent.encode(pseudo);// On utilise le module ent pour échapper tout les caractère html (on transforme ces caractère pour les rendre inoffensifs) du type < > etc... pour n'avoir qu'un contenu en pure texte
        socket.pseudo = pseudo;// On sauvegarde le pseudo dans une variable de session
        socket.broadcast.emit('nouveau_client', pseudo);// Le serveur envoi à tous les clients connectés un message de type nouveau_client qui contient le pseudo du client qui vient de se connecté (pseudo)
    });

    // Dès qu'on reçoit un message, on récupère le pseudo de son auteur et on le transmet aux autres personnes
    // message de type message: envoyé par un client qui veut transmettre un message aux autres personnes connectée
    // On encode d'abord le message avec ent.encode pour la sécurité et on le broadcast avec le pseudi issus de la variable de session.
    // Pour envoyer plusieurs données dans une seul paramètre, je les encapsule dans un objet JavaScript, d'où le code {pseudo: socket.pseudo, message: message}
    socket.on('message', function (message) { // Quand on recoit un message du type "message"
        message = ent.encode(message); // On utilise le module ent pour échapper tous les caractères html pour obtenir du texte brut
        socket.broadcast.emit('message', {pseudo: socket.pseudo, message: message});// Le serveur envoie à tous les clients connecté un message de type "message". Le pseudo sera celui récupéré dans la variable de session pseudo: socket.pseudo, et le message sera celui qui a été sécurisé auparavant avec le module ent.
    });
});

server.listen(8080);
