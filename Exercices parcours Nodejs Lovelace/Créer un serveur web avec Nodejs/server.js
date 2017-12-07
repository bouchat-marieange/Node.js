var http = require("http");//inclure module http qui donne les outils nécessaire pour communiquer avec le navigateur via le protocole HTTP (Hyper Text Transfer Protocol)

// Dès que le module "http" est inclus dans notre fichier server.js, on a accès à la méthode "http.createServer()" qui permet de créer un serveur
// Cette méthode va nous passer deux paramètres : les objets request et response (ce que le serveur recoit et ce qu'il renvoie)
//L'objet "request"nous fournir des informations concernant la requête client tel que son url, les en-têtes HTTP, ...
//L'objet "response" servira à retourner des données comme du texte , du html, un fichier, ...

var server = http.createServer(function(request, response) {

    // On appelle la méthode "response.writeHead()" qui va définir le statut de notre requête http et le type de contenu que l'on souhaite retourner.
    response.writeHead(200, {"Content-Type": "text/html"});

    // On appelle la méthode "response.write()" qui va permettre de concevoir notre document html passé en argument.
    // A la suite de respons.write(),à l'intérieur des parenthèses de la fonctions et entre guillemets, (puisque que notre code html est l'argument de cette fonction)  on place notre code html comme on le ferait dans une page html normale
    response.write(`
      <!DOCTYPE html>
       <html lang="en">
        <head>
         <meta charset="UTF-8">
         <title>hello node</title>
        </head>
        <body>
         <p>Hello world</p>
        </body>
       </html>
    `);

    // Cette fonction vient indiquer qu'il s'agit de la fin de notre réponse
     response.end();
});

// Cette méthode va lier notre serveur au port de notre choix, on peut utiliser le port 8080 mais on peut également en choisir un autre.
server.listen(8080);
