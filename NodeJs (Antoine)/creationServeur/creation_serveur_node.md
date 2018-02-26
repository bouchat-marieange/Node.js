# Créer un serveur web avec Nodejs 

Dans ce chapitre, nous allons apprendre à créer notre propre serveur web grâce à bibliothèque node, afin de communiquer 
du contenu à notre navigateur via les modules et méthodes que node nous propose. 


## Le module HTTP

Pour commencer nous aurons besoin de créer un fichier nommé "server.js" et d'y inclure le module "http",
qui nous donnera les outils nécessaires, pour communiquer avec le navigateur via le protocole HTTP (Hyper Text Transfer Protocol):  

```
var http = require("http");
```

## La méthode createServer

Une fois le module "http" inclus dans notre fichier "server.js", nous aurons accès à la méthode
"http.createServer()" qui comme son nom l'indique, nous permettra de créer notre serveur. Cette méthode
va nous passer deux paramètres : les objets request et response: 

```
var server = http.createServer(function(request, response) {
});
```

## Les objets Request et Response

L'objet "request" va nous fournir des informations concernant la requête client tel que son url, les en-têtes HTTP,...  
Tandis que l'objet "response" servira à retourner des données comme du texte, du html, un fichier,... 

Le but étant de communiquer du contenu à notre navigateur, ici seul l'objet "response" et quelques-unes de ces méthodes vont nous intéresser.  

La première étape consistera à appeler la méthode "response.writeHead()" qui va définir le statut de notre requête http ainsi que le type de contenu que l'on souhaite retourner.  
   
Ensuite "response.write()" va tout simplement, permettre de concevoir notre document html passé en arguement.
   
Et enfin "response.end()" viendra signifier la fin de notre réponse.  

```
response.writeHead(200, {"Content-Type": "text/html"});
response.write(`
    <!doctype html>
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
```

## La méthode listen

La dernière méthode appelée dans notre fichier sera "server.listen()", qui va lier notre serveur au port 
de notre choix. Ici nous utilisons le port 8080 mais comme mentionné juste avant, libre à vous d'utiliser un autre port afin 
d'accéder à votre seveur web:  

```
server.listen(8080);
```
  
Et voilà, Il ne nous reste plus qu'à démarrer notre serveur via le terminal grâce à ligne de commande ci-dessous 
et à admirer notre magnifique message "hello world" à l'adresse suivante: http://localhost:8080

```
node server.js
```  

 le code complet :  
```
var http = require("http");
var server = http.createServer(function (request, response) {
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(`
        <!doctype html>
        <html lang="en">
            <head>
                <meta charset="UTF-8">
                <title>mon server</title>
            </head>
            <body>
                <p>Hello world</p>
            </body>
        </html>
    `);
    response.end();
});

server.listen(8080);

```

Lien utile pour de plus amples informations concernant le sujet :  
[Une première application avec Node.js](https://openclassrooms.com/courses/des-applications-ultra-rapides-avec-node-js/une-premiere-application-avec-node-js)
