//Pour se connecter coté client:
var socket = io('http://localhost:8080');

// Et pour recevoir du coté client
socket.on('bienvenue', function(data) {alert("le serveur nous dit :"+data);
});
