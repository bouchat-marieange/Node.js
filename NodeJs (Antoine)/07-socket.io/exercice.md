# Creer un chat avec socket.io
  Le but de cet exercice sera de creer un chat instantané trés simple qui devra:


  1.Prendre un pseudo et l'envoyer au server (pas de connexion ni mot de passe à gerer)(à gerer via socket.io aussi)


  2.Dans la même page,afficher le chat


  3.Envoyer et recevoir des message via socket.io

## truc en plus
*  Toute les variables que vous déclarer dans l'évenement de connection( coté server ) resterons spécifique à chaque utilisateur
  ```
    io.on('connection', function (socket) {
      var uneDonnéeParUtilisateur;
    });
  ```
* Pour envoyer un événement à tout les client connectés,utiliser la methode ```socket.broadcast.emit```  
