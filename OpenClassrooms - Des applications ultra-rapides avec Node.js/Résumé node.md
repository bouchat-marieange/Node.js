# Résumé node.js (openclassrooms)

## Présentation de Node.js

Node.js n'est pas un frameword mais un environnement très bas niveau.


Node.js utilise moteur exécution ultrarapide V8 de Google Chrome (open source) qui analyse et exécute du code Javascript très rapidement.

Exemple: programme node.js qui télécharge un fichier sur internet et affiche "fichier téléchargé! quand il a terminé

````javascript
request('http://www.site.com/fichier.zip', function (error, response, body) {
    console.log("Fichier téléchargé !");
});
console.log("Je fais d'autres choses en attendant...");
````

Fonction callback: fonction qui s'exécute et effectue des actions lorsqu'un évènement précis se produit. La fonction callback envoie une fonction en paramètre d'une autre fonction, ce qui signifie : "Exécute cette fonction lorsque cet évènement précis est terminé. La fonction callback n'a pas de nom, elle est anonyme le plus souvent mais on peut également la stocker dans une variable et l'appeler ensuite pour qu'elle soit exécutée.

´´´´javascript

// Résultat identique au code précédent

var callback = function (error, response, body) {
    console.log("Fichier téléchargé !");
});

request('http://www.site.com/fichier.zip', callback);
console.log("Je fais d'autres choses en attendant...");

var callback = function (error, response, body) {
    console.log("Fichier téléchargé !");
});

request('http://www.site.com/fichier.zip', callback);
console.log("Je fais d'autres choses en attendant...");

´´´´

Lafonction de callback function (error, response, body) en paramètre de la fonction request() dit: "Dès que la requête de téléchargement est terminée, appelle cette fonction de callback".

On peut lancer plusieurs actions en même temps. Le programme n'attend pas que l'un soit terminée poaur lancé l'instruction suivante et donc au final l'éxécution des deux opérations prends moins de temps que si elles avait été exécutée une et puis l'autre quand la première était terminée. Cela permet de faire d'autre choses pendant le déroulement d'actions longues (appel DB, appel à services web ex:API Twitter, etc...)

´´´´javascript

var callback = function (error, response, body) {
    console.log("Fichier téléchargé !");
});

request('http://www.site.com/fichier.zip', callback);
request('http://www.site.com/autrefichier.zip', callback);

´´´´

## Installation de node.js (linux, pc , mac)

https://openclassrooms.com/courses/des-applications-ultra-rapides-avec-node-js/installer-node-js

https://openclassrooms.com/courses/des-applications-ultra-rapides-avec-node-js/installer-node-js

**Linux (Node version 9):**

curl -sL https://deb.nodesource.com/setup_9.x | sudo -E bash -
sudo apt-get install -y nodejs

taper ensuite la commande suivante pour vérifier la version de node installée sur votre système

node -v
node

**Windows**

Aller sur le site officiel de node.js et télécharger la version de node.js qui correspond à votre systeme (télécharger la version zip ou mis ou exe et lancer l'installeur) suivez les instructions à l'écran. L'installateur installe 2 choses:
* Node.js (interpreteur de commande de Node.js - sert à tester des commandes javascript)
* Node.js command prompt: console de windows configurée pour reconnaitre Node.js. C'est à partir de cette console que les utilisateurs windows lance leur programme Node.js

**Mac**

Aller sur le site officiel de node.js et télécharger la version de node.js qui correspond à votre système. Le mieux est de prendre celle avec l'extension .pkg qui ouvre un assistant d'installation et cliquer sur "Suivant" jusqu'à la fin. Une fois l'installation terminée, verifier que node fonctionne correctement en tapant "node" dans la console (ouvrez une fenêtre de terminal (Finder--> applications--> Terminal. et taper la commande node -v pour vérifier la version de node installée. Pour quitter l'interpreteur faites Ctrl + D (quitte un interpreteur sous Mac ou Linux)

## Lancer un fichier.js simple avec Node

1. Créer un fichier avec l'extension .js
2. Positionner le terminal à l'endroit où se trouve le fichier
3. Taper dans le terminal node nomFichier.js, le code contenu dans votre fichier exemple: console.log('Bienvenue dans Node.js !');s'exécute et affiche donc dans le Terminal: Bienvenu dans Node.js


## Node - Serveur et threads

Avec PHP il y a un serveur web HTTP (exemple: Apache) qui gèrent les entrées et sorties. PHP exécute le code des fichiers.php et renvoie le résultat à Apache qui se charge de l'envoyer au visiteurs. Lorsque plusieurs visiteurs demanade un page en même temps au serveur, Apache les répartit et les exécutent en parallèle dans des threads différents. Chaque thread utilise un processeur différents sur le serveur (noyau du processeur)

Avec Node, on n'utilise pas de serveur web HTTP comme Apache, c'est nous qui créons notre propre serveur. Attention: Node est monothread, il ne peut traiter qu'un seul thread, un seul processus , une seule version de programme à la fois en mémoire. Node ne peut faire qu'une chose à la fois et tourne sur un seul noyau de processeur mais il le fait de façon super efficace et est donc au final plus rapide grâce à sa nature "orientée evènements" qui lui permet de ne jamais rester à ne rien faire. Node peut faire d'autres chose en attendant que les processus long soient terminés.

## Construire son serveur HTTP

Voici le code minimal pour un projet Node. C'est le code qui permet de créer le serveur nécessaire à l'exécution de tout projet. Placer ce code dans un fichier appelé serveur.js (par exemple).

````javascript

var http = require('http');

var server = http.createServer(function(req, res) {
  res.writeHead(200);
  res.end('Salut tout le monde !');
});
server.listen(8080);

````
Ce serveur est lancé sur le port 8080 (à la dernière ligne).

### Explications du code

````javascript
var http = require('http');

````
require fait un appel à une bibliothèque de Node.js appelée "http" qui permet de créer une serveur web. Il existe d'autres bibliothèques qui peuvent être téléchargées avec NPM (gestionnaire de paquets de Node.js)

la variable http représente un objet JavaScript qui va nous permettre de lancer un serveur web.
C'est précisément ce que l'on va faire avec le code qui suit:


````javascript
var server = http.createServer();

````
On appelle la fonction createServer(à contenue dans l'objet http et on enregistre ce serveur dans la variable server. La fonction createServer prend un paramètre qui est une fonction. Il s'agit de la fonction à exécuter quand un visiteur se connecte à notre site. Il s'agit de la fonction callback. On peut soit la placer directement en paramètre de createServer (la manière la plus courante), soit la définir avant dans une variable et ensuite l'appeler grâce au nom de cette variable dans les paramètres de createServer.

````javascript

var server = http.createServer(function(req, res) {
  res.writeHead(200);
  res.end('Salut tout le monde !');
});

````

Ecriture alternative avec la fonction callback stockée dans uen variable (code identique au précédent)

````javascript

var instructionsNouveauVisiteur = function(req, res) {
  res.writeHead(200);
  res.end('Salut tout le monde !');
}

var server = http.createServer(instructionsNouveauVisiteur);

````

Attention: Bien fermer la fonction callback avec accolade, puis fermet parenthéses d'appel de la fonction qui l'englobe, puis placer le point virgule. La dernière ligne du code est });

La fonction callback est appelée à chaque fois qu'un visiteur se connecte à notre site, elle prend 2 paramètres:

* La requête du visiteur (req). Cet objet contient toutes les infos sur le ce que le visiteurs a demandé (nom de la page appelée, paramètre, champs de formulaire remplis, ...)

* La réponse que vous devez renvoyer (res) . C'est cet objet qu'il faut remplir pour donner un retour au visiteur. Au final, res contiendra en général le code HTML de la page à renvoyer au visiteur.

Ici on fait 2 choses très simples dans la réponse:

````javascript

res.writeHead(200);
res.end('Salut tout le monde !');

````

* On renvoie le code 200 dans l'en-tête de la réponse qui indique au navigateur que tout c'est bien déroulé. (exemple: 404 si page demandé n'existe pas). Vous trouverez ici la liste des codes HTTP (https://fr.wikipedia.org/wiki/Liste_des_codes_HTTP). En plus du code, généralement le serveur renvoie toute une serie de paramètre dans l'en-tête. Il faut connaitre la norme HTTP qui indique comment clients et serveurs doivent communiquer pour bien l'utiliser.

* On termine avec end() en envoyant le message de notre choix au navigateur. Ici on envoie du texte brut mais on aurait pu renvoyé du HTML.

Enfin, on definit que le serveur est lancé et "écoute sur le port 8080 avec l'instruction :

````javascript

server.listen(8080);

````

Attention: éviter d'utiliser le port 80 qui est normalement réservé aux serveurs web car il est peut-être déja utiliser par votre machine. Le port 8080 sert de test uniquement, une fois en production il est au contraire conseiller d'écouter le port 80 car c'est là que les visiteurs iront taper en arrivant sur notre serveur.

## Tester son serveur HTTP

Aller dans le terminal à l'endroit où se trouve votre fichier serveur.js et taper:

````javascript

server.listen(8080);

````

La console n'affiche rien, c'est normal, mais en ouvrant votre navigateur à l'adresse http://localhost:8080 on se connecte à notre serveur et on voit donc apparaitre le message que l'on renvoie à nos utilisateur en reponse (res) c'est à dire "Salut tout le monde! "

## Retourner du code HTML

Il faut respecter les règles entre le client et le serveur qui communique en se basant sur la norme HTTP (inventée apr Tim Berners_Lee. Selon cette norme, le serveur doit indiquer le type de données qu'il s'apprête à envoyer au client.C'est ce que l'on appelle  les types MIME qui son envoyés dans l'en-tête de la réponse du serveur.

**Par exemple:**

* texte brut : text/plain
* HTML: text/html
* CSS : text/css
* image jpeg: image/jpeg
* video mpeg4:  video/mp4
* fichier zip: application/zip
* etc...

Pour retourner du code HTML, il faut l'indiquer dans l'en-tête. Le second paramètre est entre accolades car on peut y envoyer plusieurs valeurs sous forme de tableau.

**code complet**

````javascript

var http = require('http');

var server = http.createServer(function(req, res) {
    res.writeHead(200, {"Content-Type": "text/html"});
    res.end('<p>Voici un paragraphe <strong>HTML</strong> !</p>');
});
server.listen(8080);

````

On lance ensuite le serveur node en se plaçant dans le terminal à l'endroit où se trouve le fichier et en tapant node nomFichier.js puis on va à l'adresse http://localhost:8080 dans notre navigateur pour voir le résultat. Le texte est bien mis en forme en HTML comme attendu. Ce code est cependant encore trop basique que pour être du code HTML valide. Il manque le doctype, la balise html, balise body etc...
Jusqu'ici on avait utiliser res.end() pour envoyer la réponse. Pour mieux découper le code, à partir de maintenant on va utiliser res.write() qui permet d'écrire la réponse en plusieurs temps. Cela revient au même mais le code est mieux découpé.
Attention res.end() doit toujours être appelé en dernier pour terminer la réponse et faire en sorte que le serveur envoie le résultat au client.

**Code complet avec HTML valide**

````javascript
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
````
## Comment éviter de devoir à chaque fois recharger la page dans la console avec node nomFichier.js

https://nodemon.io/

Pour éviter de devoir à chaque fois recharger la page dans le terminal avec la commande node nomFichier.js, on peut utiliser nodemon qui est un utilitaire qu'il est possible d'installer en global sur notre machine et qui permet d'afficher automatiquement les modification de notre fichier sans devoir à chaque fois relancer la commande node nomFichier.js. Nodemon s'installe grâce à npm. Taper juste dans le terminal la commande suivante pour l'installer:

````code
npm install -g nodemon

````
Une fois installé, pour l'utiliser il suffit de lancer les fichier non plus avec la commande node nomFichier.js mais avec la commande nodemon nomFichier.js et les modifications seront automatiquement appliquée dans le navigateur lorsque l'on rafraichis la page. Attention parfois il est nécessaire de vider le cache du navigateur pour corriger certaines erreurs d'affichage qui ne se mettrait pas à jour.


## Déterminer la page appelée et les paramètres

Comment faire pour que notre application renvoie des contenu différents selon l'adresse qui sera présente dans la barre url de notre navigateur.

Pour l'instant http://localhost:8080/ ou  http://localhost:8080/mapage ou http://localhost:8080/trucmuch/machin donne exactemement le même résultat. Le message affiché ne change pas.

Il faut pour cela savoir quelle page est demandée par le visiteur.

### Récupérer la page demandée par le visiteur

On doit faire appel à 'url", un autre module de Node. Il faut tout d'abord l'inclure avec la require puis ce module va nous permettre de parser (récupérer dans l'url) la requête du visiteur pour obtenir le nom de la page de mandée.

````javascript

var http = require('http');
var url = require('url');

var server = http.createServer(function(req, res) {
    var page = url.parse(req.url).pathname;
    console.log(page);
    res.writeHead(200, {"Content-Type": "text/plain"});
    res.write('Bien le bonjour');
    res.end();
});
server.listen(8080);

````

On exécute le script node nomFichier.js, on va à l'adresse http://localhost:8080 pour commencer, puis on retourne dans la console. on peut y voir deux ligne / et /favicon.ico. Cela est dû au fait que la plupart des navigateurs font en réalité une seconde requête pour récupérer l'icone du site(favicon).

Nous allons tenter maintenant de charger des "fausses pages" de notre site en tapant dans l'url du navigateur des url ne correspondant à aucuns fichiers: comme par exemple

http://localhost:8080/testpage
http://localhost:8080/un/long/chemin
etc...

En revenant dans la console on peut voir ceci

````code

/testpage
/favicon.ico
/un/long/chemin
/favicon.ico

````
La console indique bien que l'on a tenter de charger des pages différentes mais le contenu affiché reste inchangé, c'est normal car il faut indiquer que selon la page, un contenu différents sera affiché). On fait cela à l'aide d'un if, else if pour déterminer le contenu à afficher selon la page demandée. La page demandée est récupérée grace au module 'url" inclus plus haut et stocké dans la variable page. On affiche ensuite dans la console le nom de la page récupérée, puis on effectue une condition if elseif pour déterminer le contenu a afficher selon le contenu récupéré dans la variable page. Exemple si adresse url est  http://localhost:8080/ alors la page affichera "Vous êtes à l'accueil, que puis-je pour vous?, si l'adresse url est http://localhost:8080/sous-sol alors le navigateur affichera "Vous êtes dans la cave à vins, ces bouteilles sont à moi! etc...

````javascript

var http = require('http');
var url = require('url');

var server = http.createServer(function(req, res) {
    var page = url.parse(req.url).pathname;
    console.log(page);
    res.writeHead(200, {"Content-Type": "text/plain"});
    if (page == '/') {
        res.write('Vous êtes à l\'accueil, que puis-je pour vous ?');
    }
    else if (page == '/sous-sol') {
        res.write('Vous êtes dans la cave à vins, ces bouteilles sont à moi !');
    }
    else if (page == '/etage/1/chambre') {
        res.write('Hé ho, c\'est privé ici !');
    }
    res.end();
});
server.listen(8080);

````

## Afficher un message d'erreur 404 si la page demandée par l'utilisateur n'existe pas


````javascript

var http = require('http');
var url = require('url'); //récupère la page demandée par le visiteur et les données qui transite par l'url comme les données de formulaires transmises par la methode GET par exemple

var server = http.createServer(function(req, res) {
    var page = url.parse(req.url).pathname; // On parse la requête du visiteur pour extraire le nom de la page demandée par le visiteur
    console.log(page);
    res.writeHead(200, {"Content-Type": "text/plain"});// On écrit l'en-tête de la réponse avec Node.js avec en paramètre le code de la réponse 200 qui signifie "ok pas d'erreur" et le type de données que le serveur va envoyer au client
    if (page == '/') { // Si la page est la racine du site soit la home http://localhost:8080/
        res.write('Vous êtes à l\'accueil, que puis-je pour vous ?');//Alors on affiche dans la page du navigateur à l'adresse http://localhost:8080/ le message qui est indiqué ici
    }
    else if (page == '/sous-sol') {// si la page demandée est http://localhost:8080/sous-sol
        res.write('Vous êtes dans la cave à vins, ces bouteilles sont à moi !');
    }
    else if (page == '/etage/1/chambre') { // si la page demandée est http://localhost:8080/etage/1/chambre
        res.write('Hé ho, c\'est privé ici !');
    }
    else {
        res.writeHead(404, {"Content-Type": "text/plain"});
        res.write('Erreur 404 -  La page que vous avez demandé n\'existe pas!'); // le cas par defaut correspond au cas où la page n'existe pas et donc à une erreur 404 - On affiche alors une message erreur 404 - page non trouvée dans la fenêtre du navigateur à l'intention de l'utilisateur
    }
    res.end();
});
server.listen(8080);

````

**Astuce de vérification**

Pour vérifier que non seulement le texte "Erreur 404 - La page que vous avez demandé n'existe pas!" s'affiche dans le navigateur mais que également que c'est bien le code 404 qui a été envoyé dans l'en-tête, il est possible de le vérifier dans la console du navigateur.

Indiquer tout d'abord un page qui existe (exemple: http://localhost:8080/etage/1/chambre) dans vos routes, afficher la console du navigateur avec le raccourci Ctrl+Maj+I et aller dans l'onglet "Network". Il y a une page qui apparait à coté d'une case à cocher exemple: chambre. Cliquer dessus et aller dans le sous-onglet "Header" et verifier le Status Code qui est à 200, donc le status 200 a bien été envoyé lorsque la page existe.

Maintenant taper dans l'adresse url du navigateur sur une adresse qui n'est pas reprise dans vos routes (ex: http://localhost:8080/etage/2/chambre), rafraichisser la page, et aller à nouveau dans la console dans l'onglet "Network", cette fois la page chambre s'affiche en rouge, cliquer dessus et aller dans le sous-onglet "Header" et là dans Status Code 404, donc le status code de 200 à bien été remplacé par le status 404 qui a correctement été envoyé dans le header.


## Récupérer les paramètres transmis dans une url

Les paramètres sont envoyés à la fin de l'URL, après le chemin du fichier.

Par exemple: http://localhost:8080/page?prenom=Robert&nom=Dupont

Les paramètres sont contenus dans la chaine ?prenom=Robert&nom=Dupont.

Pour récupérer cette chaîne, il suffit de faire appel à :

````javascript

url.parse(req.url).query

````
Le problème c'est que ce système nous renvoie toute la châine sans la découper au préalable pour récupérer séparément les différents paramètres qui la composent. Il existe le module querystring de Node.js qui est spécialement conçu pour faire ce travail.

Il faut d'abord l'inclure

````javascript
var querystring = require('querystring');
````

Puis ensuite on peut l'utiliser

````javascript
var params = querystring.parse(url.parse(req.url).query);
````

On dispose alors d'un tableau de paramètres "params'. Pour récupérer un paramètre précis il suffira d'indiquer la clé qui y est associé.

Exemple: params['prenom']

**Code complet affichant prénom et nom récupéré dans l'url (si ceux-ci y sont mentionnés)**

````javascript

var http = require('http');
var url = require('url');
var querystring = require('querystring');

var server = http.createServer(function(req, res) {
    var params = querystring.parse(url.parse(req.url).query);
    res.writeHead(200, {"Content-Type": "text/plain"});
    if ('prenom' in params && 'nom' in params) {
        res.write('Vous vous appelez ' + params['prenom'] + ' ' + params['nom']);
    }
    else {
        res.write('Vous devez bien avoir un prénom et un nom, non ?');
    }
    res.end();
});
server.listen(8080);

````

On peut a présent charger ce ficher avec node.js avec la commande node nomFichier.js et aller voir le resulat dans le navigateur avec l'adresse http://localhost:8080?prenom=Robert&nom=Dupont

On peut ensuite changer le nom et le prénom transmis dans l'url (exemple: http://localhost:8080?prenom=Brad&nom=Pitt) et rafraichir pour voir le contenu de la page s'adapter au nom et prenom recupérer dans l'url.

Deux petites précisions par rapport à ce code : 'prenom' in params me permet en JavaScript de tester si le tableau contient bien une entrée 'prenom'. S'il manque un paramètre, je peux alors afficher un message d'erreur (sinon mon script aurait affiché undefined à la place).
Par ailleurs, vous constaterez que je ne vérifie pas la page qui est appelée. Ce code fonctionne aussi bien que l'on soit sur http://localhost:8080 ou sur http://localhost:8080/pageimaginaire. Il faudrait combiner ce code et le précédent pour gérer à la fois la page ET les paramètres.

![Shéma résumé](https://user.oc-static.com/files/421001_422000/421255.png)



## Les évènements

Node.js est un environnement de développement JavaScript basé sur les évènements, il est monothread et basé sur un système non-bloquant ce qui lui permet d'effectuer une seule tâche à la fois mais de ne pas devoir attendre qu'une tâche soit terminée pour en commencé une autre. Lorsque la première tâche sera terminée (évènement) alors Node.js effectuera une action donnée (ex: lorsque le fichier est télécharger, node l'affiche à l'écran). La fonction qui est appellée lorsque la tâche est terminée est appelée fonction de callback. Le fonctionnement de Node.js étant basé sur les évènements, il est essentiel de savoir comment créer des évènement et comment les "écouter" (surveiller leur exécution).

### Ecouter des évènements

Lorsque l'on utilise JQuery, on écoute déja des évènement en JavaScript.

Par exemple: $("canvas").on("mouseleave", function() { ... });

Dans l'exemple ci-dessus, on  demande a éxécuter une fonction de callback quand la souris sort d'un élément <canvas> de la page. On dit que l'on attache l'évènement au DOM de la page.

Avec Node le principe est exactement le même. Un très grand nombre d'objet Node.js émettent des évènements. Ils ont une particularité, c'est qu'il héritents tous d'un objet EventEmitter fourni par Node.

Par exemple le module "http" utilsé pour créer un serveur web, il comprend un objet Server qui emet des évènements d'après la doc : https://nodejs.org/api/http.html

![doc](https://user.oc-static.com/files/421001_422000/421286.png)


Pour écouter ces évènements, par exemple l'évènement "close" qui survient quand le serveur est arrêté, il faut faire appel à la méthode on() et indiquer:

* le nom de l'évènement que l'on écoute (ici "close")
* la fonction de callback à appeler quand l'évènement survient

````javascript

var http = require('http');

var server = http.createServer(function(req, res) {
  res.writeHead(200);
  res.end('Salut tout le monde !');
});

server.on('close', function() { // On écoute l'évènement close
    console.log('Bye bye !');
})

server.listen(8080); // Démarre le serveur

server.close(); // Arrête le serveur. Déclenche l'évènement close

````

Remarque: createServer() comprend aussi une fonction callback pourquoi on utilise par on() alors?
Il s'agit d'une contraction de code. Lorsque l'on lit la documentation de createServer() : http_http_createserver_requestlistener, on apprend que la fonction de callback qu'on lui envoie en paramètre est automatiquement ajoutée à l'évènement "request"

Donc ce code:

````javascript

var server = http.createServer(function(req, res) { });

````

Pourrais également être écrit de cette manière:

````javascript

// Code équivalent au précédent
var server = http.createServer();
server.on('request', function(req, res) { });

````

On peut écouter plusieurs fois un même évènement. Faites deux fois appel à la fonction on() pour le même évènement : les deux fonctions de callback seront appelées quand l'évènement aura lieu.


### Emettre des évènements


On peut également émettre des évènements. Incluez le module EventEmitter et créez un objet basés sur EventEmitter

````javascript

var EventEmitter = require('events').EventEmitter;

var jeu = new EventEmitter();

````

Ensuite pour émettre un évènement dans votre code, il faut faire appel à emit() depuis votre objet basé sur EventEmitter en indiquant:

* le nom de l'évènement que vous voulez génére (ex:"gameover")
* un ou plusieurs eventuels paramètres à passer (facultatif)

**Exemple**

Ici, je génère un évènement "gameover" et j'envoie un message à celui qui eréceptionnera l'évènement via un paramètre:

````javascript

jeu.emit('gameover', 'Vous avez perdu !');

````

Celui qui veut écouter l'évènement doit faire ensuite:

````javascript

jeu.on('gameover', function(message) { });

````

**Code complet pour tester l'émission d'évènement**

````javascript

var EventEmitter = require('events').EventEmitter;

var jeu = new EventEmitter();

jeu.on('gameover', function(message){
    console.log(message);
});

jeu.emit('gameover', 'Vous avez perdu !');

````

Il s'agit ici d'un code simpliste qui se contente d'émettre un évènement. Dans la réalité, les évènements seront émis depuis des fonctions imbriquées dans d'autres fonctions (c'est toute la richesse de Node.js).

Ne pas oublier que l'on peut envoyer autant de paramètres que nécessaire à la fonction de callback. Emettez simplement plus de paramètres:

````javascript

jeu.emit('nouveaujoueur', 'Mario', 35); // Envoie le nom d'un nouveau joueur qui arrive et son âge

````

**Une explication claire et détaillée**
Source: https://www.w3schools.com/nodejs/nodejs_events.asp

Vous pouvez affecter des gestionnaires d'événements à vos propres événements avec l'objet EventEmitter.

Dans l'exemple ci-dessous, nous avons créé une fonction qui sera exécutée lorsqu'un événement "scream" est déclenché.

Pour déclencher un événement, utilisez la méthode emit ().

Example

On inclus le module 'events' de EventEmitter et on créer un objet basé sur EventEmitter

````javascript
var events = require('events');
var eventEmitter = new events.EventEmitter();
````

On indique ce qui va se passer quand l'évènement va se produire - Quand l'évenement cri se produit afficher dans la console "J'entends un cri"
Create an event handler (gestionnaire d'évènement):

````javascript
 var myEventHandler = function () {
   console.log('I hear a scream!');
 }
````


On indique quel évènement doit être écouter (surveiller) - surveiller quand l'évènement cri se produit et indiquer l'action stockée dans une variable (myEventHandler) qui va être effectué quand l'évènement à surveiller se produit
Assign the event handler to an event:

````javascript
eventEmitter.on('scream', myEventHandler);
````


On emet l'évenement (ici un cri)
Fire the 'scream' event:
````javascript
eventEmitter.emit('scream');
````

## Les modules Node.js et NPM

Le noyau de Node à la base est très petit et ne permet pas de faire grand chose, on peut cependant étendre considérablement ces capacité grâce à l'ajout d'extensions appelés modules.

Il existe des milliers de modules proposant des fonctionnalités variées (gestion de fichiers uploadés, connexion aux bases de données MySQL ou Redis, frameworks, système de template, gestion de communication en temps réel avec l'utilisateur, ...). De nouveaux modules apparaissent tous les jours. On peut également créer et publier sur NPM ses propres modules pour les partager avec toute la communauté Node.js.

### Créer des modules

Nous avons déja utilisé des modules natifs de Node.js tel que http et url, grâce à des appel à la bibliothèque de Node se trouvant sur notre disque dur avec ce type de code.

```javascript
var http = require('http'); // Fait appel à http.js
var url = require('url'); // Fait appel à url.js
```
Lorsque l'on fait un require, Node.js va chercher sur notre disque dur un fichier appelé http.js ou url.js.

**Attention :** Il ne faut pas mettre l'extension du fichier js du module dans le require.

Les modules sont donc de simple fichier javavascript .js.

Pour créer un nouveau module nous devons donc créer un simple fichier javascript par exemple le fichier test.js dans le même dossier et y faire appel comme ceci:

```javaScript
var test = require('./test'); // Fait appel à test.js (même dossier)
```
Il s'agit d'un chemin relatif, si le module se trouve dans le dossier parent, pour l'inclure, on utilisera le type de code suivant:

```javaScript
var test = require('../test'); // Fait appel à test.js (dossier parent)
```
On peut également ne pas indiquer de chemin relatif pour accéder au module. Dans ce cas,il faut il faut placer le fichier du module dans un sous-dossier appelé "node_modules" c'est une convention de Node.js. On appelera alors le module de cette manière:

```javaScript
var test = require('test'); // Fait appel à test.js (sous-dossier node_modules)
```
**En résumé:**

![shema module](https://user.oc-static.com/files/421001_422000/421271.png)

Remarque: Si le dossier node_modules n'existe pas, Node.js ira chercher un dossier qui a le même nom plus haut dans l'arborescence. Ainsi si votre projet se trouve dans le dossier:
 /home/mateo21/dev/nodejs/projet
Il ira chercher un dossier nommé :
* /home/mateo21/dev/nodejs/projet/node_modules, et si ce dossier n'existe pas il ira le chercher dans...

* ... /home/mateo21/dev/nodejs/node_modules, et si ce dossier n'existe pas il ira le chercher dans...

* ... /home/mateo21/dev/node_modules, et ainsi de suite !

#### Code des fichiers.js des node_modules

Dans les fichiers js de modules, on utilise du code javascript tout à fait classique. On peut y créer des fonctions. Une seule particularité, vous devez exporter les fonctions que vous voulez que d'autres personnes puissent utiliser.

Création d'un module basique qui dit "Bonjour!" et "Bye bye!"

On créer un ficher monmodule.js avec le code suivant contenant des fonctions et l'exportation de ses même fonctions:

```javaScript
var direBonjour = function() {
    console.log('Bonjour !');
}

var direByeBye = function() {
    console.log('Bye bye !');
}

exports.direBonjour = direBonjour;
exports.direByeBye = direByeBye;
```

On peut soit écrire les fonctions puis les exporter ou inclure directement l'export dans la déclaration de la fonction comme ceci:

```javaScript
exports.direBonjour = function() { ... };
```
Toutes les fonctions que l'on exporte pas dans notre fichier de module resteront privées. Ce qui signifie qu'elle ne pourront pas être appelée de l'extérieur. Par contre elle pourront tout à fait être utilisées par d'autre fonctions de votre module.

Maintenant dans le fichier principal de notre application (ex: mon_appli.js) on va importer le module puis faire appel à ces fonctions issues du modules:

```javaScript
var monmodule = require('./monmodule');

monmodule.direBonjour();
monmodule.direByeBye();
```

require() renvoie à un objet qui contient les fonctions que vous avez exportées dans votre module. Nous stockons cet objet dans une variable du même nom ou un nom ayant un sens logique, puis on appelle les fonctions dans l'appli. Ensuite on lance l'appli en allant dans le terminal positionner à l'endroit où se trouve le fichier de notre appli et on tape soit node nomFichier.js soit nodemon nomFichier.js (si nodemon est installé)

Tous les modules de Nodes sont basés sur ce principe très simple. Cela permet de découper un projet en plusieurs petits fichiers pour répartir les rôles.

### Utiliser NPM pour installer des node_modules

NPM (Node package Manager) est le gestionnaire de paquet de Node.js. Il  permet d'installer de nouveaux modules développés par la communauté et que vous pouvez retrouvés sur le site officiel de NPM: https://www.npmjs.com/ . Il existe des dizaine de milliers de modules. C'est un peu l'équivalent d'apt-get sous Linux, en une simple commande le module est téléchargé et installé. En plus NPM gèrs les dépendances. Cela signifie que si un module à besoin d'un autre module pour fonctionner, NPM ira le télécharger automatiquement.

#### Comment trouver un module sur le site de NPM (https://www.npmjs.com)

Si vous savez ce que vous chercher, il suffit de faire une recherche dans le champ de recherche du site. Vous pouvez également faire une recherche directement via la commande npm search tapée directement dans votre terminal.

Exemple: npm search postgresql

Le terminal affichera alors la liste des noms de tous les modules correspondant à votre recherche.

#### Comment installer un module avec npmjs

Pour installer un module avec npm. Placer vosu dans le dossier de votre projet avec le terminal et tapez:

```
npm install nomdumodule
```
Le module sera alors installé localement uniquement pour votre projet. Si vous voulez utiliser ce module dans un autre projet, il faudra donc relancer la commande pour l'installer dans le dossier de l'autre projet. Cela permet d'utiliser des versions différentes d'un même module en fonction de vos projets.

Faisons un essai avec le module markdown qui permet de convertir du code markdown en html. Placer vous dans le dossier de votre projet avec le terminal et entrer la commande suivante:

```
npm install markdown
```

NPM va télécharger automatiquement la dernière version du module et va la placer dans une sous-dossier node_modules situé dans le dossier de votre projet. Le plugin est installé automatiquement et vous avez accès directement aux fonctions offertes par celui-ci. Lisez la documentation du module: https://www.npmjs.com/package/markdown pour savoir comment utiliser le module. On y apprend qu'il faut faire appel à l'objet markdown à l'intérieur du module et qu'on peut appeler la focntioin toHTML pour traduire du Markdown en HtML. Essayons cela.

```javascript
var markdown = require('markdown').markdown;

console.log(markdown.toHTML('Un paragraphe en **markdown** !'));
```
affichera dans la console

```
<p>Un paragraphe en <strong>markdown</strong> !</p>
```
Le require('markdown').markdown est nécessaire selon la documentation du module qui nous dit que les fonctions sont dans l'objet "markdown", donc on va chercher directement cet objet au sein du module grâce à cette syntaxe.

#### L'installation locale et l'installation globale

NPM installe les modules localement pour chaque projet. c'est pour cela qu'il crée un sous-dossier node_modules à l'intérieur de votre projet. Si vous utilisez le même module dans 3 projets différents, il sera téléchargé et copié 3 fois afin de pouvoir gérer différentes versions du module selon vos projets.

NPM peut egalement installer des modules globaux. Ca ne sert que dans de rares cas où le module fournit des exécutable (et pas juste des fichiers.js). C'est le cas de notre module markdown par exemple. Pour l'installer globalement ,il suffit d'ajouter le paramètre -g à la commande npm comme ceci:

```
npm install markdown -g

```
Vous aurez alors accès à un exécutable md2html dans votre console

```
echo 'Hello *World*!' | md2html
```
renverra dans la console
```
<p>Hello <em>World</em>!</p>
```
**Attention:** Les modules installés globalement ne peuvent pas être inclus dans vos projets Node.js avec require() ! Ils servent à fournir des commandes supplémentaires dans la console. Si vous voulez les utiliser en JavaScript vous devez aussi les installer en mode local sans le -g à la fin de la ligne de commande.

#### Mise à jour des node_modules

Pour mettre à jour tous vos modules d'un seul coup, il suffit de taper la commande:

```
npm update
```

NPM va chercher sur les serveurs s'il y a de nouvelles versions des modules, puis mettre à jour les modules installés sur votre machine (en veillant à ne pas casser la compatibilité) et il supprimera les anciennes versions.


### Déclarer et publier son modules

Si votre programme à besoin de modules externes, vous pouvez les installer un à un, mais cela va devenir compliqué à maintenir lorsque le nombre de modules va augmenter. De plus les modules évoluent de version en version et votre programme pourrait devenir incompatible suite à une mise à jour d'un module externe!

On peut régler ce problème en définissant les dépendances de notre programme dans un fichier package.json, qui sera un peu comme la carte d'identité de notre application.

#### Création automatique du fichier package.json

On peut créer ce fichier de différentes manière, soit de manière automatique début de projet en tapant la commande:
```
npm init
```
Cette commande va générer un fichier package.json à partir de réponses fournies à une série de question posées via la console. Voici la documentation: https://docs.npmjs.com/cli/init

Attention, il faut créer ce fichier au tout début de votre projet et avant d'avoir installer des modules externes, car ce fichier se mettra automatiquement à jour avec la version des modules installé en ajoutant juste --save à la suite de la commmande d'installation des modules comme ceci:

```
npm install nomdumodule --save
```
La méthode ci-dessus installe la dernière version du module. Si vous désirez installer une version précise du module utiliser la commande:
```
npm install nomdumodule@version --save
```
Exemple
```
npm install koa-views@1.0.0 --save
```

##### Mettre à jour les paquets dans le fichier package.json

Pour mettre à jour les tout les packages (modules) dans votre appli et dans le package.json en même temps, taper la commande:
```
npm update --save
```

##### Supprimer un module dans l'application et le package.json

Pour supprimer un modules dans votre appli et dans le fichier package.json, utliser la commande:
```
npm uninstall nomdumodule --save
```

##### Pour installer les dépendances contenues dans le package.json en une fois

Pour installer en une seule opération toutes les dépendances listée dans le fichier package.json de votre projet et les placé dans le dossier ./node_modules. Placer-vous dans le dossier de votre projet et taper la commande:
```
npm install
```

On peut également utiliser à la place l'outil qui permet de générer le fichier package.json par programmation (conçu par le fabricant de npm). Toutes les informations à ce sujet se trouve ici: https://github.com/npm/init-package-json

#### Création automatique du fichier package.json

Il faut créer le fichier package.json dans le même dossier que votre application, et y introduire ce code pour commencer:

```
{
    "name": "mon-app",
    "version": "0.1.0",
    "dependencies": {
        "markdown": "~0.4"
    }
}
```

Ce fichier JSON contient 3 paires clé-valeur :

* name : c'est le nom de votre application. Restez simple, évitez espaces et accents.

* version : c'est le numéro de version de votre application. Il est composé d'un numéro de version majeure, de version mineure et de patch.

* dependencies : c'est un tableau listant les noms des modules dont a besoin votre application pour fonctionner ainsi que les versions compatibles.

Le fichier package.json peut être beaucoup plus complet, il n'y a ici que les valeurs essentielles. Plus d'infos sur : http://browsenpm.org/package.json

#### Le fonctionnement des numéros de version

Il est important pour savoir correctement gérer les dépendances de savoir mettre à jour le numéro de version de son application. Et pour cela il faut savoir comment fonctionnne les numéros de version avec Node.Js.

Pour chaque application il y a :

* Un numéro de version majeure. En général on commence à 0 tant que l'application n'est pas considérée comme mature. Ce numéro change très rarement, uniquement quand l'application a subi des changements très profonds.

* Un numéro de version mineure. Ce numéro est changé à chaque fois que l'application est un peu modifiée.

* Un numéro de patch. Ce numéro est changé à chaque petite correction de bug ou de faille. Les fonctionnalités de l'application restent les mêmes entre les patchs, il s'agit surtout d'optimisations et de corrections indispensables.

![systeme version](https://user.oc-static.com/files/421001_422000/421284.png)

Ici j'ai donc choisi de commencer à numéroter mon application à la version 0.1.0 (on aurait aussi pu commencer à 1.0.0 mais ç'aurait été prétentieux ;) ).

* Si je corrige un bug, l'application passera à la version 0.1.1 et il me faudra mettre à jour ce numéro dans le fichier packages.json.

* Si j'améliore significativement mon application, elle passera à la version 0.2.0, puis 0.3.0 et ainsi de suite.

* Le jour où je considère qu'elle a atteint un jalon important, et qu'elle est mature, je pourrai la passer en version 1.0.0.

##### La gestion des versions et des dépendances

C'est à vous d'indiquer avec quelles versions de ses dépendances votre application focntionne. Si votre application dépend du module markdown v0.3.5 très précisément vous écrirer:
```
"dependencies": {
    "markdown": "0.3.5" // Version 0.3.5 uniquement
}
```
Si vous faites un npm update pour mettre à jour lses modules externes, markdown ne sera jamais mis à jour (même si l'application passe en version 0.3.6). Vous pouvez mettre un tilde (~)devant le numéro de version pour autoriser les mises à jour jusqu'à la prochaine version mineure non incluse.(exemple: ~1.2.3 permet de mettre à jour jusque 1.2.9 mais pas 1.3.0).Le petit tilde ~ permet d'autoriser les futurs patchs de ces modules mais pas les nouvelles versions mineures ou majeures, ce qui nous garantit que leur API ne changera pas, et donc que notre code continuera à fonctionner même avec ces mises à jour. Le caractère caret (^) placé devant la version du module permettra de mettre le module à jour jusqu'à la prochaine version incluse (exemple: ~1.2.3 permet de mettre à jour jusque 1.3.0)
http://stackabuse.com/caret-vs-tilde-in-package-json/

```
"dependencies": {
    "markdown": "~0.3.5" // OK pour les versions 0.3.5, 0.3.6, 0.3.7, etc. jusqu'à la version 0.4.0 non incluse
}
```
Si vous voulez, vous pouvez ne pas indiquer de numéro de patch. Cans ce cas, les modules seront mis à jour même si l'application change de version mineure:

```
"dependencies": {
    "markdown": "~0.3.5" // OK pour les versions 0.3.5, 0.3.6, 0.3.7, etc. jusqu'à la version 0.4.0 non incluse
}
```
**Attention:** Entre deux versions mineures, un module peut changer suffisament que pour devenir incompatible avec votre application. Je recommande d'accepter uniquement les mises à jour de patch, c'est le plus sûr.


#### Publier un modules

Avec Node.js vous pouvez créer une application pour vos besoins, mais vous pouvez aussi créer des modules qui offrent des fonctionnalités. Si vous pensez que votre module pourait servir à d'autres, vous pouvez les partager facilement en les publiant sur NPM pour que d'autres personnes puissent les installer à leur tour.

Rappel: un module n'est rien d'autre qu'une application Node.js qui contient des instructions exports pour partager des fonctionnalités.

Pour publier un module sur npm

1. Créer vous un compte utilisateur sur npm avec la commande:

```
npm adduser
```

2. Une fois le compte créer placer vous dans le repertoire de votre projet à publier et vérifier que vous avez bien : un fichier package.json qui décrit votre module (minimum: nom , version et dépendances) et un fichier README.md (écrit en markdown) qui présente votre module de façon un peu détaillée, avec un mini-tutoriel pour expliquer comment l'utiliser.

3. Taper dans le terminal la commande
```
npm publish
```
Et voilà votre module peut à présent être utilisé par toute la communauté Node.js. N'hsésitez pas à parler de votre module autour de vous et de le présenter sur les mailing-lists de Node.js.


## Le framework Express.js

Pour permettre de coder plus rapidement et plus simplement dans l'environnement bas niveau de Node.js, on peut utiliser des bibliothèques et des frameworks (sortes de super-bibliothèques).

Un module est particulièrement connu sur NPM c'est Express.js. C'est un micro
-framework pour Node.js qui fournit des outils de base pour aller plus vite dans la création d'applicaton Node.js.

Attention Express.js n'est pas aussi complet et puissant que des framework comme Django ou Symfony), qui permettent par exemple de générer des interfaces d'administration.
Express permet d'être un peu moins bas niveau en offrant par exemple la possibilité de gerer plus facilement les routes (URL) de votre application et d'utiliser des templates. Ce qui est déja pas mal.

**Installation de Express.js**

Créer un nouveau dossier pour une nouvelle application, placer-vous à l'intérieur et taper la commande:

```
npm install express
```

### Les routes

Pour éviter le long et fastidieux code spaghetti if, else demandé par Node.js pour vérifier les URL du type:

```javascript
if (page == '/') {
    // ...
}
else if (page == '/sous-sol') {
    // ...
}
else if (page == '/etage/1/chambre') {
    // ...
}
```

Lorsque l'on crée un application web, on manipule des routes, ce sont les différentes URL auxquelles notre application doit répondre. Bien gérer les routes est important et le module Express nous aide dans cette tâche.

#### Les routes simples

Voici une application très basique utilisant Express. N'oubliez pas d'installer Expresse avec la commande npm install express pour que ce code s'exécute correctement

```javascript
var express = require('express');
var app = express();

app.get('/', function(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.end('Vous êtes à l\'accueil');
});

app.listen(8080);
```



Voici un code plus complet de route gérer avec Express (incluant la gestion d'erreur 404 pour les pages non trouvées)

```javaScript
var express = require('express');//On inclus Express
var app = express();//on crée un objet app en appellant la fonction express()


// On indique ensuite les différentes routes
// Lorsque l'on quelqu'un demande une route, une fonction callback est appelée

// La route / correspond à la racine et donc à l'accueil du suite ou en local à l'adresse localhost:8080
app.get('/', function(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.end('Vous êtes à l\'accueil');
});

// La route /sous-sol correspond à une sous page ou en local à l'adresse localhost:8080/sous-sol/
app.get('/sous-sol', function(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.end('Vous êtes dans la cave à vins, ces bouteilles sont à moi !');
});

// La route /etage/1/chambre correspond à une sous-sous-sous-page ou en local à l'adresse localhost:8080/etage/1/chambre/
app.get('/etage/1/chambre', function(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hé ho, c\'est privé ici !');
});

// Code permettant de gérer les erreurs 404 à inclure à la fin du code obligatoirement juste avant app.listen
app.use(function(req, res, next){
    res.setHeader('Content-Type', 'text/plain');
    res.send(404, 'Page introuvable !');
});

app.listen(8080);

```

Express permet de chainer les appels à get() et use()
Cela revient à faire app.get().get().get() ... Ca marche parce que ces fonctions se renvoient l'une à l'autre l'objet app. ce qui nous permet de raccourcir notre code. Ne soyez pas étonnés si vous voyez des codes utilisant Express écrits sous cette forme.

```javascript
app.get('/', function(req, res) {

})
.get('/sous-sol', function(req, res) {

})
.get('/etage/1/chambre', function(req, res) {

})
.use(function(req, res, next){

});
```

#### Les routes dynamiques

Express vous permet aussi de gérer des routes dynamiques, c'est à dire des routes dont certaines portions peuvent varier. voud devez écrire <code>:nomvariable</code> dans l'url de la route, ce qui aura pour effet de créer un paramètre accessible depuis <code>req.params.nomvariable</code>

Voici un Exemple:

```javascript
app.get('/etage/:etagenum/chambre', function(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.end('Vous êtes à la chambre de l\'étage n°' + req.params.etagenum);
});
```

Cette technique permet de créer de belles URL et évite d'avoir à passer par le suffixe ("?variable=valeur")pour gérer des variables.

Attention cependant toutes les routes suivantes sont valides:
* /etage/1/chambre
* /etage/2/chambre
* /etage/3/chambre
* /etage/nawak/chambre

Donc même si le visiteur indique n'importe quoi comme "nawak" dans l'url cela sera valide. Il faudra donc vérifier dans notre fonction callback que le paramètre est bien un nombre et de renvoyer une erreur (ou une 404) si ce n'est pas le cas.

Voici comment faire:

```javaScript
//Ce code permet également de tester si le paramètre du numéro d'étage est bien un numéro
// Si l'étage envoyé en get est bien un numéro, la page affiche "Vous êtes à la chambre de l'étage n°(numéro de l'étage transmis en get)"
// Si l'étage envoyé en get n'est pas un numéro, la page affiche , "Erreur 4040 - Pas un numéro etage"
// Si la page demandée en get n'existe pas, la page affiche, "Erreur 404 - Page introuvable"

var express = require('express'); //on demande l'inclusiion d'Express

var app = express(); // on crée un objet app en appelant la fonctionc express()

// Je crée une seule route pour commencer vers le repertoire racine "/" avec une fonction callback qui est appellée quand quelqu'un demande cette route et indique "Vous êtes à l'accueil"
app.get('/', function(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.end('Vous êtes à l\'accueil');
});

//On peut ensuite ajouter autant de routes (adresse URL) qu'on le souhaite par exemple (http://localhost:8080/sous-sol)
app.get('/sous-sol', function(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.end('Vous êtes dans la cave à vins, ces bouteilles sont à moi !');
});

//Pour le cas ou les étages sont transmis en get (ex: route URL http://localhost:8080/etage/1/chambre), j'utilise un systeme pour récupérer les routes dynamiques (le numéro d'étage varie et est récupérer) et en plus je teste si la variable correspondant à l'étage est bien un nombre, si ce n'est pas le cas je redirige vers page 404, si c'est bien un nombre j'affiche la page correspondante avec l'étage transmis en Get
app.get('/etage/:etagenum/chambre', function(req, res)
{
    res.setHeader('Content-Type', 'text/plain');
    if (isNaN(req.params.etagenum) == true)
    // On utilise la fonction javascript navitve isNAN() qui prend en paramètre la valeur à tester pour vérifier si la valeur en question est un nombre ou non. isNaN signifie "is not a Number", donc si l'étage renvoyé n'est pas un nombre (isNaN==true), alors on affiche la page 404 sinon (else) on affiche la page correxpondante à l'étage transmise en GET dans l'URL
    {
    // app.use(function(req, res, next){ // gestion particulière par les erreurs 404 - la page demandée n'existe aps
        res.setHeader('Content-Type', 'text/plain');
        res.status(404).send('Erreur 404- Pas un numero etage !');
    // });
    }
  else{
      res.setHeader('Content-Type', 'text/plain');
      res.end('Vous êtes à la chambre de l\'étage n°' + req.params.etagenum);
    }
});

// gestion des erreurs 404 - la page demandée n'existe pas
app.use(function(req, res, next){
    res.setHeader('Content-Type', 'text/plain');
    res.status(404).send('Erreur 404- Page introuvable !');
});

app.listen(8080);
```

### Les templates

Express nous permet d'éviter de renvoyé du code HTML directement dans Javascript ce qui oblige à utiliser un code lourd et délicat à maintenir qui ressemble à cela:

```javaScript
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
```

Pour éviter ce type de code, Express nous permet d'utiliser des templates qui sont en quelques sorte des langages faciles à écrire pour produire du HTML et de l'insérer au milieur d'un contenu variable.

C'est comme PHP qui est en fait un langage de template qui nous permet de faire ceci:

```php
<p> Êtes vous le visiteur n° <?php echo $visiteurnum; ?></p>
```

Il existe d'autres langage de templates comme Twig Smarty, Haml, JSP, Jade, EJS,... Express vous permet d'utiliser la plupart d'entre eux, avec pour chacun des avantages et des inconvénients. En général ils gèrent tous l'essentiel: variables, conditions, boucle, ...

Le principe est le suivant:
Depuis votre fichier JavaScript, vous appelez le template de votre choix en lui transmettant les variables dont il a besoin pour construire la page.

![fonctionnement template avec Node.js](https://user.oc-static.com/files/421001_422000/421341.png)

#### Les bases d'EJS

Comme il existe de nombreux langage de template je vous propose d'en choisir un EJS (Embedded JavaScript). Documentation: http://www.embeddedjs.com/

Nous allons tout d'abord l'installer dans notre projet grâce à la commandes
```
npm install ejs
```
Nous pouvons maintenant délégué la gestion de la vue (du HTML) à notre moteur de template. Plus besoin d'écrire du HTML au milieu du code JavaScript.

Dans la partie dynamique de notre code permettant de gérer les routes, nous allons effectuer une modification.

Au lieu d'avoir le code :

```javascript
app.get('/etage/:etagenum/chambre', function(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.end('Vous êtes à la chambre de l\'étage n°' + req.params.etagenum);
});
```
Nous allons mettre à la place le code suivant:
```javaScript
app.get('/etage/:etagenum/chambre', function(req, res) {
    res.render('chambre.ejs', {etage: req.params.etagenum});
});
```
Ce nouveau code fait référence à un fichier nommé chambre.ejs qui va gérer l'affichage de la page en html et incluant également les données récupérées dans l'url avec le numéro de l'étage. Ce fichier doit être placer dans un dossier nommé "views" que nous allons créer dans notre projet. A l'intérieur du dossier "views" nous allons créer un fichier appelé chambre.ejs dans lequel nous allons placer le code suivant:

```EJS
<h1>Vous êtes dans la chambre</h1>

<p>Vous êtes à l'étage n°<%= etage %></p>
```
La balise<code><%= etage %></code>sera remplacée par la variable <code>etage</code>que l'on a transmise au template avec<code>{etage: req.params.etagenum}!</code>

#### Plusieurs paramètres et des boucles

On peut envoyer plusieurs paramètres à nos templates, y compris des tableaux!
Nous allons pour tester cette fonctionnalité créer une application qui compte jusqu'à un nombre envoyé en paramètre et qui affiche un nom au hasard au sein d'un tableau.

1. Créer un dossier pour un nouveau projet

2. Créer un fichier compteur_aleatoire.js

3. Créer un dossier views

4. Créer un fichier package.json avec la commande npm init

5. installer express avec la commande npm install express --save

6. installer ejs avec la commande npm ejs --save

7. Créer un fichier template.ejs dans le dossier views

8. Dans le fichier compteur_aleatoire.js taper le code suivant:

```javascript
var express = require('express');//On inclus Express
var app = express();//on crée un objet app en appellant la fonction express()

app.get('/compter/:nombre', function(req, res) {
    var noms = ['Robert', 'Jacques', 'David'];
    res.render('template.ejs', {compteur: req.params.nombre, noms: noms});
});

// Code permettant de gérer les erreurs 404 à inclure à la fin du code obligatoirement juste avant app.listen
app.use(function(req, res, next){
    res.setHeader('Content-Type', 'text/plain');
    res.send(404, 'Page introuvable !');
});

app.listen(8080);
```

9. On transmet le nombre envoyé en paramètre et une liste de noms sous forme d'un tableau que l'on récupère ensuite dans le template ejs situé dans le dossier views. Dans le fichier template.ejs (situé dans le dossier views) taper le code suivant:

```ejs
<h1>Je vais compter jusqu'à <%= compteur %></h1>

<p><%
    for(var i = 1 ; i <= compteur ; i++) {
    %>

    <%= i %>...

<% } %></p>

<p>Tant que j'y suis, je prends un nom au hasard qu'on m'a envoyé :
<%= noms[Math.round(Math.random() * (noms.length - 1))] %>
</p>
```
On peut donc fiare des boulces avec les templates EJS. On utilise pour cela la même syntaxe que JavaScript (boucle for). Le math random permet de choisir un nom au hasard dans le tableau.

10. Lancer l'application avec la commande node compteur_aleatoire.js ou nodemon compteur_aleatoire.js

11. Aller voir le résultat dans la page du navigateur à l'adresse localhost:8080/compter/66

12. La page devrait afficher tout les chiffre de 1 à 66 et afficher un des prénom au hasard provenant du tableau qu'on lui a envoyé (soit Robert, soit Jacques, soit David)


### Aller plus loin : les middlewares

Express est un framework basé sur le concept de middleware. Ce sont des petits morceaux d'application qui rendent chacun un service spécifique. Cela permet de ne charger que les middleware dont on a besoin.

Express est fourni de base avec une quinzaine de middlewares. D'autres développeurs peuvent bien entendu en proposer d'autres via NPM. Les middlewares livrés avec Express fournissent chacun des micro-fonctionnalités.

Par exemple:

* compression: permet la compression gzip de la page pour un envoi plus rapide au navigateurs

* cookie-parser: permet de manipuler les cookies

* cookie-session: permet de géer des informations de session (durant la visite d'un visiteur)

* serve-static: permet de renvoyer des fichiers statiques contenus dans un dossier (images, fichiers à télécharger, ...)

* serve-favicon: permet e renvoyer la favicon du suite

* csrf: fournit une protection contre les failles CSRF (Cross-Site Request Forgery, que l'on peut traduire en français par Falsification de requête inter-sites). Pour plus d'explication sur les failles CSRF : https://www.leblogduhacker.fr/faille-csrf-explications-contre-mesures/

* etc ...

Certains sont tout petit comme serve-favicon et d'autres plus conséquent. Ces middlewares sont interconnectés et peuvent communiquer entre eux. Express ne fait qu'ajouter les routes et les vues par-dessus l'ensemble.

Tous ces middlewares communiquent entre eux en se renvoyant jusqu'à 4 paramètres:

* err : les erreurs
* req: la requête du visiteurs
* res : la réponse à renvoyer (la page HTML et les informations d'en-tête)
* next: un callback vers la prochaine fonction à appeler

Voici un shéma expliquant comment communiquent les middlewares:

![communication middlewares](https://user.oc-static.com/files/421001_422000/421333.png)

Les middleware d'Express étaient séparés auparavant dans un module appelé Connect. Ils sont désormais intégrés à Express.

Pour savoir comment utiliser les middlewares: http://expressjs.com/en/guide/using-middleware.html
La documentation d'Express: http://expressjs.com/en/api.html

La documentation en francais pour les middleware: http://expressjs.com/fr/guide/using-middleware.html
La documentaiont en français d'Express: http://expressjs.com/fr/

#### Utiliser les middlewares au sein d'Express

Concrètement, il suffit d'appeler la méthode <code>app.use()</code> pour utiliser un middleware. Vous pouvez les chainer (les appeler les uns à la suite des autres).

Remarque: Pensez à installer les middlewares dont vous avez besoin avec npm install avant d'exécuter ce code (middleware à installer: express, morgan, serve-favicon, serve-static), il est également nécessaire de créer un dossier nommé 'public' dans lequel on va mettre un fichier favicon que l'on appelera favicon.ico et un fichier static quelconque comme un fichier image car le code fait référence à ces éléments placé à cet endroit.

Exemple:

```javaScript
var express = require('express');
var morgan = require('morgan'); // Charge le middleware de logging
var favicon = require('serve-favicon'); // Charge le middleware de favicon

var app = express();

app.use(morgan('combined')) // Active le middleware de logging
.use(express.static(__dirname + '/public')) // Indique que le dossier /public contient des fichiers statiques (middleware chargé de base)
.use(favicon(__dirname + '/public/favicon.ico')) // Active la favicon indiquée
.use(function(req, res){ // Répond enfin
    res.send('Hello');
});

app.listen(8080);
```

Attention: L'ordre d'appel des middlewares est extrêmement important. Par exemple, on commence par activer le logger. Si on le faisait en dernier on ne loggerait rien!
Quand vous faites appel aux middlewares, réfléchissez à l'ordre car il peut impacter fortement le fonctionnement de votre application.

Dans l'exemple ci-dessus, on fait appel dans l'ordre au middlewares morgan, static (alias de serve-static) et favicon. Chaque middleware va se renvoyer des données (la requête, la réponse, la fonction suivante à appeler, ...). Chacun a un rôle très précis. Pour savoir comment les utiliser, on se réfère à la documentation: http://expressjs.com/en/resources/middleware.html
La documentation est également disponible en français ici: http://expressjs.com/fr/resources/middleware.html

En résumé, Express propose un ensemble de middlewaress qui communiquent entre eux. Appelez ces middlewares pour utiliser leurs fonctionnalités avec la commmande app.use . Veillez bien à l'ordre d'appel des middleware (par exemple on active un logger au début des opérations pas à la fin). Il faut respecter un ordre logique.


## TP : La todo lists

Nous allons réaliser une première application pour mettre en pratique les connaissances acquises dans les chapitres précédents.

Nous allons réaliser un todo list (une liste de tâches). Le visiteur pourra ajouter et supprimer des tâches.

Voici à quoi ressemble l'appli que nous allons créer:

![visuel todolist](https://user.oc-static.com/files/421001_422000/421348.png)

Dans cette application:
* On peut ajouter des éléments à la todolist via le formulaire.
* On peut supprimer des éléments en cliquant sur les croix dans la liste
* La liste est stockée dans la session du visiteur. Si quelqu'un d'autre se connecte, il aura sa propre liste.

N'oubliez pas de consulter la doc d'Express ; http://expressjs.com/fr/4x/api.html


### Besoin d'aide

1. Créer nouveau dossier
2. Se placer à l'intérieur avec le Terminal
3. Exécuter npm init pour créer un fichier package.JSON
4. Installer Express avec npm install express --save
5. Installer ejs avec npm install ejs --save
6. Créer un fichier pour notre application index.js
7. Créer les différentes routes (url). Il faut une url pour:
* lister les tâches (/todo)
* ajouter une tâche (/todo/ajouter)
* Supprimer une tâche (todo/supprimer/:id). On indique une id savoir la tâche à supprimer
```javascript
.get('/todo', function(req, res) {

});
```
Pour ajouter une tâche via un formulaire on passe par la methode post et pas par la methode get. Donc pour la route todo/ajouter, on utilisera ce code
```
.post('/todo/ajouter/', function(req, res) {

})
```
8. Chaîner les appels aux middlewares


## TP: todolist

### Stocker une session dans un cookie (par exemple tableau reprenant liste de l'utilisateur)

Installer le middleware cookie-session (npm install cookie-session --save)
Indiquer juste après le require express la ligne suivante:
```
var session = require('cookie-session'); // Charge le middleware de sessions
```

Utiliser la session

```javaScript
app.use(session({secret: 'todotopsecret'}))
```
secret envoyé au module de session est obligatoire, il permet de sécurisér les cookies de session. Envoyer la valeur de votre choix. Dautres options comme la durée de vie du cookie sont également possible. Par défault la session durera tant que le navigateur restera ouvert. (https://www.npmjs.com/package/cookie-session)


Pour éviter tout problème lié au fait que javascript n'aime pas lire des tableau vide (session vide au départ lorsque l'utilisateur n'a pas encore ajouté de tâches), créer un middlewar qui teste la présence d'une session et si ce n'est pas le cas qui crée automatiquement un tableau vide [] dans la session.

```javascript
.use(function(req, res, next){
    if (typeof(req.session.todolist) == 'undefined') {
        req.session.todolist = [];
    }
    next();
})
```

### Récupérer des paramètres depuis les formulaires

Installer le module body-parser (npm body-parser --save)
Lire la documentation: https://www.npmjs.com/package/body-parser
Après un peu de configuration , cela permet d'avoir accès à req.body.nomDuChamp.

Dans le fichier principal indiquer en haut après le require d'express:
```javascript
var bodyParser = require('body-parser'); // Charge le middleware de gestion des paramètres
var urlencodedParser = bodyParser.urlencoded({ extended: false });
```
Plus loin dans le code, utliser la récupération des données du formulaires avec le code suivant:


#### Ajouter des paramètres récupéré en post dans un tableau stocké dans une session

```javascript
/* On ajoute un élément à la todolist */
.post('/todo/ajouter/', urlencodedParser, function(req, res) {
    if (req.body.newtodo != '') {
        req.session.todolist.push(req.body.newtodo);
    }
    res.redirect('/todo');
})
```
Avec .post à l'inverse d'avec .get on récupère les données envoyée en post par un formulaire et non les données envoyée en get directement dans l'url de la page.

req.body.newtodo, contient ici le paramètre qui a été envoyé par le formulaire et qui est ajouter au tableau todolist contenu dans la session grâce à la commande push utilisée couramment en javascript pour ajouter un élément à un tableau.

#### Supprimer des éléments d'un tableau stocké en session grâce à son id récupéré en get dans l'url de la page

```javascript
/* Supprime un élément de la todolist */
.get('/todo/supprimer/:id', function(req, res) {
    if (req.params.id != '') {
        req.session.todolist.splice(req.params.id, 1);
    }
    res.redirect('/todo');
})
```
La commande splice utilisée fréquemment en javascript permet de supprimer un élément ou plusieurs éléments d'un tableau. Splice prend en paramètre le début de la suppression (l'incide à paritir duquel il faut supprimer les éléments. Attention commence à 0 et pas à 1 dans les tableaux), le nombre d'élément à supprimé).https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Array/splice

### Rediriger vers une page choisie si la page demandée n'est pas trouvée

```javaScript
var express = require('express');
var session = require('cookie-session'); // Charge le middleware de sessions
var bodyParser = require('body-parser'); // Charge le middleware de gestion des paramètres
var urlencodedParser = bodyParser.urlencoded({ extended: false });

var app = express();


/* On utilise les sessions */
app.use(session({secret: 'todotopsecret'}))


/* S'il n'y a pas de todolist dans la session,
on en crée une vide sous forme d'array avant la suite */
.use(function(req, res, next){
    if (typeof(req.session.todolist) == 'undefined') {
        req.session.todolist = [];
    }
    next();
})

/* On affiche la todolist et le formulaire */
.get('/todo', function(req, res) {
    res.render('todo.ejs', {todolist: req.session.todolist});
})

/* On ajoute un élément à la todolist */
.post('/todo/ajouter/', urlencodedParser, function(req, res) {
    if (req.body.newtodo != '') {
        req.session.todolist.push(req.body.newtodo);
    }
    res.redirect('/todo');
})

/* Supprime un élément de la todolist */
.get('/todo/supprimer/:id', function(req, res) {
    if (req.params.id != '') {
        req.session.todolist.splice(req.params.id, 1);
    }
    res.redirect('/todo');
})

/* On redirige vers la todolist si la page demandée n'est pas trouvée */
.use(function(req, res, next){
    res.redirect('/todo');
})
```

### Faire une boucle foreach dans un fichier.ejs (template EJS placé dans dossier views qui gère l'affichage de la page avec le module de template EJS)

Tout ce qui n'est pas du html et qui est soit du javascript soit des données récupérées en javascript seront écrites entre les balise <% et %>

```EJS
<ul>
<% todolist.forEach(function(todo, index) { %>
    <li><a href="/todo/supprimer/<%= index %>">✘</a> <%= todo %></li>
<% }); %>
</ul>
```

### Créer un formulaire dans un fichier.ejs (template EJS placé dans dossier views qui gère l'affichage de la page avec le module de template EJS)

```EJS
<form action="/todo/ajouter/" method="post">
    <p>
        <label for="newtodo">Que dois-je faire ?</label>
        <input type="text" name="newtodo" id="newtodo" autofocus />
        <input type="submit" />
    </p>
</form>
```

Le nom du champ ici "newtodo" entrée dans le formulaire sera utilisé pour récupéré l'information dans la fonction d'ajout de la donnée dans le tableau stocké dans la session.(dans le fichier principal - index.js)

```javascript
.post('/todo/ajouter/', urlencodedParser, function(req, res) {
    if (req.body.newtodo != '') {
        req.session.todolist.push(req.body.newtodo);
    }
    res.redirect('/todo');
})
```

## Socket.io : passez au temps réel

socket.io (https://socket.io/) est l'une des bibliothèque sles plus utilisées par ceux qui développent avec Node.js, car elle permet de faire simplement de la communication synchrone dans votre application (communication en temps réel, par exemple un Chat sur votre site)

Socket.io peut servir à tout ce qui nécessite une communication immédiate entre les visiteurs et le site (exemple: jeu où on voit évoluer les personnage sans avoir à recharger la page)

### Que fait socket.io

socket.io se base sur plusieurs techniques différentes qui permettent la communication en temps réel comme WebSocket (qui est une API JavaScript apparue environ en même temps que l'HTML5)

WebSocket est une fonctionnalité supportée par l'ensemble des navigateurs récents. Elle permet un **échange bilatéral synchrone** entre le client et le serveur.

Habituellement sur le web, la communication est asynchrone, le client demande et ensuite le serveur repond. Le serveur ne peut pas décider de lui-même d'envoyer quelque chose au client. Il faut que le client recharge la page ou fasse une action pour solliciter le serveur. (par exemple pour savoir si il a de nouveaux mails)

![communication asynchrone](https://user.oc-static.com/files/422001_423000/422334.png)

Actuellement, on a besoin d'une communcation plus réactive et immédiate. WebSocket permet de laisser une sorte de "tuyau" de communication ouvert entre le client et le serveur. Le navigateur et le serveur restent connectés entre eux et peuvent s'échanger des messages dansun un sens comme dan sl'autre dans ce tuyau. Le serveur peut décider lui-même d'envoyer un message au client.

![communication synchrone](https://user.oc-static.com/files/422001_423000/422335.png)

Attention : Ne pas confondre WebSocket et Ajax. Ajax au client et au serveur d'échanger des informations sans recharger la page. Mais en AJAX, c'est toujours le client qui demande et le serveur qui repond. Le serveur ne peut pas décider lui-même d'envoyer des infos au clients. Avec WebSocket, le serveur peut le faire.

socket.io permet d'utiliser WebSockets facilement. Tous les navigateurs ne gèrent pas WebSocket, et dans ce cas socket.io est capable d'utiliser d'autres techniques de communication synchrones qui seront géréer par le navigateur du client. Socket.io détermine pour chaque client quelle est la méthode de communication temps réel la plus adaptée : (https://socket.io/#browser-support)

* WebSocket
* Adobe Flash Socket (supporte pas websocket mais Flash installé)
* AJAX long polling (le client demande en continu au serveur si il des nouveauté pour lui)
* AJAX multipart streaming
* Forever Iframe (se base sur un iframe invisible qui se charge progressivement pour récupérer les données du serveur)
* JSONP Polling

Grâce à ces différentes techniques de communication, socket.io supporte une très grand nombre de navigateurs même anciens (ineternet explorer 5.5, safari 3 , chrome 4,Opéra 10, Safari sur IPhone et IPad et navigateur Android)

### Emettre et recevoir des messages avec socket.io

Pour utiliser socket.io, il faut d'abord l'installer. (npm install socket.io --save)

#### Premier code: un client se connecte

Quand on utilise socket.io, on doit toujours s'occuper de 2 fichiers en même temps:

* Le fichier serveur (ex: app.js): c'est lui qui centralise et gère les connexions des différents clients connectés au site.

* Le fichier client (ex: index.html) : c'est lui qui se connecte au serveur et qui affiche les résultats dans le navigateur.

**Le serveur (app.js)**

Ce code est volontairement séparé en 2 parties. Au début au charge le serveur (et on récupère et renvoie le contenu de la page index.html), ensuite on charge socket.io et on gère les évènements de socket.io

```javascript
var http = require('http');
var fs = require('fs');

// Chargement du fichier index.html affiché au client
var server = http.createServer(function(req, res) {
    fs.readFile('./index.html', 'utf-8', function(error, content) {
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end(content);
    });
});

// Chargement de socket.io
var io = require('socket.io').listen(server);

// Quand un client se connecte, on le note dans la console
io.sockets.on('connection', function (socket) {
    console.log('Un client est connecté !');
});


server.listen(8080);
```

### Ce code fait 2 choses:

* Il renvoie le fichier index.html quand un client demande à charger la page dans son navigateur.

* Il se prépare à recevoir des requêtes via socket.io. Ici, on s'attend à recevoir un seul type de message : la connexion. Lorsqu'on se connecte via socket.io, on logge ici l'information dans la console.

En tant qu'utilisateur, vous ouvrez votre navigateur à l'adresse http://localhost:8080 . On vous envoie le fichier index.html, la page se charge. Dans ce fichier, un code javascript se connecte au serveur, cette fois pas en http mais via socket.io (donc via WebSockets en général). Le client effectue donc 2 types de connexion.

* Une connexion "classique" au serveur en HTTP pour charger la page index.html
* Une connexion "temps réel" pour ouvrir un tunnel via les WebSockets grâce à socket.io

**Le client (index.html)**

Le fichier html est envoyé au serveur node.js. C'est un fichier html classique, mais contient cependant un peu de javascript qui va lui permettre ensuite de communiquer avec le serveur en temps réel via socket.io. On place le code javascript à la fin du code html (juste avant la balise de fermeture de body) et aps dans le head de la page. Cela évite que le chargement de Javascript ne bloque le chargement de la page HTML. Au final cela donne l'impression d'un page web qui se charge plus rapidement.

```HtML
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8" />
        <title>Socket.io</title>
    </head>

    <body>
        <h1>Communication avec socket.io !</h1>

        <!-- On fait récupérer au client le fichier socket.io.js automatiquemen fourni par le serveur node.js via le module socket.io (situé dans node_module après installation de socket.io). le code qu'il contient permet de gérer la communication avec le serverur du côté client, soit avec WebSockets, soit avec l'une des autres méthodes si WebSockets n'est pas supporté par le navigateur du client -->
        <script src="/socket.io/socket.io.js"></script>

        <!-- Nous pouvons à présent effectuer des actions du côté du client pour communique ravec le serveur. Dans le code ci-dessous, on s'est contenté de se connecté au serveur. Celui-ci se trouve sur ma machine d'où ladresse http://localhost:8080. Une fois le site en ligne, il faudra dapdapter ce chemin pour indiquer l'adresse du site (exl http://monsite.com) -->
        <script>
            var socket = io.connect('http://localhost:8080');
        </script>
    </body>
</html>
```
Lorsque l'on test le code avec la commande node app.js dans le terminal positionnner dans le dossier du projet. On peut voir le contenu de la page html s'afficher à la page http://localhost:8080 . Une fois la page chargée, l'ordinateur va ensuite ouvrir une connexion avec socket.io et l serveur  devrait afficher ldes informations de débogage dans la consoleK

```
$ node app.js
   info  - socket.io started
   debug - client authorized
   info  - handshake authorized Z2E7aqIvOPPqv_XBn421
   debug - setting request GET /socket.io/1/websocket/Z2E7aqIvOPPqv_XBn421
   debug - set heartbeat interval for client Z2E7aqIvOPPqv_XBn421
   debug - client authorized for
   debug - websocket writing 1::
Un client est connecté !
```

Dans mon terminal, il affiche seulement "Un client est connecté". On va pouvoir à présent échanger des messages avec le serveur.

### Envoi et réception de messages

Maintenant que le client est connecté, on peut échanger des messages entre le client et le serveur.

Il y a 2 cas de figure:

* Le serveur veut envoyer un message au client
* Le client veut envoyer un message au serveur

#### Le serveur veut envoyer un message au client

Le serveur peut envoyer un message au client lorsqu'il vient de se connecter pour lui confirmer que sa connexion s'est bien déroulée. On ajoute cela au fichier app.js avant la ligne server.listen(8080);

```javascript
io.sockets.on('connection', function (socket) {
        socket.emit('message', 'Vous êtes bien connecté !');
});
```

Lorsqu'on detecte une connexion, on émet un message au client avec socket.emit().
Cette fonction prend 2 paramètres
  * Le type de message : ici : on l'appelé message, mais cela aurait pu être deplacement_jour, attaque_joueur, etc...
  * Le contenu du message: Là on peut transmettre ce que l'on veut.
Si on veut envoyer plusieurs données différentes avec notre message, on doit les regrouper sous forme d'un objet - exemple: socket.emit('message', { content: 'Vous êtes bien connecté !', importance: '1' }); -->

Du coté du fichier index.html (le client), on va écouter l'arrivée du messages du type "message" qui a été envoyé par le serveur.

```javascript
<script>
    var socket = io.connect('http://localhost:8080');
    socket.on('message', function(message) {
        alert('Le serveur a un message pour vous : ' + message);
    })
</script>
```
Avec socket.on() on écoute les messages de type "message". Lorsque les messages arrivent, on appelle la focnction de callback qui ici consiste à afficher une boite de dialogue
Le message affiché dans la boite à dialogue sur la page web sera "Le serveur a un message pour vous : Vous êtes bien connecté !"
On affiche la boite à dialogue et on insère dans les informations affichée à l'utilisateur, le contenu du message transmis par le serveur. (Vous êtes bien connecté !)

#### Le serveur veut envoyer un message au client

Pour permettre au client d'envoyer un message au serveur, on peut ajouter un bouton sur la page web qui permet d'envoyer un message au serveur lorsque l'on clique dessus.

**Du coté client (index.html)**

On ajoute un bouton "Embêter le serveur" qui quand on cliquera dessus, enverra un message au serveur. On utilise JQuery pour la création du bouton.

```HtML
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8" />
        <title>Socket.io</title>
    </head>

    <body>
        <h1>Communication avec socket.io !</h1>

        <p><input type="button" value="Embêter le serveur" id="poke" /></p>

        <!-- On inclus le script de jquery pour facilité la récupération de l'évènment du clic sur le bouton -->
        <script src="http://code.jquery.com/jquery-1.10.1.min.js"></script>

        <!-- On fait récupérer au client le fichier socket.io.js automatiquement fourni par le serveur node.js via le module socket.io  -->
        <script src="/socket.io/socket.io.js"></script>

        <!-- Du coté du fichier index.html (le client), on va écouter l'arrivée du messages du type "message" qui a été envoyé par le serveur. -->
        <!-- Avec socket.on() on écoute les messages de type "message". Lorsque les messages arrivent, on appelle la fonction de callback qui ici consiste à afficher une boite de dialogue affichant ""Le serveur a un message pour vous : Vous êtes bien connecté !"-->
        <script>
            var socket = io.connect('http://localhost:8080');
            socket.on('message', function(message) {
                alert('Le serveur a un message pour vous : ' + message);
            })

            // Grâce à Jquery on récupère l'évènement du clic sur le bouton qui déclenche  l'envoi au serveur du message "Salut serveur, ça va?"
            // Lorsque l'on clique sur le bouton, on envoie un message de type "message" au serveur, assorti d'un contenu. Ce contenu devra être récupéré du côté serveur.
            $('#poke').click(function () {
                socket.emit('message', 'Salut serveur, ça va ?');
            })
        </script>
    </body>
</html>
```

**Du coté serveur (app.js)**

Si on veut récupérer le message de type message assorti d'un contenu envoyé par le client en cliquant sur le bouton "Embêter les serveur" il va falloi récouter les messages de type "message" dns la fonction de callback de la connexion.

```javaScript
io.sockets.on('connection', function (socket) {
    socket.emit('message', 'Vous êtes bien connecté !');

    // Quand le serveur reçoit un signal de type "message" du client    
    socket.on('message', function (message) {
        console.log('Un client me parle ! Il me dit : ' + message);
    });
});
```

Maintenant lorsque l'on lance le code et que l'on appuie sur le bouton "embêter le serveur" dans la page, on voit apparaitre dans la console du serveur:

```
Un client est connecté !
Un client me parle ! Il me dit : Salut serveur, ça va ?
```

### Communiquer avec plusieurs clients

Dans la pratique, généralement plusieurs clients seront connées à votre application Node.js et non un seul comme dans les exemples précédents. Pour simuler cela en local, ouvrir plusieurs onglet à l'adresse http://localhost:8080 . Chaque onglet sera interpréter par le serveur comme un client différents. Si cela ne marche pas essayer d'ouvrir l'adresse http://localhost:8080 dans deux navigateurs différents.

Quand on a plusieurs clients, il faut être capable:
* D'envoyer des messages à tout le monde d'un seul coup **BROADCASTS**
* De se souvenirs d'informations sur chaque client (ex: pseudo). Ces infos seront stockés dans des **Variables de session**

#### Broadcast : Envoyer un message à tous les clients
console.log(socket.mavariable);
socket.emit() du coté serveur permet juste d'envoyer un message au client avec qui vous êtes en train de discuter. Pour envoyer un message à tous les autres clients (excepté celui qui vient de solliciter le serveur), vous devez faire un **broadcast**.

Exemple

Un client A envoie un message au serveur, le serveur l'analyse et décide de broadcaster ce message pour l'envoyer aux autres cleins connectés B et C

![broadcast](https://user.oc-static.com/files/422001_423000/422340.png)

C'est le cas, dans un chat lorsque un client A écrit un message eet l'envoie au serveur. Pour que les autres voient ce message, il doit le leur broadcaster.

La commande pour réaliser un brodcast est la suivante:

```javaScript
socket.broadcast.emit('message', 'Message à toutes les unités. Je répète, message à toutes les unités.');
```
Le message broadcaster partira à tous les autres clients connectés.

On peut ajouter par exemple un un broadcast dans app.js lors de la connexion d'un client:

```javaScript
io.sockets.on('connection', function (socket) {
	socket.emit('message', 'Vous êtes bien connecté !'); // envoi au client "Vous êtes bien connecté !"
	socket.broadcast.emit('message', 'Un autre client vient de se connecter !');// envoie à tout les autres client "Un autre client vient de se connecter !"

	socket.on('message', function (message) { // receptionne le message envoyé par le client et l'affiche dans la console sous la forme de "Un client me parle! Il me dit: message transmis par le client (exemple: Salut serveur, ça va !)"
		console.log('Un client me parle ! Il me dit : ' + message);
	});
});
```
Ce code enverra à chaque nouveau client qui se connecte le message "Vous êtes bien connecté" et enverra aux autres clients déja connectés " Un nouveau client vient de se connecter"


#### Les variables de sessions

Pour reconnaitre les différents clients connectés en même temps, il faut pouvoir mémoriser des informations sur chaque client sous forme de variable de session. Par défaut socket.io ne propose pas cette fonctionnalité.

Les variables de session doivent être gérées par une bibliothèque supplémentaire sous forme de middleware comme session.socket.io (on peut voir cela comme un plugin comme Express qui ajoute des fonctionnalité)

Pour éviter de devoir comprendre comment utiliser un middleware de gestion de session, il existe une astuce qui consiste à enregister directement l'information sous la forme d'une variable dans l'objet <code>socket</code> de chaque client. C'est plus simple à mettre en place mais ce n'est pas la meilleure méthode, c'est juste une astuce pour tester rapidement. Il est préférable d'utiliser un middleware comme session.socket.io. Voir documentation: https://www.npmjs.com/package/session.socket.io

Pour permettre au serveur de retenir des infos sur chaque client connecté sans que celui-ci doivent rappeler qui il est à chaque envoi de message, on va stocker un variable de sessioon coté serveur en utilisant le code suivant:

```javaScript
socket.mavariable = mavariable;
```
Dans cet exemple, on stocke les données sous forme de variable dans l'objet <code>socket</code>correspondant au client (il y a un objet socket en mémoire sur le serveur pour chaque client)

Pour récupérer cette information par la suite, il suffira de demander ce que contient <code>socket.mavariable</code>

```javascript
console.log(socket.mavariable);
```

Lorsqu'un client se connecte, la page web va lui demnader son pseudo. Le serveur stockera le pseudo en variable de session pour s'en souvenir lorsque le client cliquera sur "Embêter le serveur". Le serveur indiquera alors dans la console à la place de "Un client me parle" , "Pseudoclient me parle"

**Du coté client (index.html)**

On va demander au chargement de la page de demander son pseudo au visiteur sous la forme d'une fenêtre prompt dans laquelle il pourra introduire son pseudo.
Il faut définir le type de message envoyer avec socket.emit, ici le pseudo envoyé sera de type "petit_nouveau" pour le différencier du type "message"

```javascript
var pseudo = prompt('Quel est votre pseudo ?');
socket.emit('petit_nouveau', pseudo);
```

**Du coté serveur (app.js)**

Le serveur doit récupérer ce signal. Il écoute les signaux de type "petit_nouveau" et quand il en reçoit un, il sauvegarde le pseudo en variable de session.

```javascript
socket.on('petit_nouveau', function(pseudo) {
    socket.pseudo = pseudo;
});
```

## TP : le super chat

![Le super Chat](https://user.oc-static.com/files/422001_423000/422453.png)

Pour ce Chat, nous allons ouvrir 2 fenêtre dans notre navigateur et nous connecté avec 2 pseudo différentents pour simuler le fonctionnement d'un chat réel entre 2 machines.

* Je demande le pseudo avec une boîte de dialogue lors de la connexions
* J'affiche le pseudo de celui qui vien tde se connecter à tout le mond edans le Chat (ex: "Gérard a rejoint le Chat")
* Lorsque lo'n saisit un message, il est immédiatement affiché dans le navigateur sous le formulaire.

### Besoin d'Aide

Nous avons besoin de 3 fichiers:

* index.html (client)
* app.js (serveur)
* package.json (carte d'identité de notre appli permettant d'installer toutes les dépendances d'un coup avec la commande npm install)

#### package.JSON

On commence par créer le fichier package.json avec la commande npm init en se placant dans le dossier de notre projets

Pour réaliser le chat on va avoir besoin de 3 modules :
* socket.io : (pour gérer la communication synchrone entre client et serveur). Documentation: https://www.npmjs.com/package/socket.io ou https://socket.io/

* express (facultatif mais + pour la facilité la maintenance du code): pour faciliter la mise en forme. Pour utiliser express avec socket.io, veuillez consulter la documentation : https://socket.io/#how-to-use. Documentation: https://www.npmjs.com/package/express

* ent (facultatif mais + pour la sécurité): qui est un tout petit module qui permet de protéger les chaines de caractères envoyées par les visiteurs pour transformer le HTML en entitiés. Cela permet d'éviter que les visiteurs s'envoient du code JavaScript dans le Chat. Documentation: https://www.npmjs.com/package/ent

#### app.js (serveur)

Ce fichier devra renvoyer une page web (index.html) à vos visiteurs lorsqu'il se connecte sur le site (lorsque l'on appellera le serveur)
L'usage d'expresse rend la syntaxe légèrement différente mais aussi plus courte.

En plus de la page web classique, le serveur Node.js devra gérer les évènements de socket.io. Il devra en gérer 2:

* nouveau_client (vous l'appelez comme vous voulez): signale qu'un nouveau client vient de se connecter au Chat. Devrait transmettre son pseudo pour pouvoir informer les autres clients avec un message de type "Robert à rejoint le Chat!"

* message: signale qu'un nouveau message a été posté. Le serveur aura pour rôle de redistribuer aux autres clients connectés un petit broadcast. On peut récupérer le pseudo du posteur dans une variable de session pour indiquer qui a envoyé le message.

#### index.html

On va commencer par créer un page html 5 basique, avec un titre h1, un formulaire composé d'un champ texte et d'un bouton, et une <div> ou une <section> qui contiendra les message du Chat (par défaut, elle sera vide)

Le code javascript du client se placera en bas de page après l'html afin d'améliorer les performance. On peut aussi si on lee souhaite le placer dans un fichier.js externes

Ce code javascript aura plusieurs rôles:

* Se connecter à socket.io
* Demander le pseudo du visiteur lorsu du chargement de la page (via un prompt()) et envoyer un signal "nouveau_client".
* Gérer la réception de signaux de type "nouveau_client" envoyés par le serveur. Cela signifie qu'un nouveau client vient de se connecter. Afficher son nom dans un message (ex: robert a rejoint le Chat!)
* Gérer la réception de signaux de type "message" envoyés par le serveur. Cela signifie qu'un autre client vient d'envoyer un message sur le Chat et donc qu'il faut l'afficher sur la page en regarde de son pseudo.
* Gérer l'envoi du formulaire, lorsque le client veut envoyer un message aux autres personnes connectées. Il faudra récupérer le message saisi dans le formuliare en Javascript, émettre un signal de type "message" au serveur pour qu'il le distribue aux autres clients, et aussi insérer ce message dans votre propre prage. Eh oui, n'oubliez pas que le broadcast du serveur envoie un message à toutes les personnes connectées mais pas à vous même. Il faut donc mettre à jour votre propre zone de Chat.

### Correction

Le projet est constitué de 3 fichiers:

* package.json: description du projet avec la liste des dépendances (express (facultatif), socket.io et ent (sécurité , équivalent htmlentities en PHP pour éviter que les clients ne s'envoie des code JavaScript malicieux)). Permet d'installer en une seule commande toutes les dépendances avec la commande npm install.
* app.js : l'application Node.js côté serveur qui gère les interactions aec les différents clients.
* index.html: la page web envoyée au client qui contient du code JavaScript pour gérer le Chat côté client.

#### package.JSON

```
{
    "name": "super-chat",
    "version": "0.1.0",
    "dependencies": {
        "express": "~3.3.4",
        "socket.io": "~1.2.1",
        "ent": "~0.1.0"
    },
    "author": "Mateo21 <mateo21@email.com>",
    "description": "Un super Chat temps réel avec socket.io"
}
```

#### app.js

```javaScript
var app = require('express')(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server),
    ent = require('ent'), // Permet de bloquer les caractères HTML (sécurité équivalente à htmlentities en PHP)
    fs = require('fs');

// Chargement de la page index.html
app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

io.sockets.on('connection', function (socket, pseudo) {
    // Dès qu'on nous donne un pseudo, on le stocke en variable de session et on informe les autres personnes
    socket.on('nouveau_client', function(pseudo) {
        pseudo = ent.encode(pseudo);
        socket.pseudo = pseudo;
        socket.broadcast.emit('nouveau_client', pseudo);
    });

    // Dès qu'on reçoit un message, on récupère le pseudo de son auteur et on le transmet aux autres personnes
    socket.on('message', function (message) {
        message = ent.encode(message);
        socket.broadcast.emit('message', {pseudo: socket.pseudo, message: message});
    });
});

server.listen(8080);
```
Ce fichier commence par les appels au différents modules (express, http, socket.io en et fs)
Ensuite on passe à la gestion des messages en temps réel avec socket.io, qui gèrent 2 type de message différents:

* nouveau_client: envoyé par un nouveau client qui vient de charger la page et qui contient son pseudo en paramètre. On l'encode avec ent.encode par sécurité pour éviter l'envoi de code JavaScript malicieux dans le pseudo. Ensuite on sauvegarde le pseudo dans une variable de session.

* message: envoyé par un client qui  veut transmettre un message aux autres personnes connectés. On l'encode avec ent.encode par sécurité spour retirer le JavaScript malicieux qu'il pourrait contenir) , et on le broadcas avec pseudo issu de la variable de session. POur envoyer plusieurs données dans un seul paramètre, on les encapsule dans un objet JavaScript, d'où le code <code>{pseudo: socket.pseudo, message: message}</code>

#### index.HtML

```HtML
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8" />
        <title>Super Chat temps réel !</title>
        <style>
            #zone_chat strong {
                color: white;
                background-color: black;
                padding: 2px;
            }
        </style>
    </head>

    <body>
        <h1>Le super Chat temps réel !</h1>

        <form action="/" method="post" id="formulaire_chat">
            <input type="text" name="message" id="message" placeholder="Votre message..." size="50" autofocus />
            <input type="submit" id="envoi_message" value="Envoyer" />
        </form>

        <section id="zone_chat">

        </section>


        <script src="http://code.jquery.com/jquery-1.10.1.min.js"></script>
        <script src="/socket.io/socket.io.js"></script>
        <script>

            // Connexion à socket.io
            var socket = io.connect('http://localhost:8080');

            // On demande le pseudo, on l'envoie au serveur et on l'affiche dans le titre
            var pseudo = prompt('Quel est votre pseudo ?');
            socket.emit('nouveau_client', pseudo);
            document.title = pseudo + ' - ' + document.title;

            // Quand on reçoit un message, on l'insère dans la page
            socket.on('message', function(data) {
                insereMessage(data.pseudo, data.message)
            })

            // Quand un nouveau client se connecte, on affiche l'information
            socket.on('nouveau_client', function(pseudo) {
                $('#zone_chat').prepend('<p><em>' + pseudo + ' a rejoint le Chat !</em></p>');
            })

            // Lorsqu'on envoie le formulaire, on transmet le message et on l'affiche sur la page
            $('#formulaire_chat').submit(function () {
                var message = $('#message').val();
                socket.emit('message', message); // Transmet le message aux autres
                insereMessage(pseudo, message); // Affiche le message aussi sur notre page
                $('#message').val('').focus(); // Vide la zone de Chat et remet le focus dessus
                return false; // Permet de bloquer l'envoi "classique" du formulaire
            });

            // Ajoute un message dans la page
            function insereMessage(pseudo, message) {
                $('#zone_chat').prepend('<p><strong>' + pseudo + '</strong> ' + message + '</p>');
            }
        </script>
    </body>
</html>
```

On trouve dans le fichier index.html tout le nécessaire côté client pour gérer le Chat:

* La connexion à socket.io

* la demande de son pseudo au client et l'envoi au serveur via un signal de type "nouveau_client". Bonus: on affiche en plus le pseudo dans le <title> de la page (dans le titre de l'onglet du navigateur) afin qu'il apparaisse dans les onglets du navigateur. C'est plus pratique pour les tests lorsque l'on ouvre plusieurs onglets de voir quel onglet correspond à quel pseudo.

* La récupération du signal "message" envoyé par le serveur. Dans ce cas, j'insère le message dans la zone #zone_chat de la page. On crée une fonction pour clea car on a aussi besoin de cette fonctionnalité au moment de l'envoi du formulaire (qui va également afficher un contenu dans la #zone_chat)

* La récupération du signal "nouveau_client" où on affiche "XXX a rejoint le Chat !"

* La gestion de l'envoi du formulaire. Il faut récupérer le message saisi par le client, l'envoyer au serveur et l'insérer dans notre page (car le serveur transmet le message à tout le monde... sauf à nous! et on veut que le message que l'on vient de poster s'affiche également dans notre flux de de Chat). On en profite aussi pour vider la zone de texte du formulaire et remettre le focus desssus et ... bloquer l'envoi "classique" du formulaire. Le <code>return false</code> est indispensable si on ne veut pas que la page se recharge suite à l'envoi du formulaire. En fait, <code>return false</code> est équivalent à la fonction de JQuery <code>preventDefault()</code>.

* La fonction InsereMessage() qui rajoute le message qu'on lui envoie avec le pseudo dans la zone de Chat, au début (prepend())et non à la fin de la zone de Chat. La fonction prepend() fait partie de JQuery. La méthode prepend () insère le contenu spécifié au début des éléments sélectionnés.

**Remarque:** Pour que le projet fonctionne, il ne faut pas oublier avant de lancer le code de faire un npm install pour installer toutes les dépendances.



**Quiz 3**

Votre score
100%
Bravo ! Vous avez réussi cet exercice !

**Question 1**
Avec quelle technologie le serveur peut-il spontanément envoyer un message à un client ?

* WebSocket (x)
* AJAX
* HTML

WebSocket est une nouvelle technologie qui permet une communication dans les deux sens entre le client et le serveur. Elle est utilisée par socket.io.

**Question 2**
Vrai ou faux ? Socket.io fonctionne aussi pour Internet Explorer 6.

* Vrai (x)
* Faux

Oui, même IE6 est géré ! Dans ce cas, socket.io n'utilise pas WebSocket mais une autre technologie, moins pratique certes, qui a le mérite de fonctionner sous IE6.

**Question 3**
Quand un client envoie au serveur qui souhaite à son tour le communiquer à tous les autres clients connectés, on dit qu'il fait un :

* Multithread
* Multicasting
* Broadcast (x)

On parle de broadcast quand on envoie un message à tous les clients connectés.

**Question 4**
Comment s'appelle l'évènement envoyé par socket.io lorsqu'un nouveau client se connecte au serveur ?

* connect
* connection(x)
* new

Cet évènement nous permet de noter qu'un nouveau client vient de se connecter à l'application.

**Question 5**
Comment s'appelle l'évènement envoyé par un client qui souhaite transmettre une information après s'être connecté à socket.io ?

* message
* ding
* information
* On peut appeler son évènement comme on le souhaite (x)

Vous êtes libres d'appeler vos évènements comme vous le souhaitez. "message" n'est qu'une possibilité parmi une infinité d'autres !

## Node.js - Semaine 3 (TP)

Nous avons vu ensemble dans ce cours sur Node.js comment réaliser une Todolist et comment échanger des messages en temps réel... mais nous n'avons jamais fait les deux en même temps !

Je vous propose donc... (roulement de tambour)... de réaliser une Todolist partagée en temps réel !

### Votre mission

Vous allez reprendre le projet de Todolist que nous avions créée, et vous allez l'améliorer pour faire en sorte qu'elle puisse être utilisée par plusieurs personnes en même temps à l'aide de socket.io. Voici les fonctionnalités attendues :

* Quand un client se connecte, il récupère la dernière Todolist connue du serveur
* Quand un client ajoute une tâche, celle-ci est immédiatement répercutée chez les autres clients
* Quand un client supprime une tâche, celle-ci est immédiatement supprimée chez les autres clients

Le serveur pourra retenir la Todolist sous le forme d'un simple array qu'il gardera en mémoire. La persistence n'est pas demandée (inutile d'utiliser MySQL ou Mongodb ;o).

L'utilisation d'Express.js est recommandée mais n'est pas obligatoire.

### Fichiers à envoyer

Vous devez renvoyer un fichier .zip contenant vos fichiers source (.js notamment) et un beau fichier package.json.

Attention : n'envoyez pas le dossier node_modules. Ce sera à la personne qui vous corrigera de les récupérer avec un simple npm install. C'est comme ça que l'on distribue des projets Node.js. ;o)

### Réalisation de l'exercice

* Télécharger le fichier corrigé de l'exercice Todolist à cet endroit: https://course.oc-static.com/ftp-tutos/cours/nodejs/ma-todolist.zip

* Créer un nouveau dossier appellé Todolist_tempsreel

* Se positionner avec le terminal dans le nouveau dossier et y placer y dézipper le dossier de la correction de l'exercice todolist. Eliminer les fichiers superflus.

* Modifier le fichier package.json pour qu'il corresponde au nouvel exercice

* Faire un npm install pour que toutes les dépendances soient installées en une seule opération à partir du fichier package.JSON

* Vérifier que la todolist fonctionne correctement avec la commande node app.js ou nodemon app.js (si nodemon est installé sur notre système pour éviter d'avoir à chaque fois rechargé la page), puis se rendre dans notre navigateur à l'adresse: http://localhost:8080/ pour tester toutes les fonctions de le todolist.

* Ok les fonctions d'ajout de tâches via le formulaire fonctionnent, de retrait de tâches de la liste en cliquant sur la croix fonctionne également. Faire un git push pour garder un point de restauration du code à ce endroit avant d'entamer des modifications.

* On ajouter les extensions ent et socket.io avec la commande npm install ent --save et npm install socket.io --save (pour que ces 2 dépendances soient automatiquement ajoutée au fichier package.json). On va dans le fichier package.json et on ajoute un ~ devant les versions de ente et socket.io pour garantir la compatibilité de version en cas de mise à jour des dépendances.

* On charge les différents modules nécessaires en veillant à les placer dans un ordre logique au début du fichier app.js

```javascript
var app = require('express')(); //Charge express . L'utilisation d'Express est recommandée mais n'est pas obligatoire.
var server = require('http').createServer(app); // Création du serveur
var io = require('socket.io').listen(server);// Charge de socket.io
var session = require('cookie-session'); // Charge le middleware de sessions
var bodyParser = require('body-parser'); // Charge le middleware de gestion des paramètres
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var ent = require('ent'); //Charge module ent pour éviter échange JavaScript malicieux en échappant caractère HTML (sécurité équivalente à htmlentities en PHP)
var fs = require('fs'); // Charge module extension inclus dans la librairie nodejs (fs = file system). Permet de lire de façon asynchrone tout le contenu d'un fichier
```

* 
