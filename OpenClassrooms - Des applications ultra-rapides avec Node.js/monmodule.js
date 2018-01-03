var direBonjour = function() {
    console.log('Bonjour !');
}

var direByeBye = function() {
    console.log('Bye bye !');
}

exports.direBonjour = direBonjour;
exports.direByeBye = direByeBye;

// On exporte les fonctions direBonjour et direByeBye pour pouvoir
// les appelées de l'extérieur dans un autre fichier.
// Si on ne les exporte pas ces fonctions resteront privées et ne pourront
// pas être appelées de l'extérieur.
// Elles pourront pas contrre tout à fait être utilisées par d'autres
// fonctions de notre module.

// Pour afficher dans la console le résultat de ce module, il faut
// ouvrir le fichier appli.js qui appelle les 2 fonctions que l'on a
// exporté puis appellée dans ce fichier. C'est donc ce fichier qui les
// exécute. Si on tente de lancer monmoduler.js , rien ne se passe car une
// fonction doit être appelée pour faire quelque chose et aucune ligne
// de code dans ce module n'appelle la fonction. Dans ce fichier monmodule.js 
// on se contente de créer les fonctions et de les exportées pour qu'elles puissent
// être utilisées et appelées dans un autre fichier.
