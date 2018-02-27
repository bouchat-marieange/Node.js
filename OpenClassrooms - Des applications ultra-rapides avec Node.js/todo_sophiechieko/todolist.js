const express = require("express");
const session = require("cookie-session");
const bodyParser = require ("body-parser");
const app = express(); //Utilisation de Express.js
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const http = require('http'); //Création d'un objet http malgré tout pour utiliser socket.io avec Express.js
const server = http.createServer(app);
const io = require("socket.io").listen(server);
const ent = require('ent');
const fs = require('fs');

var todolist = ["Repasser le linge"];

/*Routes*/
app.get("/", function(req, res){
    res.render("todolist.ejs", {todolist: todolist});
});

app.use(function(req, res, next){
    res.redirect("/");
});



//Les échanges avec socket.io
io.sockets.on('connection', function(socket) {

    //On envoie tout de suite à l'utilisateur connecté la dernière version de la liste
    socket.emit('listeActuelle', todolist);

    //Quand un utilisateur ajoute une tâche à la liste
    socket.on('ajout', function(nouvelleTache) {
        nouvelleTache = ent.encode(nouvelleTache);
        todolist.push(nouvelleTache);
        socket.broadcast.emit('ajout', {nouvelleTache: nouvelleTache});
    });

    //Quand un utilisateur supprime une tâche de la liste
    socket.on('suppression', function(index){
        todolist.splice(index);
        io.sockets.emit('listeACtuelle', todolist);
    });

});

server.listen(8081);
