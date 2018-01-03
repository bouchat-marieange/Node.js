var express = require('express'); //on demande l'inclusiion d'Express

var app = express(); // on crée un objet app en appelant la fonctionc express()

// var ejs = require('ejs');


app.get('/compter/:nombre', function(req, res) {
    var noms = ['Robert', 'Jacques', 'David'];
    res.render('page.ejs', {compteur: req.params.nombre, noms: noms});
});

app.listen(8080);

// On installe ejs avec la commande npm install ejs
// On installe également express avec la commande npm install express
// On envoie plusieurs paramètres à notre template page.ejs se trouvant dans le sous-dossier views et qui se chargera de l'affichage
// Tout d'abord on lance notre page avec la commande node app.js ou nodemon app.js (si nodemon est installé pour ne pas devoir redémarrer à chaque fois notre serveur)
// On tape dans l'url l'adresse suivante: http://localhost:8080/compter/22
// Le nombre taper à la fin de l'url peut changer, la page affichera un comptage en affichant tout les chiffres de 1 jusqu'au numéro indiqué à la fin de l'url qui lui aura été transmis
// On passe également à la views page.ejs le tableau que l'on a créer dans app.js et que l'on a stocké dans la variable noms (ce tableau contient 3 noms : 'Robert', 'Jacques', 'David') dans page.ejs on va effectuer une opérations sur ce tableau en générant un nombre aléatoire (Math random) qui sera situé entre 0 (début du tableau) et la dernière valeur du tableau (longeur du tableu noms -1 puisque le tableau commence à 0)
// Le tableau contient 3 valeurs 0 correspond à Robert, 1 correspond à Jacques et 2 correspond à David - la longueur du tableau noms.lenght est donc de 3 mais ce que l'on souhaite c'est obtenir un nombre aléatoire entre 0 qui correspond à la première valeur (Robert) et 2 , la dernière valeur qui correspond à David . Soit noms.length (longueur du tableau = 3 cellules )-1 = 2

// On envoie plusieurs paramètres à partir de app.js vers page.js grâce à la ligne de code se situant dans app.js
//     app.get('/compter/:nombre', function(req, res) { //dans l'url :nombre sera remplacé par un chiffre jusqu'auquel la page affichera un comptage
//     var noms = ['Robert', 'Jacques', 'David'];//On definit un variable noms qui est un tableau qui contient 3 noms de personnes sur lequel on pourra directement effectué des opération dans page.ejs une fois le tableau récupéré
//     res.render('page.ejs', {compteur: req.params.nombre, noms: noms}); // on envoie les paramètres à page.ejs, le premier paramètre s'appelle compteur et contient le chiffre qui sera récupéré à la fin de l'url, le second paramètre s'appelle noms et est le tableau qui contient les 3 prénoms de personnes. On fera appel à ces paramètres avec leur nom c'est à dire compteur et noms dans page.ejs pour pouvoir les manipuler et les afficher
//     });
// à notre template page.ejs se trouvant dans le sous-dossier views et qui se chargera de l'affichage
// Les paramètres reçu par notre page de template page.ejs seront placée entre des balises <%= NomDeLaVariable %> et seront remplacée par la variable lors de l'affichage
// Tout d'abord on lance notre page avec la commande node app.js ou nodemon app.js (si nodemon est installé pour ne pas devoir redémarrer à chaque fois notre serveur)
// On tape dans l'url l'adresse suivante: http://localhost:8080/compter/22
// Le nombre taper à la fin de l'url peut changer, la page affichera un comptage en affichant tout les chiffres de 1 jusqu'au numéro indiqué à la fin de l'url qui lui aura été transmis
// On passe également à la views page.ejs le tableau que l'on a créer dans app.js et que l'on a stocké dans la variable noms (ce tableau contient 3 noms : 'Robert', 'Jacques', 'David') dans page.ejs on va effectuer une opérations sur ce tableau en générant un nombre aléatoire (Math random) qui sera situé entre 0 (début du tableau) et la dernière valeur du tableau (longeur du tableu noms -1 puisque le tableau commence à 0)
// Le tableau contient 3 valeurs 0 correspond à Robert, 1 correspond à Jacques et 2 correspond à David - la longueur du tableau noms.lenght est donc de 3 mais ce que l'on souhaite c'est obtenir un nombre aléatoire entre 0 qui correspond à la première valeur (Robert) et 2 , la dernière valeur qui correspond à David . Soit noms.length (longueur du tableau = 3 cellules )-1 = 2
