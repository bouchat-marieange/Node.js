# Aide mémoire Node.js

## Installer Node.js (à faire une seule fois)

Aller sur le site officiel de Node.js
https://nodejs.org/en/download/

**Linux (Node version 9):**

curl -sL https://deb.nodesource.com/setup_9.x | sudo -E bash -
sudo apt-get install -y nodejs

taper ensuite la commande suivante pour vérifier la version de node installée sur votre système

node -v

**Windows**

Aller sur le site officiel de node.js et télécharger la version de node.js qui correspond à votre systeme (télécharger la version zip ou mis ou exe et lancer l'installeur) suivez les instructions à l'écran. L'installateur installe 2 choses:
* Node.js (interpreteur de commande de Node.js - sert à tester des commandes javascript)
* Node.js command prompt: console de windows configurée pour reconnaitre Node.js. C'est à partir de cette console que les utilisateurs windows lance leur programme Node.js

**Mac**

Aller sur le site officiel de node.js et télécharger la version de node.js qui correspond à votre système. Le mieux est de prendre celle avec l'extension .pkg qui ouvre un assistant d'installation et cliquer sur "Suivant" jusqu'à la fin. Une fois l'installation terminée, verifier que node fonctionne correctement en tapant "node" dans la console (ouvrez une fenêtre de terminal (Finder--> applications--> Terminal. et taper la commande node -v pour vérifier la version de node installée. Pour quitter l'interpreteur faites Ctrl + D (quitte un interpreteur sous Mac ou Linux)

## Lancer un fichier.js simple avec Node

1. Créer un fichier avec l'extension .js
2. Positionner le terminal à l'endroit où se trouve le fichier
3. Taper dans le terminal node nomFichier.js,
4. Le code contenu dans votre fichier s'affiche dans la console (si console.log)
5. En local: La page s'affiche dans votre navigateur à l'adresse localhost:8080 (8080 représente le code qui a été indiqué comme port à écouter par Node, il peut varier, ne pas utiliser le port 80 utiliser pour les sites en ligne)
6. En ligne: La page s'affiche dans votre navigateur à l'adresse internet où est hébergée votre site.(indiquer d'écouter le port 80 utiliser pour les sites en ligne)

## Installer nodemon (recharge automatiquement la page sans devoir repasser par la commande node nomdufichier.js)

https://nodemon.io/

````code
npm install -g nodemon
````

Pour lancer vos fichiers utiliser maintenant la commande nodemon nomDuFichier.js au lieu de node nomDuFichier.js. Le fichier s'actualise automatiquement.


## Créer un serveur avec Node.js

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

### Récupérer la page demandée par le visiteur (indiqué dans l'url) + gestion erreur 404 (gestion des routes avec node.js)

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

## Vérification du code HTTP envoyé dans l'en-têtable

Indiquer dans le navigateur l'url de la page
Aller dans la console du navigateur (Ctrl+Maj+I), onglet Network, puis cliquer dans la liste sur le nom de la page à coté de la case à coché, puis aller dans l'onglet "header"
dans Status Code vous verrez si le statut est 200 (ok tout s'est bien passé) ou 404 (page non trouvée) ou autre code HTTP (https://fr.wikipedia.org/wiki/Liste_des_codes_HTTP)


## Récupérer les paramètres transmis dans une url

Les paramètres sont envoyés à la fin de l'URL, après le chemin du fichier.
Par exemple: http://localhost:8080/page?prenom=Robert&nom=Dupont
Les paramètres sont contenus dans la chaine ?prenom=Robert&nom=Dupont.

````javascript
var http = require('http');
var url = require('url');
var querystring = require('querystring');//récupérer séparément les différents paramètres

var server = http.createServer(function(req, res) {
    var params = querystring.parse(url.parse(req.url).query);//url parse récupère toute la chaine, est querystring permet de récupérer séparément les différents paramètres
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

## Les évèevènements

Node.js est un environnement de développement JavaScript basé sur les évènements, il est monothread et basé sur un système non-bloquant ce qui lui permet d'effectuer une seule tâche à la fois mais de ne pas devoir attendre qu'une tâche soit terminée pour en commencé une autre. Lorsque la première tâche sera terminée (évènement) alors Node.js effectuera une action donnée (ex: lorsque le fichier est télécharger, node l'affiche à l'écran). La fonction qui est appellée lorsque la tâche est terminée est appelée fonction de callback. Le fonctionnement de Node.js étant basé sur les évènements, il est essentiel de savoir comment créer des évènement et comment les "écouter" (surveiller leur exécution).

### Ecouter des évènements

Pour écouter ces évènements,il faut faire appel à la méthode on() et indiquer:

* le nom de l'évènement que l'on écoute (ici "close")
* la fonction de callback à appeler quand l'évènement survient

Exemple: On écoute évènement "close" qui survient quand le serveur est arrêté

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

On peut écouter plusieurs fois un même évènement. Faites deux fois appel à la fonction on() pour le même évènement : les deux fonctions de callback seront appelées quand l'évènement aura lieu.

### Emettre des évènements

On peut également émettre des évènements. Incluez le module EventEmitter et créez un objet basés sur EventEmitter.

Ensuite pour émettre un évènement dans votre code, il faut faire appel à emit() depuis votre objet basé sur EventEmitter en indiquant:

* le nom de l'évènement que vous voulez génére (ex:"gameover")
* un ou plusieurs eventuels paramètres à passer (facultatif)

````javascript
var EventEmitter = require('events').EventEmitter;

var jeu = new EventEmitter();

jeu.on('gameover', function(message){
    console.log(message);
});

jeu.emit('gameover', 'Vous avez perdu !');
````

Ne pas oublier que l'on peut envoyer autant de paramètres que nécessaire à la fonction de callback. Emettez simplement plus de paramètres:

````javascript
jeu.emit('nouveaujoueur', 'Mario', 35); // Envoie le nom d'un nouveau joueur qui arrive et son âge
````

Autre exemple:

```javascript
//On inclus le module 'events' de EventEmitter et on créer un objet basé sur EventEmitter
var events = require('events');
var eventEmitter = new events.EventEmitter();

//On indique ce qui va se passer quand l'évènement va se produire - Quand l'évenement cri se produit afficher dans la console "J'entends un cri"
var myEventHandler = function () {
  console.log('I hear a scream!');
}

//On indique quel évènement doit être écouter (surveiller) - surveiller quand l'évènement cri se produit et indiquer l'action stockée dans une variable (myEventHandler) qui va être effectué quand l'évènement à surveiller se produit
eventEmitter.on('scream', myEventHandler);

// On emet l'évenement (ici un cri)
eventEmitter.emit('scream');
```

## Les modules Node.js et NPM

Le noyau de Node à la base assez réduit et permet des réaliser des fonctions basiques mais il existe des milliers d'extensions, appelées modules qui permettent d'étendre ses fonctionnalités.

### Utiliser les modules natif de Node.js (ceux fournis par default)

Pour utiliser les modules natifs de Node, on utilise require().Lorsque l'on fait un require, Node.js va chercher sur notre disque dur un fichier appelé http.js ou url.js.**Attention :** Il ne faut pas mettre l'extension du fichier js du module dans le require.

```javascript
var http = require('http'); // Fait appel à http.js
var url = require('url'); // Fait appel à url.js
```

### Créer des node_modules

Les modules sont de simple fichier javavascript .js. Pour créer un nouveau module nous devons donc créer un simple fichier javascript par exemple le fichier test.js dans le même dossier et y faire appel comme ceci:

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

Remarque: Si le dossier node_modules n'existe pas, Node.js ira chercher un dossier qui a le même nom plus haut dans l'arborescence.

#### Code des fichiers.js des node_modules

Dans les fichiers js de modules, on utilise du code javascript tout à fait classique. On peut y créer des fonctions. Une seule particularité, vous devez exporter les fonctions que vous voulez que d'autres personnes puissent utiliser.

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

Dans le fichier principal de notre application (ex: mon_appli.js) on va importer le module puis faire appel à ces fonctions issues du modules:

```javaScript
var monmodule = require('./monmodule');

monmodule.direBonjour();
monmodule.direByeBye();
```
Tous les modules de Nodes sont basés sur ce principe très simple. Cela permet de découper un projet en plusieurs petits fichiers pour répartir les rôles.

### Utiliser NPM pour installer des nodes modules supplémentaires

NPM (Node package Manager) est le gestionnaire de paquet de Node.js. Il  permet d'installer de nouveaux modules développés par la communauté et que vous pouvez retrouvés sur le site officiel de NPM: https://www.npmjs.com/ .

NPM permet en une seule commande de téléchargé et d'installé un module. NPM gère les dépendances. Cela signifie que si un module à besoin d'un autre module pour fonctionner, NPM ira le télécharger automatiquement.

### Trouver un module sur le site de NPM (https://www.npmjs.com)

Soit faire une recherche dans le champ de recherche du site, soit faire une recherche directement via la commande npm search tapée directement dans votre terminal.(exemple: npm search postgresql). Le terminal affichera alors la liste des noms de tous les modules correspondant à votre recherche.

### Installer un module avec npm

Placer vosu dans le dossier de votre projet avec le terminal et tapez:
```
npm install nomdumodule
```
Le module sera alors installé localement uniquement pour votre projet. Si vous voulez utiliser ce module dans un autre projet, il faudra donc relancer la commande pour l'installer dans le dossier de l'autre projet. Cela permet d'utiliser des versions différentes d'un même module en fonction de vos projets.

NPM va télécharger automatiquement la dernière version du module et va la placer dans une sous-dossier node_modules situé dans le dossier de votre projet. Le plugin est installé automatiquement et vous avez accès directement aux fonctions offertes par celui-ci. Lisez la documentation du module pour savoir comment l'utiliser.

```javascript
var markdown = require('markdown').markdown;

console.log(markdown.toHTML('Un paragraphe en **markdown** !'));
```
affichera dans la console

```
<p>Un paragraphe en <strong>markdown</strong> !</p>
```

#### Installation locale et Installation globale

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

## Mise à jour des modules node

Pour mettre à jour tous vos modules d'un seul coup, il suffit de taper la commande:

```
npm update
```
NPM va chercher sur les serveurs s'il y a de nouvelles versions des modules, puis mettre à jour les modules installés sur votre machine (en veillant à ne pas casser la compatibilité) et il supprimera les anciennes versions.

## Le fichier package.JSON

Si votre programme à besoin de modules externes, vous pouvez les installer un à un, mais cela va devenir compliqué à maintenir lorsque le nombre de modules va augmenter.
De plus les modules évoluent de version en version et votre programme pourrait devenir incompatible suite à une mise à jour d'un module externe!

On peut régler ce problème en définissant les dépendances de notre programme dans un fichier package.json, qui sera un peu comme la carte d'identité de notre application.

Ce fichier JSON contient 3 paires clé-valeur :

* name : c'est le nom de votre application. Restez simple, évitez espaces et accents.

* version : c'est le numéro de version de votre application. Il est composé d'un numéro de version majeure, de version mineure et de patch.

* dependencies : c'est un tableau listant les noms des modules dont a besoin votre application pour fonctionner ainsi que les versions compatibles.

Le fichier package.json peut être beaucoup plus complet, il n'y a ici que les valeurs essentielles. Plus d'infos sur : http://browsenpm.org/package.json

### Création automatique du fichier package.json

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
### Mettre à jour les paquets dans le fichier package.json

Pour mettre à jour les tout les

packages (modules) dans votre appli et dans le package.json en même temps, taper la commande:
```
npm update --save
```

### Supprimer un module dans l'application et le package.json

Pour supprimer un modules dans votre appli et dans le fichier package.json, utliser la commande:
```
npm uninstall nomdumodule --save
```
### Pour installer toutes les dépendances contenues dans le package.json en une fois

Pour installer en une seule opération toutes les dépendances listée dans le fichier package.json de votre projet et les placé dans le dossier ./node_modules. Placer-vous dans le dossier de votre projet et taper la commande:
```
npm install
```
### Le fonctionnement des numéros de version

Il est important pour savoir correctement gérer les dépendances de savoir mettre à jour le numéro de version de son application. Et pour cela il faut savoir comment fonctionnne les numéros de version avec Node.Js.

Pour chaque application il y a :

* Un numéro de version majeure. En général on commence à 0 tant que l'application n'est pas considérée comme mature. Ce numéro change très rarement, uniquement quand l'application a subi des changements très profonds.

* Un numéro de version mineure. Ce numéro est changé à chaque fois que l'application est un peu modifiée.

* Un numéro de patch. Ce numéro est changé à chaque petite correction de bug ou de faille. Les fonctionnalités de l'application restent les mêmes entre les patchs, il s'agit surtout d'optimisations et de corrections indispensables.

![systeme version](https://user.oc-static.com/files/421001_422000/421284.png)

### Gestion des versions et des dépendances

C'est à vous d'indiquer avec quelles versions de ses dépendances votre application focntionne. Si votre application dépend du module markdown v0.3.5 très précisément vous écrirer:
```
"dependencies": {
    "markdown": "0.3.5" // Version 0.3.5 uniquement
}
```
Si vous faites un npm update pour mettre à jour lses modules externes, markdown ne sera jamais mis à jour (même si l'application passe en version 0.3.6). Vous pouvez mettre un tilde (~)devant le numéro de version pour autoriser les mises à jour jusqu'à la prochaine version mineure non incluse.(exemple: ~1.2.3 permet de mettre à jour jusque 1.2.9 mais pas 1.3.0). Le caractère caret (^) placé devant la version du module permettra de mettre le module à jour jusqu'à la prochaine version incluse (exemple: ~1.2.3 permet de mettre à jour jusque 1.3.0)
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
**Attention:** Entre deux versions mineures, un module peut changer suffisament que pour devenir incompatible avec votre application. Je recommande d'accepter uniquement les mises à jour de patch, c'est le plus sûr

## Publier un modules

Un module n'est rien d'autre qu'une application Node.js qui contient des instructions exports pour partager des fonctionnalités.

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

Express permet de gerer plus facilement les routes (URL) de votre application et d'utiliser des templates.

### Installation de Express.js

Créer un nouveau dossier pour une nouvelle application, placer-vous à l'intérieur et taper la commande:

```
npm install express
```

### Les routes statique avec Express.js

Express permet d'éviter le long et fastidieux code spaghetti if, else demandé par Node.js pour vérifier les URL(routes)

N'oubliez pas d'installer Express avec la commande npm install express pour que ce code s'exécute correctement

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

.listen(8080);
### Les routes dynamiques avec Express.js

Express vous permet aussi de gérer des routes dynamiques, c'est à dire des routes dont certaines portions peuvent varier. voud devez écrire <code>:nomvariable</code> dans l'url de la route, ce qui aura pour effet de créer un paramètre accessible depuis <code>req.params.nomvariable</code>

```javaScript
//Ce code permet également de tester si le paramètre du numéro d'étage est bien un numéro
// Si l'étage envoyé en get est bien un numéro, la page affiche "Vous êtes à la chambre de l'étage n°(numéro de l'étage transmis en get)"
// Si l'étage envoyé en get n'est pas un numéro, la page affiche , "Erreur 4040 - Pas un numéro etage"
// Si la page demandée en get n'existe pas, la page affiche, "Erreur 404 - Page introuvable"
.listen(8080);

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
.listen(8080);
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

### Les templates avec Express et EJS

Pour éviter un code complexe incluant des +, Express nous permet d'utiliser des templates qui sont en quelques sorte des langages faciles à écrire pour produire du HTML et de l'insérer au milieur d'un contenu variable.

C'est comme PHP qui est en fait un langage de template qui nous permet de faire ceci:

```php
<p> Êtes vous le visiteur n° <?php echo $visiteurnum; ?></p>
```

Le principe est le suivant:
Depuis votre fichier JavaScript, vous appelez le template de votre choix en lui transmettant les variables dont il a besoin pour construire la page.

![fonctionnement template avec Node.js](https://user.oc-static.com/files/421001_422000/421341.png)

Comme il existe de nombreux langage de template je vous propose d'en choisir un EJS (Embedded JavaScript). Documentation: http://www.embeddedjs.com/

Nous allons tout d'abord l'installer dans notre projet grâce à la commandes
```
npm install ejs
```
Nous pouvons maintenant délégué la gestion de la vue (du HTML) à notre moteur de template. Plus besoin d'écrire du HTML au milieu du code JavaScript.

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

### Plusieurs paramètres et des boucles

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

### Les middlewares

Express est un framework basé sur le concept de middleware. Ce sont des petits morceaux d'application qui rendent chacun un service spécifique. Cela permet de ne charger que les middleware dont on a besoin.

Express est fourni de base avec une quinzaine de middlewares.Les middlewares livrés avec Express fournissent chacun des micro-fonctionnalités.

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

La documentation en francais pour les middleware: http://expressjs.com/fr/guide/using-middleware.html

La documentaiont en français d'Express: http://expressjs.com/fr/

### Utiliser les middlewares au sein d'Express

Concrètement, il suffit d'appeler la méthode <code>app.use()</code> pour utiliser un middleware. Vous pouvez les chainer (les appeler les uns à la suite des autres).

Installer les middlewares dont vous avez besoin avec npm install avant d'exécuter ce code (middleware à installer: express, morgan, serve-favicon, serve-static), il est également nécessaire de créer un dossier nommé 'public' dans lequel on va mettre un fichier favicon que l'on appelera favicon.ico et un fichier static quelconque comme un fichier image car le code fait référence à ces éléments placé à cet endroit.

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
Express propose un ensemble de middlewaress qui communiquent entre eux. Appelez ces middlewares pour utiliser leurs fonctionnalités avec la commmande app.use . Veillez bien à l'ordre d'appel des middleware (par exemple on active un logger au début des opérations pas à la fin). Il faut respecter un ordre logique.

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
