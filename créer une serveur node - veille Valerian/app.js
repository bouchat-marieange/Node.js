const http = require('http');

//create a server object:
http.createServer(function (req, res) { //req se sont toutes les requêtes que le serveur aura et res sera toute les réponse que le serveur aura
  // res.write('Hello World!'); //write a response to the client . On peut même taper des balises html directement ici
  response.writeHead(200, {"Content.Type": "text/html"}) // On ne pourra mettre dedans que tu code html, code 200 (est un code d'erreur disant ok tout s'et bien passé - 404 par exemple c'est le code pour page non trouvée) veut juste dire que si renvoie 200 tout s'est bien passé). Idéal à utilisé avec système MVC on peut indiquer à la suite les require views, controller.
  res.write("hello");

  res.end(); //end the response
}).listen(8080); //the server object listens on port 8080 -Le port d'écoute sur lequel on va aller pour voir notre site.
