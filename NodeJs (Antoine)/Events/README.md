# Les événements


## Les évenements existant :

``` javascipt
var fs = require('fs');
var rs = fs.createReadStream('./fichier');

rs.on('open', function () {
  console.log('Le fichier est maintenant ouvert!!!');
}); 
```

## Créer ces propres événements :
``` javascipt
// 
var events = require('events');
var eventEmitter = new events.EventEmitter(); 

// Creation de l'évenement
var myEvent = function () {
  console.log('Vive le terminal');
}

// Application de l'événement à un cas
eventEmitter.on('terminal', myEvent);

// Lance l'évenement "aimeTerminal"
eventEmitter.emit('terminal');
```
