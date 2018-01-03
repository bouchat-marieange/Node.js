    // var express = require('express'); //on demande l'inclusiion d'Express
    //
    // var app = express(); // on crée un objet app en appelant la fonctionc express()
    //
    // // Je crée une seule route pour commencer vers le repertoire racine "/" avec une fonction callback qui est appellée quand quelqu'un demande cette route et indique "Vous êtes à l'accueil"
    // app.get('/', function(req, res) {
    //     res.setHeader('Content-Type', 'text/plain');
    //     res.end('Vous êtes à l\'accueil');
    // });
    //
    // //On peut ensuite ajouter autant de routes (adresse URL) qu'on le souhaite par ecemple (http://localhost:8080/sous-sol)
    // app.get('/sous-sol', function(req, res) {
    //     res.setHeader('Content-Type', 'text/plain');
    //     res.end('Vous êtes dans la cave à vins, ces bouteilles sont à moi !');
    // });
    //
    // app.get('/etage/1/chambre', function(req, res) { // ou encore route URL http://localhost:8080/etage/1/chambre
    //     res.setHeader('Content-Type', 'text/plain');
    //     res.end('Hé ho, c\'est privé ici !');
    // });
    //
    // // Code permettant de gérer les erreurs 404 - page demandée n'existe pas - Affiche dans la le navigateur "Page introuvable !"
    // app.use(function(req, res, next){
    //     res.setHeader('Content-Type', 'text/plain');
    //     res.send(404, 'Page introuvable !');
    // });
    //
    // app.listen(8080);

//Syntaxe alternative que l'on peu employé avec Express qui permet de chaîner les appel à get() et use() en renvoyant l'objet app d'une fonction à l'autre

    // app.get('/', function(req, res) {
    //
    // })
    // .get('/sous-sol', function(req, res) {
    //
    // })
    // .get('/etage/1/chambre', function(req, res) {
    //
    // })
    // .use(function(req, res, next){
    //
    // });


// Notation alternative permettant de géer des routes dynamiques dont certaines portions peut varier (ici etagenum)
// Permet de gerer avec moins de code plusieurs page différentes dont un élément de l'URL va varier.
    // var express = require('express'); //on demande l'inclusiion d'Express
    //
    // var app = express(); // on crée un objet app en appelant la fonctionc express()
    //
    // app.get('/etage/:etagenum/chambre', function(req, res) {
    //     res.setHeader('Content-Type', 'text/plain');
    //     res.end('Vous êtes à la chambre de l\'étage n°' + req.params.etagenum);
    // });
    //
    // app.listen(8080);

// Permet de gerer avec moins de code plusieurs page différentes dont un élément de l'URL va varier.
// Ainsi la page correspondante sera renvoyée que l'on envoie url /etage/1/chambre ,/etage/2/chambre, /etage/3/chambre ..;
// Attention une page sera affichée aussi si on envoye /etage/nawak/chambre, il faudra donc vérifier dans la fonction callback que c'est bien un nombre qui est envoyé dans l'url et si ça n'est pas le cas, renvoyé une erreur 404. On testera cela avec la fonction native javascritpt isNaN (is not a number) et un classique if ... else...

    var express = require('express'); //on demande l'inclusiion d'Express

    var app = express(); // on crée un objet app en appelant la fonctionc express()

    // Je crée une seule route pour commencer vers le repertoire racine "/" avec une fonction callback qui est appellée quand quelqu'un demande cette route et indique "Vous êtes à l'accueil"
    app.get('/', function(req, res) {
        res.setHeader('Content-Type', 'text/plain');
        res.end('Vous êtes à l\'accueil');
    });

    //On peut ensuite ajouter autant de routes (adresse URL) qu'on le souhaite par ecemple (http://localhost:8080/sous-sol)
    app.get('/sous-sol', function(req, res) {
        res.setHeader('Content-Type', 'text/plain');
        res.end('Vous êtes dans la cave à vins, ces bouteilles sont à moi !');
    });

    // Pour le cas ou les étages sont transmis en get (ex: route URL http:/localhost:8080/etage/1/chambre), j'utilise un systeme pour récupérer les routes dynamiques (le numéro d'étage varie et est récupérer) et en plus je teste si la variable correspondant à l'étage est bien un nombre, si ce n'est pas le cas je redirige vers page 404, si c'est bien un nombre j'affiche la page correspondante avec l'étage transmis en Get
    app.get('/etage/:etagenum/chambre', function(req, res)
    {
        // res.setHeader('Content-Type', 'text/plain');
        console.log(req.params.etagenum); // Affiche la valeur du numéro d'étage récupérée dans l'url dans la console
        if (isNaN(req.params.etagenum) == true) // On utilise la fonction javascript nativeve isNAN() qui prend en paramètre la valeur à tester pour vérifier si la valeur en question est un nombre ou non. isNaN signifie "is not a Number", donc si l'étage renvoyé n'est pas un nombre (isNaN==true), alors on affiche la page 404 sinon (else) on affiche la page correxpondante à l'étage transmise en GET dans l'URL
        {
        console.log('erreur - pas un nombre!');// Affiche erreur - pas un nombre dans la console si le numéro d'étage récupéré dans l'url n'est pas un nombre
        app.use(function(req, res, next){
            res.setHeader('Content-Type', 'text/plain');
            res.send(404, 'Page introuvable !');
        });
        }
      else{
        console.log('ok est un nombre'); // Affiche ok est un nombre dans la console si le numéro d'étage récupéré dans l'url est bien un nombre
          res.end('Vous êtes à la chambre de l\'étage n°' + req.params.etagenum);
        }
    });

    // gestion des erreurs 404 - la page demandée n'existe pas pour toutes les autres pages qui ne concernent pas le numéro d'étage qui ne serait pas un nombre
    app.use(function(req, res, next){
        res.setHeader('Content-Type', 'text/plain');
        res.send(404, 'Erreur 404- Page introuvable !');
    });

    // Il semblerait que node.js préfère cette syntaxe ou le status (404) et le body (Page introuvable sont séparée)
    // En effet lorsque j'ai indiqué une url qui n'existait pas le message Erreur 404 - Page introuvable ! c'est bien afficher dans la page
    // Mais dans la console le message suivant est également apparu : express deprecated res.send(status, body): Use res.status(status).send(body) instead app.js:101:13
    //Voici donc cette partie du code réécrite selon les informations fournies dans la console
    // app.use(function(req, res, next){
    //     res.setHeader('Content-Type', 'text/plain');
    //     res.status(404).send('Erreur 404- Page introuvable !');
    // });

    app.listen(8080);
