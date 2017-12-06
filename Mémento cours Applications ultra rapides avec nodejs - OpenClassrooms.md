# Mémento cours Applications ultra rapides avec nodejs - OpenClassrooms

Node.js nous permet d'utiliser le langage JavaScript sur le serveur... Il nous permet donc de faire du JavaScript en dehors du navigateur !

On peut toujours utiliser du JavaScript côté client pour manipuler la page HTML. Ca, ça ne change pas.

Par contre, Node.js offre un environnement côté serveur qui nous permet aussi d'utiliser le langage JavaScript pour générer des pages web. En gros, il vient en remplacement de langages serveur comme PHP, Java EE, etc.

Parce que JavaScript est un langage basé sur les évènements, donc Node.js est lui-même basé sur les évènements. Du coup, c'est toute la façon d'écrire des applications web qui change ! Et c'est de là que Node.js tire toute sa puissance et sa rapidité

**Node.js n'est pas un framework**. Node.js est un environnement très bas niveau. Il se rapproche donc en quelque sorte plus du C que de PHP, Ruby on Rails ou Django. Voilà pourquoi il n'est pas vraiment conseillé aux débutants.
Notez qu'il existe des **frameworks web comme Express** qui sont basés sur Node.js. Ils nous permettent d'éviter les tâches répétitives qui nous sont imposées par la nature bas niveau de Node.js, mais ils restent quand même plus complexes à utiliser que des langages comme PHP.

## Pourquoi Node.js est-il si rapide?

* moteur V8 de Google Chrome qui est réutilisé par Node.js, qui est optimisé et fiat de la compilation JIT (Just In Time). Il transforme le code Javascript très rapidement en code machine et l'optimise même grâce à différentes procédés (code inlining, copy elision, etc...)

* fonctionnement **non bloquant**. Dans le modèle **bloquant** les actions sont effectuées dans l'ordre. Une opération doit être terminée avant de commencée la suivante. Dans le fonctionnement non bloquant, les lignes de code ne sont pas exécutées dans l'ordre, mais grâce à une fonction callback on peut effectuer plusieurs opérations en même temps (donc plus rapidement) et ne pas devoir attendre qu'une opération soit terminée pour en commencé une autre. Dès que l'évènement que l'on a définit se produit alors la fonction callback exécute le code demandé, en attendant, on peut fait en parallèle d'autres opération.

En code cela donne ceci. On utilise **une function comme paramètre d'une fonction**.Cette fonction dans la fonction est appelée **fonction callback** et indique ce qui doit être fait au moment ou l'évènement que l'on aura determiné aura eu lieu.

**Fonction callback** est une fonction qui s'exécute dès lors qu'un évènement déterminé survient.

````javascript
request('http://www.site.com/fichier.zip', function (error, response, body) {
    console.log("Fichier téléchargé !");
});
console.log("Je fais d'autres choses en attendant...");
````

Code identique mais dans laquelle la fonction callback est stockée dans une variable

````javascript
// Résultat identique au code précédent

var callback = function (error, response, body) {
    console.log("Fichier téléchargé !");
});

request('http://www.site.com/fichier.zip', callback);
console.log("Je fais d'autres choses en attendant...");
````

La fonction callback, comme toute fonction n'est exécutée que lorsqu'elle est appelée, c'est le cas au moment ou le fichier est téléchargé, la fonction callback est alors exécutée.

Cette manière de coder un peu particulière devient très intéressante si par exemple on vuet télécharger puis afficher 2 fichiers. Le code sera alors:

````javascript
var callback = function (error, response, body) {
    console.log("Fichier téléchargé !");
});

request('http://www.site.com/fichier.zip', callback);
request('http://www.site.com/autrefichier.zip', callback);
````

Grâce au modèle non bloquant le téléchargement des 2 fichiers est lancé immédiatement. Il ne faut pas attendre que le premier fichier soit télécharger pour télécharger ensuite le deuxième (cela prend moins de temps) Durant le téléchargement des fichiers, Node.js peut d'effectuer d'autres choses (afficher des choses,etc... ) en attendant que les actions longues soient terminées!

## Installation de Node.js

Voir https://openclassrooms.com/courses/des-applications-ultra-rapides-avec-node-js/installer-node-js

## Comment lancer un programme Node.js?

Il suffit de taper dans la console node suivi du nom du fichier.js

## Une première application avec Node.js

Contrairement au travail avec PHP dans lequel le serveur Apache peut traiter plusieurs requêtes de visiteurs en même temps en lançant plusieurs processus (thread utilisant un processeur différent du serveur, et se charge de tout.

Avec Node.js on n'utilise pas de serveur web HTTP comme Apache. C'est à nous de créer le serveur!
Attention Node.js est monothread, c'est à dire quil n'y a qu'un seul processus, qu'une seule version du programme qui peut tourner à la fois en mémoire.Cependant Node.js compense le fait de ne savoir faire qu'une chose à la fois et ne tourner que sur un seul noyau du processeur par sa manière hyper efficace  de traiter l'information ce qui le rend malgrès tout plus rapide.
Cela est dû à la nature "orientée évènements" de Node.js. Les applications utilisant Node ne restent jamais à rien faire. Dès qu'il y a une application un peu longue, le programme redonne la main à Node.js qui va effectuer d'autres actions en attendant qu'un evènement survienne pour dire que l'opération est terminée . Node ne traitera donc qu'une requête à la fois mais dès qu'il sera en attente sur l'une d'elle il passera à l'exécution d'opération sur les autres et les fera donc progresser toutes simultanément et les terminera au final dans leur ensemble plus rapidement.

## Construire son serveur HTTP

C'est le code minimal pour un projet Node.js. Placer-le dans un fichier qui vous appellerz serveur.js (par exemple)

Ce code crée un mini-serveur qui renvoie un message "Salut tout le monde" dans tous les cas, quelle que soit la page demandée. Ce serveur est lancé sur le port 8080 à la dernière ligne.

````javascript
var http = require('http');

var server = http.createServer(function(req, res) {
  res.writeHead(200);
  res.end('Salut tout le monde !');
});
server.listen(8080);
````

````javascript
var http = require('http'); // effectue un appel à une bibliothèque http de Node.js
````
ici la bibliothèque "http" qui nous permet de créer un serveur web. Il existe des tonnes de bibliothèques comme celle-là pouvant être téléchargées avec NPM, le gestionnaie de paquets de Node.js.

La variable http représente un objet JavasScript qui va nous permettre de lancer un serveur web. C'est précisément ce que l'on va faire avec ligne de code suivante:


````javascript
var server = http.createServer(function(req, res) {
  res.writeHead(200);
  res.end('Salut tout le monde !');
});
// On appelle la fonction createServer() contenue dans l'objet http et on enregistre ce serveur dans la variable server.
````

Vous remarquerez que la fonction createServer prend un paramètre qui est une fonction, c'est pour cela que l'instruction est un peu compliquée puisqu'elle s'étend sur plusieurs lignes. Tout le code ci-dessus correspond à l'appel à createServer(). Il comprend en paramètre **la fonction à exécuter quand un visiteur se connecte à notre site.**

Il est également possible de faire cela en deux temps. La fonction à exécuter est la fonction de callback. On peu tla définir avant dans une variable et transmettre cette variable à createServer(), ainsi le code ci-dessous est strictement identique mais peu sembler plus clair à certains:

````javascript
// Code identique au précédent

var instructionsNouveauVisiteur = function(req, res) {
  res.writeHead(200);
  res.end('Salut tout le monde !');
}

var server = http.createServer(instructionsNouveauVisiteur);
````

La compréhension des fonctions de callbacks sont essentielles pour comprendre comment fonctionne Node.js car il y en a partout et en général, elles sont placées à l'intérieur des argurments d'une autre fonction comme dans la première version du code indiquée plus haut. Cela peut paraitre un peu délicat mais l'entrainement vous permettra de prendre rapidement le pli.

Attention, n'oubliez pas de bien fermer la fonction de callback avec une accolade, puis de fermer les parenthèses d'appel de la fonction qui l'englobe.puis de placer le point-virgule. Bref c'est les }); à la dernière ligne du code.

La fonction de callbak est donc appellée à chaque fois qu'un visiteur se connecte à notre site. Elle prend 2 paramètres:

* La requête du visiteur (req dans mes exemples): cet objet contient toutes les informations sur ce que le visiteur à demandé. On y trouve le nom de la page appelée, les paramètres, les éventuels champs de formulaires remplis, ... Bref toutes les requêtes

* La réponse que vous devez renvoyer (res dans mes exemples): c'est cet objet qu'il faut remplir pour donner un retour au visiteur. Au final, res contiendra en général le code HTML de la page à renvoyer au visiteur.

Ici on fait 2 choses très simple dans la réponse:

````javascript
res.writeHead(200);
res.end('Salut tout le monde !');
````

* On renvoie le code 200 dans l'en-tête de la réponse, ce code signifie au navigateur "OK tout va bien" (cfr code statut pour voir la correspondance des code et leur signification, par exemple 404 signifie que la page n'a pas été trouvée, 200 signifie que la requête HTTP a été traitée avec succès)
En général du code HTML, le serveur renvoie en général tout un tas de paramètre en en-tête. Il faut connaitre la norme HTTP qui idindique comment client et serveurs doivent communiquer pour bien l'utiliser. Voilà entre autre d'où vient la complexité de Node.js qui est de bas niveau mais nous permet de comprendre tout un tas de choses.

* Ensuite on termine la réponse(avec end() en envoyant le message de notre choix au navigateur. Ici, on n'envoie même pas de HTML, juste un texte brut.

* Enfin, le serveur est lancé et "écoute" sur le port 8080 avec l'instruction:

````javascript
server.listen(8080); // En gros il attend de voir si une connexion 200 à lieu pour exécuter les instructions qu'on lui a demandé d'exécuter lorsque cet évènement se produira.
````

**Attention:** on évite d'utiliser le port 80 qui est normalement réservé aux serveurs web, car celui-ci peut-être déja utilisé par votre machine. Ce port 8080 sert jsute pour nos tests évidememment, une fois en production il est conseillé au contraire d'écouter cette fois sur le port 80 car c'est à cette porte (à ce port ) que vos visiteurs iront taper en arrivant sur votre serveur.

## Tester le serveur HTTP

Pour tester votre premier serveur, rendez-vous dans la console et taper

````code
node serveur.js
````

La console n'affiche rien et ne réponds pas, ce qui est parfaitement normal. Ouvrez maintenant votre navigateur et rendez-vous à l'adresse http://localhost:8080 . Vous allez vous connecter sur votre propre machine sur le port 8080 sur lequel votre programme Node.js est en train d'écouter! Celui-ci va reconnaitre qu'une connexion s'est effectivement produite (l'évènement à eu lieu) et va donc lancer l'éxécution de son instruction demandant l'affichage du message "Salut tout le monde! directement sur la page en texte brut.(on pourrait y mettre plutôt du html)

**Pour arrêter votre serveur Node.js**, retournez **dans la console et faites Ctrl+C pour couper la commande**.

## Retourner du code HTML

Nous avons crée notre première vraie application avec son serveur web embarqué,mais elle est très minimaliste.

* Le texte renvoyé est du texte brut, il ne comporte même pas de HTML
* L'application renvoie toujours le même message quelle que soit la page appellée (http://localhost:8080, http://localhost:8080/mapage, http://localhost:8080/dossier/autrepage)

Nous allons voir comment remédier à ces deux problèmes et améliorer notre application.

Tout d'abord nous allons apprendre à renvoyer du HTML. Il y a des règles à respecter entre le client et le serveur. Ils communiquent en se basant sur la norme HTTP inventée par Tim Berners-Lee. Cette norme est à la base du Web (tout comme le langage HTML qui a aussi été inventé par Tim Berners-Lee)

La norme HTTP dit que le serveur doit indiquer le type de données qu'il s'apprête à envoyer au client. Le serveur peut en effet renvoyé différents types de données:

* Du texte brut : text/plain
* Du HTML : text/html
* Du CSS : text/css
* Une image JPEG : image/jpeg
* Une vidéo MPEG4 : video/mp4
* Un fichier ZIP : application/zip
* etc.

Ce sont ce qu'on appelle les types MIME. Ils sont envoyés dans l'en-tête de la réponse du serveur. Vous vous souvenez comment on écrit l'en-tête de la réponse avec Node.js

````javascript
res.writeHead(200);
````
Nous avions seulement indiqué le code de la réponse 200 qui signifie "ok pas d'erreur". Nous devons rajouter un paramètre qui indique le type MIME de la réponse. Pour l'HTML, ce sera donc:

````javascript
res.writeHead(200, {"Content-Type": "text/html"});
````

Le second paramètre est entre accolades car on peut y envoyer plusieurs valeurs sous forme de tableau. Maintenant que c'est fait, nous pouvons renvoyer du HTML dans la réponse

````javascript
res.end('<p>Voici un paragraphe <strong>HTML</strong> !</p>');
````

Au final, notre code ressemble donc maintenant à ceci

````javascript
var http = require('http');

var server = http.createServer(function(req, res) {
    res.writeHead(200, {"Content-Type": "text/html"});
    res.end('<p>Voici un paragraphe <strong>HTML</strong> !</p>');
});
server.listen(8080);
````

Essayez-le comme vous l'avez appris, en lançant l'application avec la commande dans la console et en ouvrant votre navigateur sur http://localhost:8080

Vous pouvez maintenant voir que ce n'est plsu du text brut qui est affiché mais du texte HTML mis en forme comme prévu. Mais attention, ce code HTML n'est pas valide car il manque le doctype, balise <html> etc... Il suffit donc pour le rendre valide de rajouter ces autres balises manquantes à notre partie de code en HTML.

Jusqu'ici nous avions toujours écirt le code HTML dans res.end() . Pour mieux découper le code, à partir de maintenant, j'utilise la commande res.write() qui permet d'écrire la réponse en plusieurs temps. Ca revient au même , mais notre code est mieux découpé comme cela.
res.end() doit toujours être appelé en dernier pour terminer la réponse et faire en sorte que le serveur renvoie le résultat au client.

Voici donc le code à utiliser:

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

Cette manière d'écrire du code HTML est nécessaire car Node.js est de bas niveau. Cependant aucun développeur ne fera des pages web HTML complexes comme cela. Il existe des moyens de séparer le code HTML du code JavaScript: ce sont les systèmes de templates. Il existe des tonnes de [modules Node.js dediés aux templates](https://github.com/nodejs/node-v0.x-archive/wiki/modules#templating)
https://github.com/nodejs/node/wiki


## Déterminer la page appelée et les paramètres

Nous savons renvoyer du code HTML mais pour l'instant notre application renvoie toujours la même chose! Comment fait-on pour créer différentes pages avec Node.js?

Lorsque l'on test notre application sur différentes url (http://localhost:8080, http://localhost:8080/mapage, http://localhost:8080/dossier/autrepage...), la page qui s'affiche estt toujours la même!

Il faut que l'on sache quelle est la page demandée par le visiteur. Pour l'instant vu que l'on a fait aucun test, notre application renvoie toujours la même chose.

Nous allons découvrir comment récupérer:

* Le nom de la page demandée (/mapage, /page.html, /dossier/autrepage...)
* Les paramètres qui circulent dans l'URL (ex: http://localhost:8080/mapage?nom=dupont&prenom=robert) et donc qui aurait été transmise par la méthode GET à partir d'un formulaire par exemple

### Quelle est la page demandée par le visiteur?

Pour récupérer la page demandée par le visiteur, on va faire appel à un nouveau module de Node appelé "url". On demande son inclusion avec:

````javascript
var url = require("url");
````

Ensuite, il nous suffit de "parser"(analyse d'un flux de caractère fourni en input, qui peut soit segmenter le flux fourni en entrée en éléments plus petits et caractéristiques, soit à utiliser un motif, un modèle ou plusieurs patterns servant à extraire du flux exclusivement les données qui correspondent au motif, en vue de les manipuler. Le parsing permet de tester l'existence de données, de manipuler un flux de données, extraire des informations choisies de ce flux de données) la requête du visiteur comme ceci pour obtenir le nom de la page demandée:

````javascript
url.parse(req.url).pathname;
````

Voici un code très simple qui permet de tester cela:

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

Exécutez ce script et lancez votre navigateur à l'adresse http://localhost:8080 pour commencer.

Retournez ensuite dans la console. Nous y loggons le nom de la page demandée.
node http://localhost:8080,
ou node http://localhost:8080/mapage

Vous devriez y voir :

´´´´code
/
/favicon.ico
´´´´

Pourquoi en chargeant la page d'acceuil, je vois /favicon.ico?

La plupart des navigateurs font en réalité une seconde requête pour récupérer l'icône du site (la "favicon" qu'on voit dans les onglets en général). C'est normal, ne vous en préoccupez pas.

Essayer de charger des fausses pages de votre site pour tester:

exemple:
/testpage
/favicon.ico
/un/long/chemin/
/favicon.ico
/faussepage.html
/favicon.ico

Si on omet les favicon.ico qui viennent un peu polluer la console, on voit que j'ai essayé de charger les pages suivantes:

* http://localhost:8080/testpage
* http://localhost:8080/un/long/chemin
* http://localhost:8080/faussepage.html

Bon, pas de changement, le site renvoie toujours la même chose quelle que soit la page appelée malgrè tout!

Pour renvoyer un message différent en fonction de la page demandée, il faut utiliser une condition qui affichera une page différente selon le paramètre récupérer dans l'URL

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

Exercice :  faites en sorte d'afficher un message d'erreur si le visiteur demande une page inconnue. Et n'oubliez pas de renvoyer un code d'erreur 404 !


### Quels sont les paramètres?
