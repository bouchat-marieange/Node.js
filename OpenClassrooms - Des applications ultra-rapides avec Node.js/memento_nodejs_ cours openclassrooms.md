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

Cette manière de coder un peu particulière devient très intéressante si par exemple on veut télécharger puis afficher 2 fichiers. Le code sera alors:

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

* La requête du visiteur (req dans mes exemples): cet objet contient toutes les informations sur ce que le visiteur à demandé. On y trouve le nom de la page appelée, les paramètres, les éventuels champs de formulaires remplis, ... Brevar express = require('express');f toutes les requêtes

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

Essayer de charger des fausses pages de votre site pour tester: Pour les tester, taper ces exemple à la suite de http://localhost:8080/ dans l'adresse url de votre navigateur puis aller voir dans la console le résulat.

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
Pour tester, taper http://localhost:8080/sous-sol/ ou http://localhost:8080/etage/1/chambre dans la barre d'adresse url de votre navigateur pour voir le message afficher dans la fenêtre du navigateur changer.

Exercice :  faites en sorte d'afficher un message d'erreur si le visiteur demande une page inconnue. Et n'oubliez pas de renvoyer un code d'erreur 404 !


### Quels sont les paramètres?

Les paramètres sont envoyés à la fin de l'URL, après le chemin du fichier.

````code
http://localhost:8080/page?prenom=Robert&nom=Dupont
````

Les paramètres sont contenus dans la châine ?prenom=Robert&nom=Dupont. Pour récupérer cette chaîne, il suffit de faire appel à :

````javaScript
url.parse(req.url).query
````
On parse la chaîne. Le problème c'est qu'on renvoie toute la chaîne sans découper au préalable les différents paramètres. Heureusement, il existe un module Node.js qui s'en charge pour nous: serverstring!

Incluez ce module:

````javaScript
var querystring = require('querystring');
````
On peut ensuite stocké le résulat à la fois du parse et du découpage dans une variable appelée var params

````javaScript
var params = querystring.parse(url.parse(req.url).query);
````

vous disposerez alors d'un tableau de paramètres "params". POur récupérer le paramètre "prenom" par exemple, il suffira d'écrire : params['prenom'].

Voici donc le code complet permettant de récupérer les paramètres transmis en GET dans l'url, de les découper et le parser et de les stocké dans un tableau pour pouvoir les utiliser et les manipuler.  Si un nom et un prénom ont été transmis, alors, la page affiche Vous vous appelez prénom nom", si aucun paramètre n'a été transmis dans l'url, la page affiche "Vous devez bien avoir un prénom et un nom , non?".

````javaScript
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

Deux petites précisions par rapport à ce code: 'prenom' in params me permet en JavaScript de tester si le tableau contient bien une entrée 'prénom'. S'il manque un paramètre, je peux alors afficher un message d'erreur (sinon mon script aurait affiché undefined à la la place).
Par ailleurs , vous constaterez que je ne vérifie aps la page qui est appelée. Ce code fonctionne aussi bin que l'on soit sur http://localhost:8080 ou sur htpp:// localhost: 8080/pageimaginaire. Il faudrait combiner ce code et le précédent pour générer à la fois la page ET les pararmètres.

## Shéma résumé

![Récupérer l'URL et les paramètres avec Node.js ](https://user.oc-static.com/files/421001_422000/421255.png)

Remarque: Pour éviter d'encoder les données manuellement dans l'url, on peut créer un formulaire demandant le nom et prenom de l'utilisateur et l'envoyé en traitement à cette page pour qu'elle affiche un message reprenant les données entrées par l'utilisateur dans le formulaire.


## Quiz 1

Votre score
90%
Bravo ! Vous avez réussi cet exercice !

### Question 1

Vrai ou faux ? Node.js est un framework très complet comparable à Symfony2 ou Django en termes de fonctionnalités.


* Vrai
* Faux (v)
Node.js est très bas niveau et offre de base très peu de fonctionnalités. Il ne ressemble donc pas à un framework aussi complet que Symfony2 ou Django.

### Question 2

Sur quel langage est basé Node.js ?

* JavaScript (v)
* Python
* Java
* HTML
Node.js est basé sur JavaScript (d'où le ".js" à la fin du nom). Il n'a rien à voir avec Java, un autre langage, ou même avec HTML : on n'est pas obligé de produire des pages web avec Node.js !

### Question 3

Laquelle de ces affirmations sur le fonctionnement de Node.js est vraie ?

* Node.js s'exécute dans le navigateur du visiteur
* Node.js peut exécuter 2 instructions exactement au même instant, à la même nanoseconde
* Node.js est plus bas niveau que l'assembleur
* Node.js est basé sur un modèle de programmation non bloquant(v)
Attention : modèle non bloquant ne veut pas dire que les actions s'exécutent exactement en même temps ! Node.js "saute" d'une instruction à une autre très rapidement, dès qu'il est en attente d'informations, mais deux instructions ne peuvent pas être lues lors de la même nanoseconde ! On dit que Node.js est monothread.

### Question 4

Pour quel navigateur a été développé à l'origine le moteur JavaScript v8 dont tire partie Node.js ?

* Firefox
* Internet Explorer
* Opera
* Chrome (v)
C'est Google, développeur de Chrome, qui a créé v8. C'est un environnement d'exécution du JavaScript très rapide qui confère une partie de sa rapidité à Node.js.

### Question 5

On dit que Node.js est...

* Monothread (v)
* Multithread
* Megathread
* Overthread
Node.js est monothread, car une seule action à la fois peut s'exécuter au même instant. S'il est rapide, c'est parce que Node.js n'attend pour rien jamais qu'une action finisse de s'exécuter (comme un appel réseau).

### Question 6

Sous quel type de serveur web Node.js s'exécute-t-il par défaut ?

* Apache
* npm
* Nginx
* Node.js permet de lancer son propre serveur web(v)
Node.js inclut un serveur web. Il n'est pas nécessaire d'en installer un, mais il faut par contre coder une partie des fonctionnalités d'un serveur web soi-même.

### Question 7

Quel est le rôle de la méthode writeHead de Node.js ?

* Renvoyer un code HTTP (200, 404...)(v)
* Renvoyer la balise HTML <head>
* Cette méthode n'existe pas
La méthode writeHead permet d'indiquer en en-tête HTTP si la page a été trouvée ou non, s'il y a eu une erreur lors de la génération de la page, etc.

### Question 8

Sur quel port Node.js doit-il s'exécuter ?

* 80
* 8080
* 8000
* Node.js n'est lié à aucun port particulier (v)
C'est vous qui décidez du port sur lequel Node.js écoute, grâce à listen().

### Question 9

Comment charge-t-on une bibliothèque avec Node.js ?

* require() (v)
* load()
* loadLibrary()
* include()
L'appel à require() provoque le chargement de la bibliothèque indiquée.

### Question 10

Pour déterminer le nom de la page appelée par le visiteur...


* Il faut créer un fichier du même nom que la page (ex : index.js)
* Il faut parser l'url à la main (v)
* Il faut appeler la variable $_ PAGE
Node.js est très bas niveau : on récupère l'URL qu'on doit ensuite parser grâce à plusieurs méthodes, pour déterminer le nom de la page réclamée par le visiteur.


## Les évènements

Node.js est un environnement de développement JavaScript basé sur les évènements. Node.js ne peut utiliser qu'un seul thread (lancer un seul processus) mais aucune opération n'est bloquante. Ainsi les opérations un peu longues (chargement de fichier, téléchargement d'un page web, démarrage d'un serveur web, ...) sont lancées en tâche de fond et **une fonction de callback est appelée quand l'opération est terminée.**

![Node.js - fonctionnement](https://user.oc-static.com/files/421001_422000/421157.png)

Les évènements sont à la base du fonctionnement de Node.js. C'est ce qui fait la puissance de Node.js mais qui le rend aussi un peu plus difficile à appréhender car cela implique d'utiliser de nombreuses fonctions de callback.

Nous allons maintenant rentrer dans les détails du fonctionnement des évènements Node.js. Nous allons voir en particulier comment on peut "écouter" et "créer" des évènements.

### Ecouter des évènements

Si vous avez déja utiliser JQuery vous avez déja écouter des évènements par exemple lorsque vous écriver le code:

````javaScript
$("canvas").on("mouseleave", function() { ... });
````

Dans ce genre d'instruction, vous demandez à éxécuter une fonction de callbakc quand la souris sort d'un élement <canvas> de la page. On dit que vous attachez l'évènement au DOM de la page.

Avec Node.js, le principe est exactement le même. **Un très grand nombre d'objets Node.js émettent des évènements. Leur particularité est qu'il s héritent tous d'un objet EventEmitter fourni par Node.**

Prenons par exemple le module "http" que nous avons utilisé pour créer notre serveur web. Il comprend un objet Server qui émet des évènements d'après la doc:

![doc http](https://user.oc-static.com/files/421001_422000/421286.png)

Si on veut écouter ces évènements, par exemple "close" qui survient quand le serveur est arrêter. Il suffit de faire appel à la méthode on() et d'indiquer:

* Le nom de l'évènement que vous écoutez (ici "close")
* La fonction de callback à appeler quand l'évènement survient

On obtiendra ainsi le code suivant pour l'évènement close:

````javaScript
server.on('close', function() {
    // Faire quelque chose quand le serveur est arrêté
})
````

Voici un exemple complet et concret. On va lancer un serveur et l'arrêter jsute après. On écoute l'évènement close qui survient lorsque le serveur est arrêter. On affiche un message dans la console quand le serveur s'apprête à s'arrêter.

````javaScript
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
Affichera dans la console

````code
user@nb25:~/Desktop/html/Node.js/Test OC$ node close_server.js
Bye bye !
````

Mais au fait ... createServer() comprend une fonction de callback aussi. Pourquoi on n'utilise pas on() ici?

En fait c'est une contraction de code. Lorsque que l'on lit ala doc de createServer() (https://nodejs.org/api/http.html#http_http_createserver_requestlistener): celle-ci nous indique que la fonction de callback qu'on lui envoie en paramètre est automatiquement ajoutée à l'évèenemnent "request"!

````code
The requestListener is a function which is automatically added to the 'request' event.
````

Donc ce code:

````javascript
var server = http.createServer(function(req, res) { });
````

... puet être réécrit comme ceci de façon plus détaillée:

````javascript
// Code équivalent au précédent
var server = http.createServer();
server.on('request', function(req, res) { });
````

Bref, les évènements sont partout, on ne peut pas y échapper! Certains sont simplement un peu "masqués" comme c'est le cas ici, mais il est important de savoir ce qui se passe derrière.

Vous pouvez écouter plusieurs fois un même évènement. Faites deux fois appel à la fonction on() pour le même évènement: les deux fonctions de callback seront appelées quand l'évènement aura lieu.

### Emettre des évènements

Si vous voulez émettre des évènements vous aussi, c'est très simple: incluez le module EventEmittter et créez un objet basé sur EventEmittter

````javascript
var EventEmitter = require('events').EventEmitter; //On inclut le module EventEmitter en oubliant pas de spécifié un paramètre qui décrit l'évènement qui déclenchera l'action.

var jeu = new EventEmitter(); // Création d'un objet basé sur EventEmitter stocké dans la variable jeu
````

Ensuite pour émettre un évènement dans votre code, il suffit de faire appel à emit() depuis votre objet basé sur EventEmmmiter. Indiquez:

*  Le nom de l'évènement que vous voulez générer (ex: "gameover"). A vous de le choisir.
* un ou plusieurs éventuels paramètres à passer (facultatif)

Ici, on génère un évènement "gameover" et j'envoie un message à celui qui réceptionnera l'évènement via un paramètre:

````javaScript
jeu.emit('gameover', 'Vous avez perdu !');
````

Celui qui veut écouter l'évènement doit faire ensuite:

````javaScript
jeu.on('gameover', function(message) { });
````

Voici le code complet pour tester l'émission d'évènements:

````javaScript
var EventEmitter = require('events').EventEmitter;

var jeu = new EventEmitter();

jeu.on('gameover', function(message){
    console.log(message);
});

jeu.emit('gameover', 'Vous avez perdu !');
````

La console affiche alors ceci:

````code
user@nb25:~/Desktop/html/Node.js/Test OC$ node emission_evenement.js
Vous avez perdu !
````
Bon j'admets, c'est un peu trop simple. Ce code se contente d'émettre un évènement. Dans la réalité, les évènements seront émis depuis des fonctions imbriquées dans d'autres fonctions, et c'est de là que Node.js tire toute sa richesse. Mais le principe reste le même!

N'oubliez pas que vous pouvez envoyer autant de paramètres que nécessaire à la fonction de callback. Emettez simplement plus de paramètres:

````javaScript
jeu.emit('nouveaujoueur', 'Mario', 35); // Envoie le nom d'un nouveau joueur qui arrive et son âge
````

## Les modules Node.js et NPM

Le noyau de Node.js est tout petit et ne sait en fait pas faire grand chose. Pourtant, Node.js eset très riche grâce à sont extensabilité. Cest extensions de Node.js sont appellés modules.

Il existe des milliers de modules qui offrent des fonctionnalités variées : de la gestion de fichiers uploadés à la connexion aux bases de données MySQL ou à Redis, en passant par des framworks, des systèmes de templates et la gestion de la communication temps réel avec le visiteur! Il y a à peu près tout ce dont on peut rêver et de nouveaux modules apparaissent chaque jour.

Nous allons voir comment sont gérés les modules par Node.js et nous verrons que nous pouvons facilement en créer nous aussi. Nous découvrirons NPM (Node Package Manager) qui est un outil indispensable quie vous permet de télécharger facilement touts les modules de la communauté Node.js. Et enfin, nous apprendrons à publier un module sur NPM.

### Créer des modules

Dans cette ligne, placé au tout début de notre premier code, on à fait appel à la bibliothèque "http" de Node.js (ou devrais-je dire au module "http")

Quand on fait appel à un module, Node.js va chercher sur notre disque un fichier appelé http.js ou url.js si on appelle le module url. Ces fichiers, ont ne les voient pas car ils font partie du noyau de Node.js, ils sont tout le temps disponibles.

Les modules sont donc de simples fichiers.js. Si nous voulons créer un module, disons le module "test1", nous devons créer une fichier test1.js dans le même dossier que notre fichier principal par exemple appli.js  et y faire appel comme ceci:

````JavaScript
var test = require('./test1'); // Fait appel à test1.js (même dossier)
````
Attention: Il ne faut pas mettre l'extension .js dans le require()

C'est un chemin relatif. Si le module se trouve dans le dossier parent, nous pouvons l'inclure comme ceci:

````JavaScript
var test = require('../test'); // Fait appel à test.js (dossier parent)
````

On peut également ne pas mettre de chemin relatif et juste faire require('test'). Il faut alors mettre votre fichier test1.js dans une sous-dossier appelé "node_modules". C'est une convention Node.js:

````JavaScript
var test = require('test'); // Fait appel à test.js (sous-dossier node_modules)
````

En résumé

![](https://user.oc-static.com/files/421001_422000/421271.png)


Notez que si le dossier node_modules n'existe pas, Node.js ira chercher un dossier qui a le même nom plus haut dans l'arborescence. Ainsi, si votre projet se trouve dans le dossier:
/home/mateo21/dev/nodejs/projet, il ira chercher un dossier nommé :

* /home/mateo21/dev/nodejs/projet/node_modules, et si ce dossier n'existe pas il ira le chercher dans...
* ... /home/mateo21/dev/nodejs/node_modules, et si ce dossier n'existe pas il ira le chercher dans...
* ... /home/mateo21/dev/node_modules, et ainsi de suite !

### Les fichiers;js des modules

Les fichiers;js des modules sont composé de code JavaScript tout ce qu'il y a de plus classique. Vous y créez des fonctions. Une seule particularité, **vous devez "exporter" les fonctions que vous voulez que d'autres personnes puissent réutiliser.**

Nous allons tester cela dans une module qui dit "Bonjour !" et "Bye bye !" . Créez une fichier monmodule.js avec le code suivant:

````javascript
var direBonjour = function() {
    console.log('Bonjour !');
}

var direByeBye = function() {
    console.log('Bye bye !');
}a

exports.direBonjour = direBonjour;
exports.direByeBye = direByeBye;
````

Le début du fichier ne contient rien de nouveau. Nous créons des fonctions que nous plaçons dans des variables. D'où le `var direBonjour = function()`...

Ensuite, et c'est la nouveauté, nous exportons ces fonctions pour qu'elles soient utilisables de l'extérieur: `exports.direBonjour = direBonjour;`. Le nom que l'on donne ici sera celui utiliser pour appeler cette fonction dans les fichiers externes, veillez donc à lui donner un nom évocateur et clair. Notez d'ailleurs qu'on aurait aussi pu faire directement :

````javascript
exports.direBonjour = function() { ... };
````

**Attention:** toutes les fonctions que vous n'exportez pas dans votre fichier de module resteront privées. Elle sne pourront pas être appelées de l'extérieur.
En revanche, elles pourront tout à fait être utilisées par d'autres fonctions de votre module.

````javascript
var monmodule = require('./monmodule');

monmodule.direBonjour();
monmodule.direByeBye();
````
require() renvoie en fait un objet qui contient les fonctions que vous avez exportées dand votre module. Nous stockons cet objet dans uen variable du même nom `monmodule` (mais on aurait pu aussi lui donner n'importe quel autre nom)

![Exportation d'une fonction](https://user.oc-static.com/files/421001_422000/421272.png)

Tous les modules de Node.js sont basés sur ce principe très simple. Cela vous permet de découper votre projet en plusieurs petits fichiers pour répartir les rôles.


## Utiliser NPM pour installer des modules

NPM (le Node Package Manager) est un moyen formidable d'installer de nouveaux modules développés par la communauté.

Imaginez que NPM est un peu l'équivalent d'apt-get sous Linux pour installer des programmes. Une simple commenad et le module est téléchargé et installé!
En plus, NPM gère les dépendances. Cela signifie que si un module à besoin d'un autre module pour fonctionner, NPM ira le télécharger automatiquement!

Voici l'adresse du site NPM: https://www.npmjs.com/

NPM est très actif, Il y a plusieurs dizaines de milliers de modules disponibles et on compte plusieurs millions de téléchargements par semaine! Vous y trouverez donc certainement ce dont vous avez besoin!

Il est aussi simple d'installer de nouveaux modules que de publier ses propres modules. C'est en bonne partie ce qui explique le grand succès de Node.js

Pour trouver un module précis dans cette multitude de modules, il y a plusieurs manière de procédé.

#### Trouver un module

Si vous savez ce que vous cherche, le site web de NPM vous permet de faire une recherche. Mais NPM, cest avant tout une commande! Vous pouvez faire une recherche dans la console comme ceci pour rechercher tous les modules en rapport avec la base de données PostgreSQL.

````code
npm search postgresql
````

#### Installer un module

Pour installer un module, placez-vous dans le dossier de votre projet et tapez

````code
npm install nomdumodule
````

Le module sera alors installé localement spécialement pour votre projet. Si vous avez un autre projet, il faudra alors relancer la commande dans le dossier de cet autre projet pour l'installer à nouveau. Cela vous permet d'utiliser des versions différentes d'un même module en fonction de vos projets.

Nous allons faire un test ne installant un module markdown qui permet de convertir du code markdown en HTML

````code
npm install markdown
````

NPM va télécharger automatiquement la dernière version du module et il va la placer dans un sous-dossier node_modules. Vérifiez donc bien que vous êtes dans le dossier de votre projet Node.js avant de lancer cette commande.

Une fois que cest fait, vous avez accès aux fonctions offertes par le module markdown. Lisez la doc du module: https://www.npmjs.com/package/markdown pour savoir comment l'utiliser. On n'y apprend qu'il faut faire appel à l'objet markdown à l'intérieur du module et qu'on peut appeler la fonctionc toHTML pour traduire dur Markdown en HTML.

Essayons donc ce code:

````javascript
var markdown = require('markdown').markdown;

console.log(markdown.toHTML('Un paragraphe en **markdown** !'));
````

affichera dans la console:

````code
<p>Un paragraphe en <strong>markdown</strong> !</p>
````

Ne  soyez pas surpris par le `require('markdown').markdown`. La doc du module nous idt que les fonctionssont dans l'objet "markdown", donc on va chercher directement cet objet au sein du module.


#### L'installation locale et l'installation globale

NPM installe les modules localement pour chaque projet. C'est pour cela qu'il crée un sous-dossier node_modules à l'intérieur de votre projet.

Si vous utilisez le même module dans  projets différents, il ser téléchargé et copié  fois. C'est normal,cela permet de gérer les différences de version. C'est donc une bonne choseK

Par contre il faut savoir que NPM permet aussi d'installer des modules globaux. Ca ne nous sert que dans de rares cas où le module fournit des éxécutables (et pas juste des fichiers .js)

C'est le cas de notre module markdown par exemple. Pour l'installer globalement, on va ajouter le paramètre -g à la commande npm:

````code
npm install markdown -g
````

Vous aurez alors accès à un exécutables mdhtml dans votre console:

````code
echo 'Hello *World*!' | md2html
````

Les modules installés globalement ne peuvent pas être inclus dans vos projets Node.js avec `require()` ! Ils servent juste à fournir des commandes supplémentaires dans la console. Si vous voulez les utiliser en JavaScript, vous devez donc aussi les installer normalement (sans le -g) en local.

#### Mettre à jour les modules

C'est très simple de mettre à jour tous les modules d'un projet avec la commande:

````code
npm update
````

NPM va chercher sur les serveurs s'il y a de nouvelles versions des modules, puis mettre à jour les modules installés sur votre machine( en veillant à ne pas czsser la compatibilité) et il supprimera les anciennes versions. Bref, c'est la commande magique!

###  Déclarer et publier son modules

Si votre programme à besoin de modules externes, vous pouvez les installer un à un comme vous venez d'apprendre à le faire ... mais vous allez voir que ça va vite devenir assez compliqué à maintenir. C'est d'autant plus vrai si vous utilisez de nombreux modules. Comme ces modules évoluent de version en version, votre programme pourrait devenir incompatible suite à uen mise à jour d'un module externe!

Heureusement, on peut régler tout ça en définissant les dépendances de notre programme dans un simple fichier JSON. C'est un peu la carte d'identité de notre application.

On va créer une fichier package.json dans le même dossier que notre application et allons y placer ce code:

````code
{
    "name": "mon-app",
    "version": "0.1.0",
    "dependencies": {
        "markdown": "~0.4"
    }
}
````

Ce fichier JSON contient des paires clé-valeur:

* name : c'est le nom de votre application. Restez simple, évitez espaces et accents.

* version: c'est le numéro de version de votre application. il est composé d'un numéro de version majeure, de version mineure et de patch. Pour savoir quelle version des module est utilisée pour les renseignée, il faut taper dans le terminal positionné sur son dossier de travail la commande `npm list` (renvoie la liste des package local - uniquement pour ce dossier de travail) - `npm list -g` (renvoie la liste des package installer globalement). Attention taper cette commande avant de créer le fichier package.json sinon le terminal renvoie une erreur. On peut aussi récupérer la version d'un package spécifique en passant son nom en argument avec la commande `npm list nomdumodule`

* dependencies: c'est un tableau listant les noms des modules dont a besoin votre application pour fonctionner ains que les versions compatibles.

Petite remarque, le petit tilde ~ placer devant la version des modules permet d'autoriser les futurs patchs de ces modules mmais pas les nouvelles versions mineures ou majeures, ce qui garantit que leur API ne changera pas, et donc que notre code continuera à fonctionner même avec ces mises à jour.

Le fichier peut être beaucoup plus complet que cela, je ne vous ai montré ici que les valeurs essentielles. Pour tout connaître sur le fonctionnement de ce fichier package.json, je vous recommande cette cheat sheet: http://package.json.nodejitsu.com/
http://browsenpm.org/package.json
https://docs.npmjs.com/getting-started/using-a-package.json

Il est possible de générer automatiquement le fichier package.json de votre appli en tapant dans le terminal placé dans votre dossier de travail npm init. Cette commande crée un fichier package.json après vous avoir demandé quelques infos comme le nom de votre projet, sa version, l'auteur, la description etc... de votre projet. Il est indispensable de créer ce fichier avec la commande npm init au début dès le début du travail sur votre projet car vous pourrez alors à chaque installation d'un nouveau module, l'installer avec la commande `npm install NomDuModule --save` qui ajoutera le nom du module et sa version automatiquement à la liste des dépendances dans le fichier package.json. Cela permettra de mettre à jour en une opération toutes les dépendances de votre projet avec un simple `npm update`. Si on utilise la commande `npm update --save` cela mettra aussi à jour le fichier package.json avec la nouvelle version.

Très utile: lorsque vous télécharger un projet contenant le ficheir package.json il vous suffit de taper la commande npm install pour installer en une seule fois tous les modules et les dépendances nécessaires pour faire fonctionner l'application.

#### Le fonctionnement des numéros de version

Pour bien gérer les dépendances et savoir mettre à jour le numéro de version de son application, il faut savoir comment fonctionnent les numéros de version avec Node.js. Il y a pour chaque application :

* Un numéro de version majeure. En général on commence à 0 tant que l'application n'est pas considérée comme mature. Ce numéro change très rarement, uniquement quand l'application a subi des changements très profonds.

* Un numéro de version mineure. Ce numéro est changé à chaque fois que l'application est un peu modifiée.

* Un numéro de patch. Ce numéro est changé à chaque petite correction de bug ou de faille. Les fonctionnalités de l'application restent les mêmes entre les patchs, il s'agit surtout d'optimisations et de corrections indispensables.

![numéro de version](https://user.oc-static.com/files/421001_422000/421284.png)

Ici j'ai donc choisi de commencer à numéroter mon application à la version 0.1.0 (on aurait aussi pu commencer à 1.0.0 mais ç'aurait été prétentieux ;) ).

* Si je corrige un bug, l'application passera à la version 0.1.1 et il me faudra mettre à jour ce numéro dans le fichier packages.json.

* Si j'améliore significativement mon application, elle passera à la version 0.2.0, puis 0.3.0 et ainsi de suite.

* Le jour où je considère qu'elle a atteint un jalon important, et qu'elle est mature, je pourrai la passer en version 1.0.0.

#### La gestion des versions des dépendances

C'est à vous d'indiquer avec quelles versions de ses dépendances votre application fonctionne. Si votre application dépend du module markdown v0.3.5 très précisément, vous écrirez :

````code
"dependencies": {
    "markdown": "0.3.5" // Version 0.3.5 uniquement
}
````

Si vous faites un npm update pour mettre à jour les modules externes, markdown ne sera jamais mis à jour (même si l'application passe en version 0.3.6). Vous pouvez mettre un tilde devant le numéro de version pour autoriser les mises à jour jusqu'à la prochaine version mineure :

````code
"dependencies": {
    "markdown": "~0.3.5" // OK pour les versions 0.3.5, 0.3.6, 0.3.7, etc. jusqu'à la version 0.4.0 non incluse
}
````

Si vous voulez, vous pouvez ne pas indiquer de numéro de patch. Dans ce cas, les modules seront mis à jour même si l'application change de version mineure :

````code
"dependencies": {
    "markdown": "~0.3" // OK pour les versions 0.3.X, 0.4.X, 0.5.X jusqu'à la version 1.0.0 non incluse
}
````

Attention néanmoins : entre deux versions mineures, un module peut changer suffisamment et votre application pourrait être incompatible. Je recommande d'accepter uniquement les mises à jour de patch, c'est le plus sûr.

#### Publier un module

Avec Node.js, vous pouvez créer une application pour vos besoins, mais vous pouvez aussi créer des modules qui offrent des fonctionnalités. Si vous pensez que votre module pourrait servir à d'autres personnes, n'hésitez pas à le partager ! Vous pouvez très facilement le publier sur NPM pour que d'autres personnes puissent l'installer à leur tour.

Un module n'est rien d'autre qu'une application Node.j qui contient des instructions `exports` pour partager des fonctionnalités.

Si vous désirez publier le module que vous avez créer et donner l'occasion à d'autres utilisateurs de le télécharger, voici la marche à suive:

Commencer par vous créer un compte utilisateur sur npm:

````code
npm adduser
````

Une fois que c'est fait, placez-vous dans le répertoire de votre projet à publier. Vérifiez que vous avez :

* Un fichier package.json qui décrit votre module (au moins son nom, sa version et ses dépendances)
* Un fichier README.md (écrit en markdown) qui présente votre module de façon un peu détaillée. N'hésitez pas à y inclure un mini-tutoriel expliquant comment utiliser votre module !

Il ne vous reste plus qu'à faire :

````code
npm publish
````

Il ne vous reste plus qu'à parler de votre module autour de vous, le présenter sur les mailing-lists de Node.js... Les portes de la gloire des geeks barbus vous attendent !

## Le framework Express.js

Grâce au framework, il existe un moyen d'alle plus vite qu'en codant en bas niveau. Pour gagner du temps lors du développement, il existent les bibliothèque et les frameworks qui sont des sortes de super-bibliothèques.

Sur NPM, un module en particulier est asser plbiscité, il s'appelle Express.js. Il s'agit en fait d'un micro-framework pour Node.js. Il vous fournit des outils de base pour aller plus vite dans la création d'application Node.js.

Attention, cependant Express, n'est pas du tout aussi puissant que Django ou Symfony2 qui offrent des fonctionnalités très complètes et puissantes (comme la génération d'inerfaces d'administration), ce que n'ess pas du tout capable de faire Express.js.

Avec Node.js, on part de loin (bas niveau), Express,js permet donc d'être un peu moins bas niveau et de géer par exemple plus facilement les routes (URL) de votre application et d'utiliser des templates. Rien que ça, ça va déja être une petite révolution pour vous!

Commençons par créer un un dossier pour faire une application de test Node.js. Installez-y Express avec la commmande:

````code
npm install express
````

Voilà, vous êtes prêts à utliser Express!

### Les routes

Nous avons vu à quel point il était fastidieuxde vérifier l'URL demandée avec Node.js. On aboutissait à du code spaghetti du type:

````JavaScript
if (page == '/') {
    // ...
}
else if (page == '/sous-sol') {
    // ...
}
else if (page == '/etage/1/chambre') {
    // ...
}
````
Lorsqu'on créer des applications web, on manipule des routes comme ici. Ce sont les différentes URL auquelles notre application doit répondre. En bref se sont les pages que l'utilisateur à demandé.

La gestion des routes est importante. Si vous avez déja manipulé des frameworks comme Django ou Symfony2, vous voyez de que je veux dire. Retenez juste ceci, bien géer lees URL de son site est important, surtout lorsque celui-ci grossit. Express nous aide à faire cela bien.

#### Routes simples

Voici une application très basique utilisatnt Express pour commencer

````JavaScript
var express = require('express');

var app = express();

app.get('/', function(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.end('Vous êtes à l\'accueil');
});

app.listen(8080);
````
On commence par demander l'inclusiion d'Express et on crée un objet app en appelant la fonctionc express().

Ensuite il suffit d'indiquer les différentes routes (les différentes URL) à laquelle votre application doit répondre. Ici, j'ai créé une seule route, la racine "/". Une fonction de callback est appelée quand quelq'un demande cette route.

Ce système est beaucoup mieux fait qu'avec notre code contenant des if imbriqués. On peut écrire autant de routes de cette façon qu'on le souhaite.

````JavaScript
app.get('/', function(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.end('Vous êtes à l\'accueil, que puis-je pour vous ?');
});

app.get('/sous-sol', function(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.end('Vous êtes dans la cave à vins, ces bouteilles sont à moi !');
});

app.get('/etage/1/chambre', function(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hé ho, c\'est privé ici !');
});
````

 Si on souhaite géer les erreurs 404 lorsqu'une page demandée n'éxiste pas, on doit inclure obligatoirement inclure les lignes suivantes **à la fain de notre code** (justeaant app.listen):

 ````JavaScript
 // ... Tout le code de gestion des routes (app.get) se trouve au-dessus

 app.use(function(req, res, next){
     res.setHeader('Content-Typesi ', 'text/plain');
     res.send(404, 'Page introuvable !');
 });

 app.listen(8080);
 ````
On reviendra plus tard sur la syntaxe et les paramètres, n'y prêter pas attention pour l'instant.

Express permet également de chaîner les appel à get() et use():

````JavaScript
app.get('/', function(req, res) {

})
.get('/sous-sol', function(req, res) {

})
.get('/etage/1/chambre', function(req, res) {

})
.use(function(req, res, next){

});
````

Cela revient à faire app.get().get().get() ... Ca marche parce que ces fonctions se renvoient l'une à l'autre l'objets app. ce qui nous permet de raccourcier notre code. Ne soyez donc pas étonnés si vous voyez des codes utilisatnt Express ecrits sous cette forme.

### Routes dynamiques

Express permet de gérer des routes dynamiques, cest à dire des routes dont certaines portions peuvent varier. On doit écrire `:nomvariable` dans l'URL de la route, ce qui aura pour effet de créer un paramètre accessible depuis `req.params.nomvariable`. Voici comment faire:

````JavaScript
app.get('/etage/:etagenum/chambre', function(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.end('Vous êtes à la chambre de l\'étage n°' + req.params.etagenum);
});
````

Cela vous permet de créer de belles URL et vous évite d'avoir à passer par le suffixe ("?variable=valeur") pour gérer des variables. Ainsi, toutes les routes suivantes sont valides:

* /etage/1/chambre
* /etage/2/chambre
* /etage/3/chambre
* /etage/nawak/chambre

Attention il faudra encore vérifier dans votre fonction callbak que le paramètre transmis dans l'url est bien un nombre (et pas un string comme nawak par exemplte) et si il ne s'agit pas d'un nombre, de renvoyer une erreur 404.
(voir exemple dans l'exercice Mon appli express)

````Javascript
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

//Pour le cas ou les étages sont transmis en get (ex: route URL http://localhost:8080/etage/1/chambre), j'utilise un systeme pour récupérer les routes dynamiques (le numéro d'étage varie et est récupérer) et en plus je teste si la variable correspondant à l'étage est bien un nombre, si ce n'est pas le cas je redirige vers page 404, si c'est bien un nombre j'affiche la page correspondante avec l'étage transmis en Get
app.get('/etage/:etagenum/chambre', function(req, res)
{
    res.setHeader('Content-Type', 'text/plain');
    if (isNaN(req.params.etagenum) == true)
    // On utilise la fonction javascript navitve isNAN() qui prend en paramètre la valeur à tester pour vérifier si la valeur en question est un nombre ou non. isNaN signifie "is not a Number", donc si l'étage renvoyé n'est pas un nombre (isNaN==true), alors on affiche la page 404 sinon (else) on affiche la page correxpondante à l'étage transmise en GET dans l'URL
    {
    app.use(function(req, res, next){ // gestion particulière par les erreurs 404 - la page demandée n'existe aps
        res.setHeader('Content-Type', 'text/plain');
        res.send(404, 'Erreur 404- Page introuvable !');
    });
    }
  else{
      res.end('Vous êtes à la chambre de l\'étage n°' + req.params.etagenum);
    }
});

// gestion des erreurs 404 - la page demandée n'existe pas
app.use(function(req, res, next){
    res.setHeader('Content-Type', 'text/plain');
    res.send(404, 'Erreur 404- Page introuvable !');
});

app.listen(8080);
````

## Les templates

Jus'qu'ici, nous avions renvoyé le code HTML directement en Javascript. Cela nous avait donné du code lourd et délicat à maintenir qui ressemblait à cela:

````JavaScript
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
````

Express nous permet de sortir de ce code lourd en utilisant des templates. Les templates sont en quelque sorte des langages faciles à écrire qui nous permettent de produire du HTML et d'insérer au milieu du contenu variable.

PHP lui-même est en fait un langatge de template qui nous permet de faire ceci:

````php
<p> Êtes vous le visiteur n° <?php echo $visiteurnum; ?></p>
````

Il existe beaucoup d'autres langage de templates, comme Twig, Smarty, Haml, JSP, Jade, EJS ... Express vous permet d'utiliser la plupart d'entre eux, chacun ayant son lot d'avantage et d'inconvénients. En général ils gèrent tous l'essentiel, à savoir : les variables, les conditions, les boucles, etc...

Le principe est le suivant: depuis votre fichier Javascript, vous appelez le templatee de votre choix en lui transmettant les variables dont il a besoin pour construire la page.

![template Node.js](https://user.oc-static.com/files/421001_422000/421341.png)

### Les bases d'EJS

Comme il existe de nombreux systèmede templates, je vais en choisir un dans le lot. Je vous propose d'utiliser EJS (http://www.embeddedjs.com/) (Embedded JavaScript).

Installez-le pour votre projet (lancer cette ligne de commande avec le terminal situé dans votre dossier projet)

````code
npm install ejs
````

Nous pouvons maintenant déléguer la gestion de la vue (du HTML) à notre moteur de template. Plus besoin d'écrire du HTML au milieu du code JavaScript comme un cochon!

Code à placer dans le fichier app.js

````javascript
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

app.get('/etage/:etagenum/chambre', function(req, res) {
    res.render('chambre.ejs', {etage: req.params.etagenum});
});

app.listen(8080);
````

Ce code fait appel à un fichier chambre.ejs qui doit se trouver dans un sous-dossier appelé "views". Créez donc un fichier /views/chambre.ejs et placer-y le code suivant:

````ejs
<h1>Vous êtes dans la chambre</h1>

<p>Vous êtes à l'étage n°<%= etage %></p>
````

la balise `<%= etage %>` sera remplacée par la variable ´etage´ que l'on a transmise au template avec `{etage: req.params.etagenum}`!

Dans la page du navigateur le résultat est mis en forme selon la mise en page définie dans le fichier 'chambre.ejs' avec un titre H1 suivi d'un paragraphe.

#### Plusieurs paramètres et des boucles

Sachez que vous pouvez envoyer plusieurs paramètres à vos templates, y compris des tableaux! Pour cette démonstration, nous allons faire une application qui compte jusqu'à un nombre envoyé en paramètre et qui affiche un nom au hasard au sein d'un tableau .

Si vous créer un nouveau dossier de travaux,n'oubliez pas de d'installer ejs et express dans le dossier avec la commande aant de travailler pour que le code fonctionne.

````code
npm install Express
````

````code
npm install ejs
````

Voici le code javascript: (fichier app.js à la racine du dossier de travail)

````javascript
var express = require('express'); //on demande l'inclusiion d'Express

var app = express(); // on crée un objet app en appelant la fonctionc express()


app.get('/compter/:nombre', function(req, res) {
    var noms = ['Robert', 'Jacques', 'David'];
    res.render('page.ejs', {compteur: req.params.nombre, noms: noms});
});

app.listen(8080);
````

On transmet le nombre envoyé en paramètre et une liste de noms sous forme de tableau. Ensuite, dans le template EJS: (attention placer ce code dans un sous dossier views de votre projet et mettez lui une extension ejs)


Code à placer dans le fichier page.ejs (voir nom de la page dans le code js ci dessus premier paramètre res.render) qui sera placer dans une sous-dossier views du dossier de travail:

````ejs
<h1>Je vais compter jusqu'à <%= compteur %></h1>

<p><%
    for(var i = 1 ; i <= compteur ; i++) {
    %>

    <%= i %>...

<% } %></p>

<p>Tant que j'y suis, je prends un nom au hasard qu'on m'a envoyé :
<%= noms[Math.round(Math.random() * (noms.length - 1))] %>
</p>
````
Remarque dans les fichiers.ejs, ce qui se trouve entre les balises <% contenu entre les balises %> est éxécuter en javascript. Le javascript entre les balises <%= %> ajoute du HTML au résultat.

Par exemple:

**Ajouter un titre**
````javascript
"<h1> <%= title %> </h1>"
````

**Ajouter un lien**
````javascript
 "<%= link_to(supplies[i], 'supplies/'+supplies[i]) %>"
````

**Ajouter lien dans une liste à puces reprenant les données d'un tableau**
````javascript
<h1><%= title %></h1>
<ul>
<% for(var i=0; i<supplies.length; i++) {%>
	<li><%= link_to(supplies[i], 'supplies/'+supplies[i]) %></li>
<% } %>
</ul>
````

**Ajouter une image**
````javascript
<%= img_tag('images/maid.png') %>
````

**Liste à puces bouclant sur de données récupérées dans un tableau**
````javascript
<ul>
<% for(var i=0; i<supplies.length; i++) {%>
   <li><%= supplies[i] %></li>
<% } %>
</ul>
````
**Résultat du code ci-dessus**
````code
* mop
* broom
* duster
````

Vous voyez que l'on peut faire des boucles avec les templates EJS. En fait, on utilise la même syntaxe que Javascript (d'où la boucle for)
Ma petite manipulation à la fin du code me permet dde prendre un nom au hasard dans le tableau aui a été envoyé au template.

Résultat: (pour l'url  http://localhost:8080/compter/66):

![compter](https://user.oc-static.com/files/421001_422000/421331.png)

De la même façon, vous pouvez avoir recours à des conditions (if)et des boucles (while) au sein de vos templates EJS.

N'hésitez pas à regarder aussi d'autres systèmes de templates comme Jade (http://jade-lang.com/) ou Haml (http://haml.info/) quui propose une toute autre façon de créer ses pages web!

## Aller plus loin: les middlewares

Nous venons de voir eux fonctionnalités essentielles d'Express:

* Les routes: elles permettent de géer efficacement les URL
* Les vues : elles permettent un accès aux systèmes de templates comme EJS

C'est déja pas mal, mais Express permet également de faire d'autres choses!

### Express et les middlewares

Express est une framework basé sur le concept de middlewares. Ce sont des petits morceaux d'application qui rendent chacun un service spécifique. Vous pouvez charger uniquement les middlewares dont vous avez besoin.

Express est fourni avec une quainzaine de middlewares de base, et d'autres développeurs peuvent bien entendu en proposer d'autres via NPM. Les middlewares livrés avec Express fournissent chacun des micro-fonctionnalités. Il y a par exemple:

* compression : permet la compression gzip de la page pour un envoi plus rapide au navigateur
* cookie-parser : permet de manipuler les cookie-parser
* cookie-session: permet de gérer des informations de session (durant la visite d'un visiteur)
* serve-static : permet de renvoyéer des fichiers statiques contenus dans un dossier (images, fichiers à télécharger ...)
* serve-favicon : permet de renvoyer la favicon du site
* csrf : fournit une protection contre les failles csrf
* etc...

Tous ces middleswares offrent vraiment des micro-fonctionnalités. il y en a des tous petits comme "serve-favicon" par exemple.

Ces middlewares sont interconnectés et peuvent communiquer entre eux. Express ne fait qu'ajouter les routes et les vues par-dessus l'ensemble.

Tous ces middlewares sont interconnectés et peuvent communiquer entre eux. Express ne fait qu'ajouter les routes et les vues par-dessus l'ensemble.

Tous ces middlewares communiquent entre eux en se renvoyant jusqu'à 4 paramètres :

* ´err´ : les erreurs
* ´req´ : la requête du visiteur
* ´res´: la réponse à renvoyéer (la page HTML et les informations d'en-tête)
* ´next´ : un callback vers la prochaine fonction à appeler

Si je devais résumer comment communiquent les middlewares dans un schéma, ca donnerait ça:

![communication middlewares](https://user.oc-static.com/files/421001_422000/421333.png)

Les middlewares d'Express étaient séparés auparavant dans un module appelé Connect. Ils sont désormais intégrés à Express. N'hésitez pas à a lire la doc des middlewares (http://expressjs.com/en/guide/using-middleware.html) puis à lire la doc d'Express (http://expressjs.com/en/api.html). Vous y trouverez toutes les informations dont vous avez besoin pour utiliser les middlewares.

### Utiliser les middleware au sein d'Express

Concrètement, il suffit d'appeler la méthode `àpp.use()` pour utiliser un middleware. Vous pouvez les chaîner (les appeller les uns à la suite des autres). Par exemple, vous pouvez faire:

Attention pensez à installer les middlewares dont vous avez besoin avec npm install avant d'exécuter ce code. Pour ce code taper dans le terminal en vous placant dans votre dossier de travail:

````code
npm install express
````
Install le framework express

````code
npm install logging
```
qui fait référence au middleware morgan (https://www.npmjs.com/package/morgan)

````code
npm install serve-favicon
````
https://www.npmjs.com/package/serve-favicon

````javascript
var express = require('express');//on demande l'inclusion d'Express, le framework Node.js qui permet de réaliser des applications plus facilement. Pas oublier d'installer express dans le dossier avec la commande npm install express (qui va créer un fichier node_modules contenant tout les fichiers du framework express dans le dossier de travail)
var session = require ('cookie-session'); // Charge le middleware de sessions. On demande l'inclusion du module cookie-session préalablement installé avec npm install cookie-session
var morgan = require('morgan'); // Charge le middleware morgan pour logging
var favicon = require('serve-favicon'); // Charge le middleware de serve -favicon pour favicon

var app = express();

app.use(morgan('combined')) // Active le middleware de logging

.use(express.static(__dirname + '/public'))// Indique que le dossier /public contient des fichiers statiques
 (middleware chargé de base)
.use(favicon(__dirname + '/public/favicon.ico')) // Active la favicon indiquée
.use(function(req, res){ // Répond enfin
    res.send('Hello');
});

app.listen(8080);
````

L'ordre d'appel des middlewares est extrêmement important. Par exemple, on commence par ativer le logger (morgan). Si on le faisait en dernier, on ne loggerait rien!
Quand vous faites appel au middleware, réfléchissez donc à l'ordre, car il peut impacter fortement le fonctionnement de votre application.

Comme vous le voyez, j'ai fait appel aux middleware morgan, static (alias de serve-static) et favicon dans le cas présent. Chaque middleware va se renvoyer des données (la requête, la réponse, la fonction suivante à appeler ...). Chacun a une rôle très précis. Pour savoir les utiliser il suffit de lire la doc - liste des middlewares et de leurs description (http://expressjs.com/en/resources/middleware.html)

Pour résumé, Express propose un ensemble de middleares qui communiquent entre eux. Appelez ces middlewares pour utiliser leurs fonctionnnalités et faites attention à l'ordre d'appel qui est important (on n'active pas un logger à la fin des opérations !).

## TP : la todo liste

Dans ce TP nous allons réalisé une application de todo list (liste des tâches) pour mettre en pratique les connaissances que nous avons acquises.

Voici à quoi va ressembler ce que nous allons créer:

![Todo list apercu](https://user.oc-static.com/files/421001_422000/421348.png)

Dans notre todo list :

* On peut ajouter des éléments à la todolist via le formulaire
* On peut supprimer des éléments en cliquant sur les croix de la liste
* La liste est stockée dans la session du visiteur. Si quelqu'un d'autre se connecte, il aura sa propre liste.

Les instructions sont simples et le code ne devrait pas être trop long,mais vu qu'il s'agit de votre première app, il est normal de tatonner un peu avant d'y arriver. Si vous avez besoin d'aide, consulter la section "Un peu d'aide", mais tenter d'y arriver par vous-même avant de comparer votre travail avec celui présenté dans cette section.

Attention: N'oubliez pas d'ouvrir la doc d'Express (http://expressjs.com/en/api.html) ou en français (http://expressjs.com/fr/)

A vous de jouer !

## Les étapes que j'ai effectuées pour réalisé le TP Todolist

* Créer un nouveau dossier de travail appellé "tptodolist" et me placer avec le terminal dans ce dossier de travail
* Taper dans la console npm init pour créer automatiquement un fichier package.json qui mettra à jour en une opération tous les modules que je vais installer. Attention lors de l'installation de chaque module pour mon projet, je dois utiliser la commande npm install NomDuModule --save pour que celui-ci soit ajouter à la liste des modules repris dans le fichier package.json.
C'est beaucoup plus simple que de créer un ficher package.json dans le dossier de notre application reprenant toutes les dépendances de notre application et leur version reprise en tapant npm list et cela permettra une mise à jour des modules et une maintenance plus rapide et sûr.

````json
{
    "name": "ma_todolist",
    "version": "0.1.0",
    "dependencies": {
        "express": "~4.16.2",
        "ejs": "~2.5.7",
        "favicon": "~0.0.2",
        "logging":"~3.2.0",
        "markdown": "~0.4.0",
        "morgan": "~1.9.0",
        "serve-favicon" : "~2.4.5",
	      "body-parser" : "~1.18.2",
	      "cookie-session": "~2.0.0 - beta.3",
    },
    "author": "Marie-Ange Bouchat <bouchat.marieange@gmail.com>",
    "description" : "Un gestionnaire de todolist ultra basique réalisé dans le cadre d'un TP du couurs node.js de OpenClassrooms"
}
````
Petite remarque, le petit tilde ~ placer devant la version des modules permet d'autoriser les futurs patchs de ces modules mmais pas les nouvelles versions mineures ou majeures, ce qui garantit que leur API ne changera pas, et donc que notre code continuera à fonctionner même avec ces mises à jour.

* Installation de toutes les dépendances avec la commande npm install
    * Installer express (npm install express)
    * Installer ejs (npm install ejs)
    * Installer un middleware de logging (npm install morgan)
    * Installer cookie-session (npm install cookie-session)(https://github.com/expressjs/cookie-session/blob/master/README.md) documentation: (https://www.npmjs.com/package/cookie-session)
    * Installer body-parser (npm )()(Pour gérer la requête HTTP POST dans Express.js version 4 et supérieure, vous devez installer un module middleware appelé body-parser.body-parser est un morceau de middleware express qui lit l'entrée d'un formulaire et le stocke comme un objet javascript accessible via req.body.)
    * Install markdown (npm install markdown)

* Créer un fichier app.js

* On commence par gérer les routes en listant ce que l'application doit pouvoir faire : lister les tâche (/todo) , ajouter une tâche (/todo/ajouter), supprimer une tâche en fonction de son id(/todo/supprimer/:id). On ajoute le code correspondant dans le fichier app.js

````javascript
// On commence par écrire les différentes routes qui corresponde chacune à une des tâches que l'application doit pouvoir réaliser
// Route 1 : l'application doit pouvoir lister les tâches
.get('/todo', function(req, res) {

});

// Route 2 : l'application doit pouvoir ajouter des tâches
// Attention .post() et pas .get() . Les données de formulaire se transmette généralement avec la méthode post et pas get. On fait donc appel à .post() pour ajouter des tâches au lieu de faire appel à .get()
.post('/todo/ajouter', function(req, res) {

});

// Route 3 : l'application doit pouvoir supprimer des tâche en fonction de leur n°d'ID
.get('/todo/supprimer/:id', function(req, res) {

});
````

* Nous aurons besoin d'un système de sessions. Pour cela nous allons utiliser le middleware cookie-session (installer le avec la commande npm install cookie) Voici la documentation: https://www.npmjs.com/package/cookie-session
Le module cookie-session stocke les données de sessioin sur le client (pas sur le serveur) dans un cookie, tandis qu'un module comme express-session stocke seulement un identifiant de session sur le client dans un cookie et stocke les données de session sur le serveur, typipquement dans une base de données.
Comment choisir quel module utilisé entre cookie-session et express-session:
      * `cookie-session` ne nécessite aucune base de données/ressources côté serveur, bien que les données de session totales ne puissent pas dépasser la taille maximale des cookie du navigateur.
      * ´cookie-session´ peut simplifier certains load-balanced scenario
      * `cookie-session` peut être utilisé pour stocker une session "légère" et inclure un identifiant pour réduire les recherches dans la base de données.


* Nous aurons besoin de récupérer les données du formulaire dans /todo/ajouter. Nous avons appris à récupérer des paramètres depuis l'URL (transmis en get), mais pas depuis les formulaires. Pour faire cela nous allons avoir besoin du middleware `body-parser` qui permet de récupérer des infos transmise par la méthode poste et accessible via req.body.nomDuChamp.

* Créer un sous-dossier "views" contenant un fichier todo.ejs pour gérer le template de views de la todolist avec une extension .ejs

Voici le code commenté et expliqué du fichier app.js situé à la racine du dossier:

````javascript

var express = require('express'); //on demande l'inclusion d'Express, le framework Node.js qui permet de réaliser des applications plus facilement. Ne pas oublier d'installer express dans le dossier de travail avec la commande npm install express (cela créer un dossier node_modules qui contient les fichiers du framework dans le dossier de travail)
var session = require ('cookie-session'); // Charge le middleware de sessions. On demande l'inclusion du module cookie-session préalablement installé avec npm install cookie-session
var bodyParser = require ('body-parser'); // Charge le middleware de gestion des paramètres. On demande l'inclusion du module body-parser qui va nous permettre de récupérer les infos transmise avec la méthode poste à partir du formulaire d'ajout de tâches dans la todolist.
var urlencodedParser = bodyParser.urlencoded({ extended: false }); // on utilise middleware bodyParser qui utiiser avec l'option bodyParser.urlendocded, qui analyse les urlencoded et récupère les content-type header d'un certain type. Le infos sur récupéré dans un objet req.body qui contient des paire de clé-valeur. La valeur peut être une chaine ou un tableau (when extended is false) ou un autre type (when extended is true)


var app = express(); // on crée un objet app en appelant la fonctionc express()


// On commencen par mettre en place le systeme de session
// Avec le module cookie-session, on va mettre un place un système de session pour notre application
// Ce module middleware stocke les données de session sur le client (et non sur le serveur) dans un cookie
// cookie-session ne nécessite aucune base de données / ressources côté serveur, bien que les données de session totales ne puissent pas dépasser la taille maximale des cookies du navigateur.
// Ce middleware va attacher la propriété `session` à `req`, qui fournit un objet représentant la session chargée
// Cette session est soit une nouvelle session si aucune session valide n'a été fournie dans la requête , soit une session chargée à partir de la requête.
//le paramètre ´secret´ envoyé au module de session est obligatoire, il permet de sécuriser les cookies de session. Envoyer la valeur de votre choix. D'autres options peuvent être envoyée comme la durée de vie du cookie de session (par défaut, la session durera tant que le navigateur restera ouvert) - cfr documentation : https://www.npmjs.com/package/cookie-session
app.use(session({secret: 'todotopsecret'}))


// La liste des tâches est stockée dans un array (tableau). Comme JavaScript n'apprécie pas qu'on essaie de parcourir des arrays qui n'existent pas,
//On va créer un middleware qui crée automatiquement un array (tableau) vide si le visiteur n'a pas de todolist (parce qu'il vient de commencer sa session par exemple)
// Cette fonction middleware recoit la requête, la réponse et la prochaine fonction à exécuter. Ce middle ware que j'ai crée à une fonction toute simple, celle de vérifier qu'il y a une todolist dans la session et si ce n'est pas le cas, il crée un arrya vide [].Cela évite pas mal d'erreurs par la suite.
// La création d'un middleware est le seul moyen à ma disposition pour exécuter des fonctionnalités avant le chargement de n'importe quelle page.
// Et pour que le middleware "passe le bébé à son voisin", je dois définir impérativement par un appel à next() (la fonction suivante). Dans le cas présent, next() fait référence à .get('/todo',function(){})
.use(function(req, res, next){
    if (typeof(req.session.todolist) == 'undefined') { // Si pas encore de session et donc pas de tableau todolist à parcourir, alors on crée un tableau todolist vide todolist = []; que l'on stocke dans la session
        req.session.todolist = [];// On
    }
    next();
})

// On écrit les différentes routes qui corresponde chacune à une des tâches que l'application doit pouvoir réaliser
// Route 1 : l'application doit pouvoir lister les tâches - On affiche la todolist et le formulaire
.get('/todo', function(req, res) {
    res.render('todo.ejs', {todolist: req.session.todolist});
})

// Route 2 : l'application doit pouvoir ajouter des tâches - On ajoute un élément à la todolist
// Attention .post() et pas .get() . Les données de formulaire se transmette généralement avec la méthode post et pas get. On fait donc appel à .post() pour ajouter des tâches au lieu de faire appel à .get()
.post('/todo/ajouter/', urlencodedParser, function(req, res) {
    if (req.body.newtodo != '') {//les requêtes entrantes sont récupérée à partir de données transmise par la methode post par le middleware body-parser dans ma proproété appelé req.body (cfr doc: https://www.npmjs.com/package/body-parser)
        req.session.todolist.push(req.body.newtodo); // On ajoute des éléments à la fin du tableau déja stocké dans la session de l'utilisateur avec la méthode push() qui permet d'ajouter une ou plusieurs entrée à la fin d'un tableau et retourne la nouvelle taille du tableau. Cette méthode prend en paramètre les éléments à ajouter au tableau, c'est à dire la tache récupérée par la méthode post à partir du formulaire grâce au middleware body-parser
    }
    res.redirect('/todo');
})

// Route 3 : l'application doit pouvoir supprimer des tâche en fonction de leur n°d'ID
.get('/todo/supprimer/:id', function(req, res) {
    if (req.params.id != '') { // Si on le paramètre id récupérée dans l'url n'est pas vide, alors effectuer le code qui suit
        req.session.todolist.splice(req.params.id, 1); //suppression d'éléments du tableau avec .splice.
        //La methode splice() supprime un ou plusieurs éléments du tableau.
        //Elle prend en premier argument l'index à partir duquel on commence la suppression et en deuxième argument le nombre d'éléments à supprimer.
        //Après cette opération, elle réindexe les éléments du tableau, ce qui n'est pas le cas de la méthode delete qui supprime les éléments du tableau mais ne le restructure pas après et laisse de mot clé undefined à la place des élément supprimé, indiquant que cet élément supprimé est à présent non défini.
        //Il est donc préférable dans ce cas d'utiliser la méthode slice()
    }
    res.redirect('/todo');//redirige le visiteur vers la liste (/todo) après un ajout ou une suppression d'élément, avec res.redirect('/todo')
})


/* On redirige vers la todolist si la page demandée n'est pas trouvée */
.use(function(req, res, next){
    res.redirect('/todo');
})

app.listen(8080);
````


Voici le code du fichier todo.ejs se trouvant dans le sous-dossier views du dossier de travail:

````html
<!DOCTYPE html>

<html lang="en">

<head>
  <!-- <meta charset="UTF-8"> -->
  <!-- <link rel="stylesheet" href="css/style"> -->
  <style>
      a {text-decoration: none; color: black;}
  </style>
  <title>TP - Ma todolist</title>
</head>

<body>
    <h1>Ma todolist</h1>

      <!-- Affichage de toutes les tâches (todo) et des valeurs d'index (index) qui leur sont associés contenues dans le tableau (todolist) -->
      <ul>
      <% todolist.forEach(function(todo, index) { %> <!-- On réalise une boucle forEach dans un tableau qui s'appelle todolist et on récupère en arguments todo (la tâche) et index (l'index lié à cette tâche qui permettra de la supprimer) -->
          <li><a href="/todo/supprimer/<%= index %>">✘</a> <%= todo %></li> <!-- On place dans le <li> sous forme de lien l'index récupéré dans l'url de todo/supprimer/index et sous forme de texte du <li> le nom de la tâche -->
      <% }); %>
      </ul>

      <!-- Formulaire d'ajout de tâche à la liste -->
      <form method="post" action="/todo/ajouter/"><!-- On envoie à la page de traitement /todo/ajouter/ les tâches ajoutées via le formulaire avec la méthode post (nécessité du middleware body-parse)-->
        <p>
          <label for= "newtodo">Que dois-je faire ? </label> <!-- Label, Etiquette de l'input pour la tâche à ajouter -->
          <input type="text" name="newtodo" id="newtodo" autofocus /><!-- On crée un input de type text lié au label "for" du label est identique au "name" de l'input = newtodo -->
          <input type="submit" value="Valider" />
        </p>
    </form>

  </body>

</html>
````
**Voici les explications du code du fichier todo.ejs qui se charge de l'affichage dans le navigateur:**

Les tâches sont affichées sous la forme d'un liste qui est mise en forme en html avec les balises <li></li> contenue dans des balises <ul></ul>
<ul>
  <li></li>
</ul>

Pour afficher les différentes tâches déja stockées pour l'utilisateur, il faudra faire une boucle sur un tableau pour récupérer chaque tâche (et son index) et les insérer dans les <li> de la liste à puces

Pour effectuer une boucle on va utiliser une boucle forEach qui est le plus adapté pour afficher les élément d'un tableau

Exemple de boucle foreach en javascript

        var a = ['a', 'b', 'c'];
        // le taableau contenant les données

        // le nom du tableau suivi d'un point,puis foreach function (les arguments de la fonction (les éléments que je veux afficher))
        a.forEach(function(element) {
          console.log(element);
          //console/log permet d'afficher le résultat de la boucle foreach dans la console
        });
        // a
        // b
        // c -->


* Appliquons cela à la boucle de la todolist  en utilisant la syntaxe particulière utilisée avec le module ejs <%  %> (pour le code à exéxuter en javascript) et <%= %> (insére de html)
* On place les données récupérée dans une liste en les plaçant entre des balises <li>
out d'abord on récupère l'index de la tache dans l'url et on le place dans un lien <a> à l'intérieur du <li>
* Le lien <a> est fait vers la page /todo/supprimer/<%= index %> c'est la page qui gère la suppression des tâches.
* A la suite du lien <a> on affiche la tâche correspondante <%= todo %>
* La boucle forEach va ainsi afficher toutes les tâches stockées dans tableau todolist en y associant leur id pour permettre de les supprimer.

### Allez plus loin !

Ma petite todolist est très basique. Vous pouvez lui ajouter de nombreuses fonctionnalités :

* Modification des noms des tâches
* Réagencement des tâches entre elles
* Exportation CSV
* Attribution d'une priorité et d'une date limite
* Persistence de la todolist (stockage dans une base de données ou une base NoSQL)
* Partage d'une todolist entre plusieurs personnes
* Synchronisation de la todolist en temps réel entre les personnes sans avoir besoin de recharger la page
* Certaines de ces fonctionnalités sont plus faciles à réaliser que d'autres. Pour d'autres, il vous faudra découvrir et utiliser de nouveaux modules.

Vous avez de quoi vous amuser pendant un bon petit moment, bon courage !


## Quizz 2

Votre score
90%
Bravo ! Vous avez réussi cet exercice !

### Question 1

Comment appelle-t-on la fonction qui doit être appelée lorsqu'un évènement survient ?


* La fonction de callback (v)
* La fonction d'after-event
* La fonction anonymous

On parle de callback pour une fonction qui est automatiquement appelée lorsqu'un évènement survient.

### Question 2

Vrai ou faux ? Une fonction peut être appelée par deux évènements différents.

* Vrai (v)
* Faux

La fonction de callback peut être associée à autant d'évènements qu'on le souhaite.

### Question 3

Vrai ou faux ? On peut associer plusieurs fonctions qui doivent être appelées après un même évènement.

* Vrai (v)
* Faux

On peut associer autant de fonctions de callback qu'on le souhaite à un même évènement.

### Question 4

Qui peut émettre des évènements ?

* Uniquement les fonctions de base de Node.js
* Uniquement les fonctions de base et les bibliothèques officielles
* Tout le monde, même nous (v)

Tout le monde peut émettre des évènements avec Node.js : c'est même un des principes de base qui fait la puissance de Node !

### Question 5

Comment s'appelle le gestionnaire de paquets de Node.js ?

* apt-get
* npm  (v)
* nodepackage

npm est le Node Package Manager : on peut y télécharger des centaines de bibliothèques !

### Question 6

A quoi sert le paramètre -g qu'on ajoute quand on veut installer certains paquets ?

* Il impose une installation silencieuse
* Il impose une installation valable pour tout l'ordinateur du paquet (v)
* Il impose une installation groupée de plusieurs paquets

Utilisez -g uniquement lorsqu'on vous indique que c'est possible et conseillé. Sinon, npm installe le paquet dans le répertoire de votre projet ce qui est amplement suffisant dans la plupart des cas.

### Question 7

Mon projet Node.js est en version 4.5.9. Je viens de corriger un bug, sans ajouter de fonctionnalités ni casser le comportement existant. Quel doit être le nouveau numéro de version ?

* 4.5.10 (v)
* 4.6.0
* 4.6.9
* 5.0.1

Le dernier numéro est réservé aux changements les plus mineurs (comme les bugfixes). C'est donc lui qui doit évoluer.

### Question 8

Quel est le nom du système de templates imposé par Express.js ?

* EJS (x)
* Handlebars
* Twig
* Aucun système de template n'est imposé (v)

On peut utiliser le système de template que l'on veut !

### Question 9

Comment s'appelle le fichier qui définit un projet Node.js (son nom, ses dépendances...) ?

* project.js
* package.json  (v)
* README
* package.conf

Le fichier package.json contient toutes les informations principales sur votre projet. C'est ce qui est utilisé par npm notamment pour indexer votre projet.

### Question 10

Que signifie cette configuration pour mon projet ?

"dependencies": {
    "ejs": "~0.6.5"
}

* Le projet dépend de EJS version 0.6.5 uniquement
* Le projet dépend de EJS version 0.6.5 et supérieures, jusqu'à 0.7.0 non inclus (v)
* Le projet dépend de EJS version 0.6.5 et supérieures, jusqu'à 0.7.0 inclus
* Le projet dépend de EJS version 0.6.5 et supérieures, jusqu'à 1.0.0 non inclus

Le tilde dans le cas présent signifie qu'on accepte des mises à jour de la dépendance à condition qu'il s'agisse uniquement de patchs. Donc la version 0.7.0 est exclue car c'est une mise à jour plus importante.

## Socket.io : passez au temps réel
