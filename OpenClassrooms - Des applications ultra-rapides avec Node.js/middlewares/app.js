var express = require('express'); //Charger express
var morgan = require('morgan'); // Charge le middleware morgan pour logging (enregistreur de requête http) - à chercher et installer avec npm - la doc se trouve sur npm également pour ce middleware - https://www.npmjs.com/package/morgan
var favicon = require('serve-favicon'); // Charge le middleware de serve -favicon pour favicon - https://www.npmjs.com/package/serve-favicon

var app = express();

app.use(morgan('combined')) // Active le middleware de logging
.use(express.static(__dirname + '/public')) // Indique que le dossier /public contient des fichiers statiques (middleware chargé de base)
.use(favicon(__dirname + '/public/favicon.ico')) // Active la favicon indiquée
.use(function(req, res){ // Répond enfin
    res.send('Hello');
});

app.listen(8080);

//.use est ici un raccourci de app use
