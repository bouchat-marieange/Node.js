var app = require('express')(),  // On inclus le module framework express pour gérer plus facilement les routes (url). On peut aussi l'écrire en deux lignes var express = require('express'); var app = express(),
server = require('http').createServer(app), // On crée le serveur avec http
io = require('socket.io').listen(server), // On inclus le module socket.io pour permettre la communication synchrone indispensable dans une application de chat
ent = require('ent'), // On inclus le module ent qui permet de bloquer les caractères HTML (sécurité équivalente à htmlentities en PHP) - transforme le HTML en entité pour éviter que les utilisateurs puissent s'envoyer du code javascript dans les messages
fs = require('fs');// On inclus le module fs (inutile de d'installer ce module il fait partie comme http etc ... du core de node.js)fs signifie "file system" et permet de travailler avec le systeme de fichiers sur votre ordinateur. Pour utiliser le module file system de Node.js, il faut l'inclure avec un require()

// L'application doit renvoyer la page web index.html à vos visiteurs lorsqu'ils se connectent sur le site (lorsqu'on appellera le serveur)
// Chargement de la page index.html visible à l'adresse http://localhost:8080
// Pour charger une page avec ExpressJS et Node.js, il faut utiliser res.sendFile() la syntaxe res.sendfile() est devenue obsolète (on ne peut donc plus se contenter d'écrire res.sendfile(__dirname + '/index.html');) et nécessite d'ajouter une ligne en début de fichier var path : require ('path'); (https://scotch.io/tutorials/use-expressjs-to-deliver-html-files)
// Pour utiliser res.sendFile, nous devons transmettre un chemin au fichier. Nous devrons également insérer le module de chemin intégré afin que nous puissions lier le fichier. On doit alors aussi inclure en début de fichier la ligne suivante // var path = require('path');// On inclus le module de chemin intégré au core de Node (pas d'installation nécessaire avec npm) afin que nous puissions lier le fichier.
// Ce qui donnera un code du type:
    // app.get('/', function(req, res) {
    //     res.sendFile(path.join(__dirname + '/index.html'));// attention avant le dirname il s'agit de deux fois le signe _ (underscore)
    // });

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

// On établit une connexion avec sockets.io, La fonction callback prend deux paramètre socket et pseudo qui est la variable dans laquelle a été récupéré le pseudo que l'utilisateur a entrer dans la fenêtre prompt (cfr index.hmtl)
io.sockets.on('connection', function (socket, pseudo) {
    // Dès qu'on nous donne un pseudo, on le stocke en variable de session et on informe les autres personnes
    socket.on('nouveau_client', function(pseudo) {
        pseudo = ent.encode(pseudo);//on stocke le pseudo après l'avoir filtrer avec le module ent qui évite que l'utilisateur n'entre du javascript au lieu de simple texte
        socket.pseudo = pseudo;// // Stocker le pseudo du l'utilisateur n'est pas la meilleure c'est une bidouille pour débuter. Plus tard pour gérer les sessions il est préférable d'utiliser un middleware comme session.socket.io (https://www.npmjs.com/package/session.socket.io)
        socket.broadcast.emit('nouveau_client', pseudo);// on broadcast (envoie à tout les autres utilisateurs connectés au chat) un message de type nouveau_client contenant le pseudo que vient d'entrer le nouvel utilisateur . Le message (cfr index.html)sera "PseudoDeUtilisateur a rejoint le Chat !"
    });

    // Dès qu'on reçoit un message, on récupère le pseudo de son auteur et on le transmet aux autres personnes
    socket.on('message', function (message) {
        message = ent.encode(message); // on filtre le message avec ent pour éviter l'envoi de javascript entre utilisateur poour des raisons de sécurité
        socket.broadcast.emit('message', {pseudo: socket.pseudo, message: message}); // On envoie au client et donc à la page index.html pour que cela s'affiche sur la page pseudo: pseudostockéensessionutilisateur, suivi de message: "contenu du message entré par l'utilisateur dans le champ du formulaire et stocké dans la variable message"
    });
});

server.listen(8080);
