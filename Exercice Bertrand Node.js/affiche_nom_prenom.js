// // Code qui permet uniquement de récupérer nom et prénom mais ne vérifie pas si pages existe ou non et n'affiche pas de message particulier selon les pages demandées par l'utilisateur
//     var http = require('http');
//     var url = require('url');
//     var querystring = require('querystring');
//
//     var server = http.createServer(function(req, res) {
//         var params = querystring.parse(url.parse(req.url).query);
//         res.writeHead(200, {"Content-Type": "text/plain"});
//         if ('prenom' in params && 'nom' in params) {
//             res.write('Vous vous appelez ' + params['prenom'] + ' ' + params['nom']);
//         }
//         else {
//             res.write('Vous devez bien avoir un prénom et un nom, non ?');
//         }
//         res.end();
//     });
//     server.listen(8080);

// Cette méthode fonctionne et affiche le message lié à la page et aussi le nom et prénom récupéré en get mais uniquement pour la page sous-sol où on a placer le code.
// Exemple avec l'url entrée manuellement : http://localhost:8080/sous-sol?prenom=Allison&nom=Dubois , la page affichera: Vous Ãªtes dans la cave Ã  vins, ces bouteilles sont Ã  moi !Vous vous appelez Allison Dubois
// Par contre http://localhost:8080/prenom=Allison&nom=Dubois affichera "Erreur 404 -  La page que vous avez demandÃ© n'existe pas!"
// Et l'url http://localhost:8080/etage/1/chambre?prenom=Allison&nom=Dubois , affichera uniquement "HÃ© ho, c'est privÃ© ici !" et pas le nom et prénom récupéré en get puisque le code a été placé pour s'éxécuter uniquement sur la page sous-sol
    // var http = require('http');
    // var url = require('url');
    // var querystring = require('querystring');
    //
    // var server = http.createServer(function(req, res) {
    //     // on teste les pages et affiche message différents selon les pages et si page n'existe pas on affiche message 404
    //     var page = url.parse(req.url).pathname; // On parse la requête du visiteur pour extraire le nom de la page demandée par le visiteur
    //     console.log(page);
    //     res.writeHead(200, {"Content-Type": "text/plain"});// On écrit l'en-tête de la réponse avec Node.js avec en paramètre le code de la réponse 200 qui signifie "ok pas d'erreur" et le type de données que le serveur va envoyer au client
    //     if (page == '/') { // Si la page est la racine du site soit la home http://localhost:8080/
    //         res.write('Vous êtes à l\'accueil, que puis-je pour vous ?');//Alors on affiche dans la page du navigateur à l'adresse http://localhost:8080/ le message qui est indiqué ici
    //     }
    //     else if (page == '/sous-sol') {// si la page demandée est http://localhost:8080/sous-sol
    //         res.write('Vous êtes dans la cave à vins, ces bouteilles sont à moi !');
    //         // On récupère les données prénom et nom transmise avec la méthode Get dans l'URL
    //         var params = querystring.parse(url.parse(req.url).query);
    //         if ('prenom' in params && 'nom' in params) {
    //             res.write('Vous vous appelez ' + params['prenom'] + ' ' + params['nom']);
    //         }
    //         else {
    //             res.write('Vous devez bien avoir un prénom et un nom, non ?');
    //         }
    //     }
    //     else if (page == '/etage/1/chambre') { // si la page demandée est http://localhost:8080/etage/1/chambre
    //         res.write('Hé ho, c\'est privé ici !');
    //     }
    //     else {
    //         res.write('Erreur 404 -  La page que vous avez demandé n\'existe pas!'); // le cas par defaut correspond au cas où la page n'existe pas et donc à une erreur 404 - On affiche alors une message erreur 404 - page non trouvée dans la fenêtre du navigateur à l'intention de l'utilisateur
    //     }
    //
    //     res.end(); //appelé en dernier pour terminer la réponse et faire en sorte que le serveur renvoie le résultat au client.
    // });
    // server.listen(8080);


    // Cette méthode affiche le message spécifique à chaque page + le nom et prenom récupéré en get sauf si c'est la 404 en apellant la fonction affiche_qui()
        // var http = require('http');
        // var url = require('url');
        // var querystring = require('querystring');//permet de stocker dans un tableau (array) toutes les valeur récupérées dans l'url pour pouvoir les utiliser
        //
        // var server = http.createServer(function(req, res) {
        //
        //     // On récupére les nom et prénom transmis en get dans l'URL en passant par une fonction que l'on va pouvoir appeller dans toutes les pages pour afficher une phrase reprenant le nom et prénom transmis en Get dans l'URL
        //     function affiche_qui (){
        //       var params = querystring.parse(url.parse(req.url).query);
        //       if ('prenom' in params && 'nom' in params) {
        //           res.write('Vous vous appelez ' + params['prenom'] + ' ' + params['nom']);
        //       }
        //       else {
        //           res.write('Vous devez bien avoir un prénom et un nom, non ?');
        //       }
        //     }
        //
        //
        //     // On teste les pages et affiche message différents selon les pages et si page n'existe pas on affiche message 404
        //     var page = url.parse(req.url).pathname; // On parse la requête du visiteur pour extraire le nom de la page demandée par le visiteur
        //     console.log(page);
        //     res.writeHead(200, {"Content-Type": "text/plain"});// On écrit l'en-tête de la réponse avec Node.js avec en paramètre le code de la réponse 200 qui signifie "ok pas d'erreur" et le type de données que le serveur va envoyer au client
        //     if (page == '/') { // Si la page est la racine du site soit la home http://localhost:8080/
        //         res.write('Vous êtes à l\'accueil, que puis-je pour vous ?');//Alors on affiche dans la page du navigateur à l'adresse http://localhost:8080/ le message qui est indiqué ici
        //         affiche_qui(); // On appelle la fonction qui affiche le message avec le nom et prénom transmise en Get et récupérée dans l'URL
        //     }
        //     else if (page == '/sous-sol') {// si la page demandée est http://localhost:8080/sous-sol
        //         res.write('Vous êtes dans la cave à vins, ces bouteilles sont à moi !');
        //         affiche_qui();
        //     }
        //     else if (page == '/etage/1/chambre') { // si la page demandée est http://localhost:8080/etage/1/chambre
        //         res.write('Hé ho, c\'est privé ici !');
        //         affiche_qui();
        //     }
        //     else {
        //         res.write('Erreur 404 -  La page que vous avez demandé n\'existe pas!'); // le cas par defaut correspond au cas où la page n'existe pas et donc à une erreur 404 - On affiche alors une message erreur 404 - page non trouvée dans la fenêtre du navigateur à l'intention de l'utilisateur
        //     };
        //
        //     res.end(); //appelé en dernier pour terminer la réponse et faire en sorte que le serveur renvoie le résultat au client.
        // });
        // server.listen(8080);


        // Autre méthode indiquée par Bertrand

        var http = require('http');
        var url = require('url');
        var querystring = require('querystring');

        var server = http.createServer(function(req, res){
          var urls =  url.parse (req.url);
          var page = urls.pathname;
          var query = urls.query;
          var params = querystring.parse (urls.query);
          console.log (params);
          res.writeHead(200, {"Content-Type": "text/html"});
          if (page == '/'){
            res.write(query + '<br/>' + params['papa']); // http://localhost:8080/?papa=didier
          }
          else if(page == '/hello'){
            res.write('hello');
          }
          else if(page == '/:test/bonjour'){
            res.write('test');
          }
          else{
            res.write('404');
          }
          res.end()

        });


        server.listen(8080);
