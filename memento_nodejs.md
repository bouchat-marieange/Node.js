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
