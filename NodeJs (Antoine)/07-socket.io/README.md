# WebSocket
 Les websockets c'est chouette !!
 Pourquoi me direz-vous? Parce que vous pouvez communiquer en temps réel entre la page web et node.Plus besoin de rafrachir la page pour afficher les nouvelles informations.

 La même page peut envoyer des informations sans passer par un formulaire et recevoir des infromations en direct et tout ça en javascript !

 ## Ce dont vous avez besoin
  1. Coté serveur

    Pour gerer les websocket avec nodeJS vous aurez besoin d'installer le module ```socket.io```  avec npm.

  2. Coté  client

    Pour communiquer avec les websockets , vous aurez besoin d'inclure la version client de socket.io sur vos pages web.
    ```
    <script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.0.4/socket.io.js"></script>
    ```
## Fonctionnement de base
  1.Pour initaliser socket io , il ne suffit pas de creer un objet,il  faut aussi lui dire d'utiliser le server que vous aurez creer plus haut.

  ```js
  var io = require('socket.io')(server);

  ```
  Avant d'utiliser socket.io,il faut que le server soit lié sur un port
  ```js
  server.listen(8080);
  ```
  2.La première chose à faire avant de recevoir ou envoyer des donner , c'est d'attendre que la connexion websocket soit établit avec la page web.
  Pour cela,il faudra attendre que l'évènement connection soit enclenché.
  ```js
    io.on('connection', function (socket) {

    });
  ```
  Pour se connecter coté page web (client)
  ```
  var socket = io('http://localhost');
  ```
  
  3.Messages
  Pour communiquer socketio utiliser des evenements,on peut d'un coté écouter un événement et le l'autre envoyer des messages à ces événements.
   On peut creer autant de type d'évenement que l'on veut mais aussi décider de n'en écouter que certain d'entre eux.
    
   Pour envoyer un evenement de type bienvenu au client par exemple :(coté serveur)
 
   ```js
    socket.emit("bienvenue","Bonjour ceci est votre 1ere connection");
    ```
 et pour le recevoir:(coté client)
  ```js
  socket.on('bienvenue', function (data) {
   alert("le serveur nous dit :"+data);
  });
  ```

   L'inverse est aussi possible ou le client envoye un message , et le server écoute.
