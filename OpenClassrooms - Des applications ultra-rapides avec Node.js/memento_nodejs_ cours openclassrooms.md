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
On parse la chaîne. Le problème c'est qu'on renvoie toute la chaîne sans découper au préalable les différents paramètres. Heureusement, il existe un module Node.js qui s'en charge pour nous: querystring!

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

Voici un exemple complet et concret. On va lancer un serveur et l'arrêter jsute après. On écoute l'évènement close qui survient lorsque le serveur est arrêter. On affiche un message dans al console quand le serveur s'apprête à s'arrêter.

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

Le module sera alors installé localement spécialement pour vore projet. Si vous avez un autre projet, il faudra alors relancer la commande dans le dossier de cet autre projet pour l'installer à nouveau. Cela vous permet d'utiliser des versions différentes d'un même module en fonction de vos projets.

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

Ce fichier JSON contient  paires clé-valeur:

* name : c'est le nom de votre application. Restez simple, évitez espaces et accents.

* version: c'est le numéro de version de votre application. il est composé d'un numéro de version majeure, de version mineure et de patch.

* dependencies: c'es tun tableau listant les noms des modules dont a besoin votre application pour fonctionner ains que les versions compatiblesK

Le ficheir peut être beaucoup plsu complet que cela, je ne vous ai montré ici que les valeurs essentielles. Pour tout connaître sur le fonctionnement de ce fichier package.json, je vous recommande cette cheat sheet: http://package.json.nodejitsu.com/
http://browsenpm.org/package.json
https://docs.npmjs.com/getting-started/using-a-package.json

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
     res.setHeader('Content-Type', 'text/plain');
     res.send(404, 'Page introuvable !');
 });

 app.listen(8080);
 ````