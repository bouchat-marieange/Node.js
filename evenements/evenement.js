// on importe le module fs que l'on stocke dans la variable fs
var fs = require('fs');

// on appelle la méthode "createReadStream()" contenu dans le module fs que l'on stocke dans une nouvelle variable appellée rs
var rs = fs.createReadStream('./fichier');

// on utilise rs comme un objet pour y exécuter on() avec en premier paramètre open.
// Ce on() va nous permettre d'éxécuter un script, une fonction.
rs.on('open', function() {

  // Dans le cas présent, on va exécuter le console.log sur rs lorsque './fichier' sera ouvert par l'utilisateur
  // En fait cela va afficher "le fichier est maintenant ouvert !!!" dans la console, au moment où l'utilisateur ouvrira effectivement le fichier
 console.log('Le fichier est maintenant ouvert!!!');
});
