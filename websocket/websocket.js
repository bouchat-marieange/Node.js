// Websocket permet de communiquer en temps réel entre la page web et node . Plus besoind de rafraichir  la page pour afficher les nouvelles informations. La même page peut envoyer des informations sans passer par un formulaire et recevoir des informations en direct et tout ça en javascirpt

//coté serveur: pour gerer les websocket avec nodeJS on doit installer le module socket.io avec NPM en se placant sur le dossier de son projet et en tapant dans le terminal la commande:
//npm install socket.io


// Connexion et création serveur

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



// On créer un server pour pouvoir initialiser socket io et l'utiliser avec ce serveur
var io = require('socket.io')(server); // server fait référence au serveur que l'on a definit dans le fichier server.js précédemment et qui doit se trouver à la racine du dossier de notre projet

// On lie le server sur un port, toujours condition préalable à l'utilisation de socket.io
server.listen(8080);

//On attend que la connexion websocket soit établie avec la page web avant de recevoir ou d'envoyer des données.
//Pour cela il faut attendre que l'évènement connection soit enclenché.
io.on('connection', function(socket) {

    // Pour communiquer, socket ido utilise des evenements.
    //On peut d'un coté écouter un évènement et de le l'autre envoyé des messages à ces évènements.
    //On peut créer autant de type d'évènement que l'on veut mais aussi décider de n'en écouter que certain d'entre eux.
    socket.emit("bienvenue","Bonjour ceci est votre 1ere connection");


});

// L'inverse est aussi possible, où le client envoye un message et le server écoute.
