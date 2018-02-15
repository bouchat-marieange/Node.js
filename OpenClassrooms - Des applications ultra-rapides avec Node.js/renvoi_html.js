// Code html basique mais non valide (manque doctype, body etc...)
// var http = require('http');
//
// var server = http.createServer(function(req, res) {
//     res.writeHead(200, {"Content-Type": "text/html"});
//     res.end('<p>Voici un paragraphe <strong>HTML</strong> !</p>');
// });
// server.listen(8080);


// Code html valide mais sans système de template pour séparer le code HTMl et le code Javascript.
// Nous verrons comment faire pour rendre le code plus propre et simple à écrire grâce aux template plus tard.

var http = require('http');

var server = http.createServer(function(req, res) {
    res.writeHead(200, {"Content-Type": "text/html"});
    res.write('<!DOCTYPE html>'+
'<html>'+
'    <head>'+
'        <meta charset="utf-8" />'+
'        <title>Ma page Node.js !</title>'+
'    </head>'+
'    <body>'+
'     	<p>Voici un paragraphe <strong>HTML</strong> !</p>'+
'    </body>'+
'</html>');
    res.end();
});
server.listen(8080);
