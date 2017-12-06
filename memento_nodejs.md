# Mémento Node.js

## Qu'est-ce que NodeJS

Node.js est un framework en JavaScript qui va nous permettre de créer des serveurs et des applications en n'utilisant que du Javascript.

L'avantage de Node est d'utiliser un seul langage pour tous les morceaux d'un projet plutôt que de jongler entre différents langages tels que PHP, Java, XML, etc...

## Comment installer NodeJS

Nous allons installer NodeJS, mettre à jour sa dernière version pour pouvoir utiliser le gestionnaire de package NPM pour installer des modules indispensables tels que "express ou "socket.io". Nous allons aussi installer NVM qui permet de changer à volonté de version de NodeJS

### Télécharger NodeJS

Plusieurs possibilités:

**Installation à partir du package télécharger sur le site officiel**

* Télécharger NodeJS sur le site officiel: https://nodejs.org/en/download/ et choisir la version correspondant à votre systeme d'exploitation et lancer l'exécutable. Vous aurez ainsi la dernière version de NodeJS et de NPM.

Attention: cette méthode peut poser problème particulièrement pour les distributions Linux comme Debian, RHEL, etc... Dans ce cas tester l'installation en ligne de commande.

**Installation en ligne de commande (Linux)**

Installation du paquet Node en tapant dans le terminal la commande suivante: 

````code
sudo apt-get install -y nodejs | node -v
````

Attention si une version plus ancienne de nodejs est déja installé sur votre ordi Linux, cela renverra une erreur. Il est également possible de désinstaller nodejs et ses fichier de configuration en tapant dans la console:

````code
sudo apt-get --purge autoremove nodejs
```

Vous pouvez vérifier qu'une version plus récente de NodeJs est déja installé et de quelle version il s'agit en tapant dans le terminal: 

````code
node -v
````

Si la réponse sur le terminal est :

````code
v9.2.0

````
C'est ok

Si c'est une version de type 4.x il faut upgrader avec les commandes suivantes:

Pas de panique, passer alors directement à l'étape suivante pour mettre à jour votre version de nodejs grâce à NVM qui va nous permettre de géer notre version de NodeJS. Il n'est pas présent à la base avec Node, il faut donc l'installer en tapant dans le terminal:  

````code
curl https://raw.githubusercontent.com/creationix/nvm/v0.30.2/install.sh | bash

````

On peut à présent mettre à jour la NodeJS avec NVM en tapant dans le terminal: 

````code
nvm install 9
````

En tapant la commande :
````code
node -v
````

il devrait renvoyé quelque chose comme 
````code
v9.2.0
````
Voilà nodejs est à jour et on dispose de NVM pour gérer sa version. On peut désormais utiliser NPM qui est totalement indispensable si on veut développer nos propres applications en Node.

## Utiliser NPM

NPM signifie Node Package Manager. Cet outil va nous permettre d'installer des packages ou des modules dans NodeJS ou plus spécifiquement dans nos projets.

### A quoi vont servir ces modules

Les modules installés avec NPM permettent de créer rapidement des applications sans devoir réinventer systématiquement la roue. Ils sont incontournables dans la majorité des projet en NodeJs aujourd'hui.

Même le serveur HTTP de ce site est fait en node et utilise plsuieurs module tels que express ou ejs.

### Initialiser un projet

Quand on initialise une projet avec NPM, celui-ci crée un fichier package.json. Ce fichier contient non seulement le nom et la version du projet mais aussi tout les modules utilisés par le projet.

Cela vous servira à lister tout les modulesdont vous avez besoin, ce qui permettra de tous les réinstaller par la suite en cas de besoin.

Comme pour NVM (gestion de version de NodeJS), NPM s'utilise en lignes de commandes via le terminal. 

Pour initialiser un projet on utilise la commande suivante:

````code
npm init
````
NPM vous demandera le nom et la version du projet.Les modules que vous installerez y seront ajouté à la liste au moment ou vous les installerez.

Poru installer des package par la suite et le sauver comme une dépendance dans le fichier package.json, utiliser la commande: 

````code
npm install <pkg> --save
````

### Installation globale ou locale

NPM s'utilise de deux manière:

* Soit on **installe un module globalement** dans NodeJS, ce qui permet de l'utiliser dans touts vos projets.


* Soit on **installe le module uniquement dans une projet** en particulier si on n'en a besoin que pour ce projet là.

#### Installation globale

Pour installer un module globalement, on utilise la commande:

````code
npm install -g create-react-app
````

On ouvre le terminal à la racine et on tape cette commande. Cela n'a pas d'importance car le -g indique de toute façon que le module est installé en global et donc que sa portée se fera sur tout les projets et pas uniquement sur le projet en cours dans lequel la commande aura été tapée.

Dans cet exemple, le -g dans la commande indique au manager que l'on souhaite installer un package globalement. Ici on installe le paquet "Create React App" qui permet de générer un projet en React sans devoir trouver les dépendances vous-même, sans devoir écrire tous les fichiers de base qui font fonctionner ce genre d'applications en gagnant du même coup des heures de préparation.

Avantage: on peut utiliser le module create-react-app où l'on veut.

#### Installation locale

Pour installer un module en local (pour un seul projet), on utilise la même commande mais sans le -g

````code
npm install express
````
Cette commande qui n'inclus pas le -g, permet di'nstaller express dans un projet existant.
Cette méthode installera le module uniquement dans le projet de votre choix. Il faut donc que votre terminal soit dans le bon répertoire (celui de votre projet) lorsque vous lancer cette commande sinon cela ne sert à rien.

#### Mettre un paquet à jour

Pour mettre à jour un paquet, on utilise la commande suivante:

````code
npm update -g create-react-app
````

Dans l'exemple, on met à jour le paquet create-react-app. Si on indique uniquement la commande:
 
````code
npm update -g
```` 

Le gestionnaire va mettre à jour tous les paquets installés en global.

Pour mettre à jour uniquement tout les paquets de votre projet enlever le -g, utiliser la commande:

````code
npm update
```` 

Dans un cas comme dans l'autre, NPM va trouver en ligne, dans une vaste base de données, tous les modules déjà crées auparavant par la communauté de NodeJS. Attention, sans connexion à internet, vous ne pourrez pas faire fonctionner NPM correctement.

Le site https://www.npmjs.com/ est la source depuis laquellet NPM télécharge tous les modules. Vous pourrez également trouvez beaucoup de renseignements sur [la documentation en ligne de npmjs.com](https://docs.npmjs.com/)

#### Quels modules choisir pour son projet

Selon nos besoins et les fonctionnnalités que l'on veut développer ou utiliser, on choisira les modules adaptés. Mais avant d'utiliser les modules, ils faut comprendre ce que sont éxactement les modules.


## Les modules

Un module est un fichier contenant plusieurs codes (variables, fonctions, objets, classes, etc...)
pouvant être appelés dans un autre fichier. Le fonctionnement ressemble à celui des links css ou script jss sur les fichiers html, il y a cependant des différences. Voici comment ca fonctionne.

Tout d'abord, il faut créer une page "app.js" sur laquelle écrire notre code

````javascript
var sayHelloInEnglish = function() {
 return "HELLO";
}
````

Une fois cela fait, il faut expliquer à l'ordinateur que nous voulons exporter cet élément pour l'utiliser sur une autre page JS, que nous allons appeler ici "use.js".

### L'export

A la fin de votre code ajouter la ligne suivante pour indiquer que l'on veut exporter cet code pour l'utiliser sur la page use.js

````javascript
module.exports.[nom désiré] = "noms de variable/fonction/etc";
````

Donc dans notre exemple cela donnera ceci:

````javascript
var sayHelloInEnglish = function() {
 return "HELLO";
}
module.exports.English= sayHelloInEnglish;
````

### Require

Maintenant que le module est exporté, il faut l'importer dans use.js pour ce faire, il suffit d'utiliser la méthode "require" dans le fichier use.js qui va aller chercher votre module et le rendre utilisable.

Voici comment faire:

Tout d'abord, la méthode doit être appelée dans une variable afin de pourovir l'utiliser et il faut indiquer la position du module dans la méthode require (comme ddnas le href d'un link css par exemple)

````javascript
var Something= require("app.js");
````

Votre fonction est maintenant importée, maintenant pour l'utiliser, il suffit de l'appeler sous le nom de votre require , un point puis, le nom que vous avez donné à votre export (dans notre exemple le Something et le English).

**Pourquoi donner un nom à notre export?**

Très souvent dans les modules, il n'y a pas qu'un seul élèment, il faut donc donner un nom à nos différents éléments pour pouvoir les utiliser, par exemple:

````javascript
var sayHelloInEnglish= function() {
 return "HELLO";
}
var sayHelloInSpanish= function() {
 return "Hola";
}
module.exports.English= sayHelloInEnglish;
module.exports.Spanish= sayHelloInSpanish;
````

Nous avons maintenant deux fonctions dans un seul module, toutes les deux importables et utilisables sous un suele et même require.

````javascript
var Something= require("app.js");
console.log(Something.English()); // va nous logger HELLO
console.log(Something.Spanish()); // va nous logger Hola
````

### Pour plus d'infos

N'hésitez pas à suivre le [cours de net ninja](https://www.youtube.com/watch?v=xHLd36QoS4k&list=PL4cUxeGkcC9gcy9lrvMJ75z9maRw4byYp&index=6), il est bien fait ! 


## Créer un serveur web avec Nodejs

Nous allons apprendre à créer notre propre serveur web grâce à la bibliothèque node, afin de communiquer du contenu à notre navigateur via les modules et méthodes que node nous propose. Bref, mettre des page en ligne avec NodeJS.

### Le module HTTP

Pour commencer, nous aurons besoin de créer un fincier nommé "server.js" et d'y inclure le module "http", qui nous donnera les outils nécessaires,  pour communiquer avec le navigateur via le protocole HTTP (Hyper Text Transfer Protocol):

´´´´javascript
var http = require("http");
´´´´

### La methode createServer

Une fois le module "http" inclus dans notre fichier "server.js" nous aurons acccès à la méthode "http.createServer()" qui comme son nom l'indique, nous permettra de créer notre serveur. Cette méthodeva nous passer deux paramètres : les objets request et response (en gros, ce que le serveur va recevoir et ce qu'il va renvoyer) 

´´´´javascript
var server = http.createServer(function(request, response) {
});
´´´´

### Les objets Request et Response

* L'objet "request"nous fournir des informations concernant la requête client tel que son url, les en-têtes HTTP, ...

* L'objet "response" servira à retourner des données comme du texte , du html, un fichier, ...

Le but étant de communiquer du contenu à notre navigateur, ici suel l'objet "resonse" et quelques-unes de ces méthodes vont nous intéresser.

La première étape consistera à appeler la méthode "response.writeHead()" qui va definir le statut de notre requête http ainsi que le type de contenu que l'on souhaite retourner.

Ensuite "response.write()" va tout simplement permettre de concevoir notre document html passé en argument.

Et enfin "response.end()" viendra signifier la fin de notre réponse.

´´´´javascript
response.writeHead(200, {"Content-Type": "text/html"});
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
response.end();
´´´´

### La méthode listen

La dernière méthode appelée dans notre fichier sera "server.listen()", qui va lier notre serveur au port de notre choix. Ici nous utilisons le port 8080 mais libre à vous d'utiliser un autre port afin d'accéder à votre serveur web.

´´´´javascript
server.listen(8080);
´´´´

### Démarrer le serveur

Et voilà, il ne nous reste plsu qu'à **démarrer notre serveur via le terminal grâce à la ligne de commande** ci-dessous (en se plaçant bien entendu dans le dossier ou se trouve notre fichier server.js

´´´´javascript
node server.js
´´´´

et à admirer notre magnifique message "hello world" en tapant dans notre navigateur l'adresse suivante: 

http://localhost:8080/

Notre serveur fonctionne et peut à présent servir du HTML, nous allons à présent voir comment échanger des informations avec celui-ci grâce aux évènements.


## Les évènements

Votre serveur tourne désormais sur le port que vous avez choisi dans server.listen().

Nous allons à présent nous pencher sur les évènements. Vous vous rappellez de addEventListener() en Javascript? Cette fonction sert à exéctuter du script lorsqu'un évènement déclencheur se produit.

En NodeJS, les évènements fonctionnent unpeu de la même manière, à la différence que le sévènements peuvent être créés, configurés et personnalisés selon vos besoins.

Voici par exemple, un évènement existant par défaut dans NodeJS: 

´´´´javascript
var fs = require('fs');
var rs = fs.createReadStream('./fichier');
rs.on('open', function() {
 console.log('Le fichier est maintenant ouvert!!!');
});
´´´´

Dans ce code, en ligne 1, nous importons le module "fs" et à la ligne 2, nous appelons la méthode "createReadStream() de fs sur une nouvelle variable nommées rs.

## Créer ses propres événements

En NodeJS, nous pouvons créer nos propres évènements pour pouvoir exécuter toutes les tâches que l'on veut sur n'importe quel évènement.

Cependant, pour faire cela il faudra importer le module eventes pour que cela fonctionne. si vous avez oubliez comment on fait, voici la commande terminal adéquate, à n'effectuer que dans la racine de votre projet car non globale 

````code
npm install events
````
A la racine du dossier de notre projet (dans lequel à été créer un sous-dossier node_modules avec un sous-dossier "events"), on va créer un nouveau fichier creer_evenement.js 

´´´´javascript
var events = require('events');
var eventEmitter = new events.EventEmitter();
// Creation de l'évenement
var myEvent = function() {
 console.log('Vive le terminal');
}
// Application de l'événement à un cas
eventEmitter.on('terminal', myEvent);
// Lance l'évenement "aimeTerminal"
eventEmitter.emit('terminal');
´´´´

En ligne 1, nous avons importé le module "events" dans notre script avec un require()
En ligne 2, nous avons créerun objet evnetEmitter qui perttra de faire fonctionner nos évènements
En ligne 4, nous créons une fonction myEvent() que l'on voudra déclencher sur évènement.
En ligne 8, on lance notre fonction lorsque l'objet eventEmitter reçoit le signal 'terminal'. L'objet écoute, ou attend, de recevoir ce signal. En deuxième paramètre de on(), on indique la commande qui dois se déclencher, en l'ocurrence il s'agit ici de la fonction myEvent().

En ligne 10, notre fonction s'exécute. Ce n'est que si le emit ('terminal') de la ligne 10 s'exécute que le on() que nous avons écrit en ligne 8 se lancera.

L'intérêt de emit() est qu'il peut s'exécuter quand vous le désirez: à l'appui d'une touche, sur un lien, sur un bouton, etc ...

On peut approfondir ses connaissances et créer des applications de plus en plus complexes en testant et en s'instruisant sur la [documentation NodeJS concernant les évènements](https://nodejs.org/api/events.html) 



__________________________________________________________________________________________________________
Chapitre à revoir car pas clair ce qui doit être dans quels fichiers et comment liés les fichiers entre eux. 

## Les WebSocket

Les websockets sont très pratiques car ils permettent de communiquer en temps réel entre la page web et node. Plus besoin de rafraichir la page pour afficher les nouvelles informations. 

La même page peut envoyer des informations sans passer par un formulaire et recevoir des informtions en direct et tout ça en javascript!

Du coté serveur, pour gerer les websocket avec nodeJS vous aurez besoin d'installer le module socket.io avec NPM. Petit rappel voici comment faire. Il est conseillet d'installer socket.io en local dans chaque projet en nécessitant l'usage et non en global pour éviter d'allourdir systematiquement tout les projets avec des modules que l'on utilisera pas systématiquement. Donc on se place dans le dossier de son projet, on ouvre le terminal puis on tape la commande suivante:

````code
npm install socket.io
````

Du coté client, pour gére les websocket avec nodeJS vous aurez besoin d'inclure la version client de socket.io sur vos pages web avec le code suivant: Ce code devra être insérer juste avant la balise de fermeture </body> de vos pages html situées à la racine de votre dossier de travail (par exemple: index.html)

**A placer dans la page index.php situé à la racine du dossier de travail:**

````code
<script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.0.4/socket.io.js"></script>
````

### Fonctionnement de base

Pour initialiser socket io, il ne suffit pas de créer un objet, il faut aussi lui dire d'utiliser le serveur quer vous aurez créer plus haut. Si vous travailler dans une autre dossier, il faut faire un copier coller du contenu du fichier server.js dans un nouveau fichier server.js que l'on place à la racine du dossier de travail.

**A placer dans la page websocket.js" situé à la racine du dossier de travail:**

````javascript
var io = require('socket.io')(server);
````

Il faut également que le server soit lié sur un port avant d'utiliser socket.io

````javascript
server.listen(8080);
````

Il faut attendre que la connexion websocket soit établieavec la page web avant de recevoir et d'envoyer des données. Pour cela il faudra attendre que l'évènement connections soit enclenché.

````javascript
io.on('connection', function(socket) {
});
´´´´

Pour se connecter coté client: 

````javascript
var socket = io('http://localhost');
´´´´

Pour communiquer, socket ido utilise des evenements. On peut d'un coté écouter un évènement et de le l'autre envoyé des messages à ces évènements. On peut créer autatn de type d'évènement que l'on veut mais aussi décider de n'en écouter que certain d'entre eux. 

Pour envoyer un évenement de type bienvenue au client par exemple (côté serveur)

````javascript
socket.emit("bienvenue","Bonjour ceci est votre 1ere connection");
´´´´

Et pour le recevoir côté client:

````javascript
socket.on('bienvenue', function(data) {
 alert("le serveur nous dit :"+data);
});
´´´´

L'inverse est aussi possible, où le client envoye un message et le server écoute.

______________________________________________________________________________________________________




