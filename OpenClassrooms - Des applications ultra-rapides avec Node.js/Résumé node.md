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






