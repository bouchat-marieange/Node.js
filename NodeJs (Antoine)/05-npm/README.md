# Utiliser npm

  Npm est un gestionnaire de paquet  qui vous permettera d'installer des modules que vous pourrez utiliser avec Node.js


- Pour initialiser un projet

  Quand on initialise un projet avec npm , celui ci créer un fichier package.json.Ce fichier contient non seulement le nom et la version du projet mais aussi, tout les modules utilisés par le projet.

  Cela vous servira à lister tout les modules dont vous avez besoin.Ce qui vous permettera de tous les réinstaller pas la suite en cas de

  Pour initialiser un projet , faites la commande suivante :
  ```
    > npm init
  ```
  Npm vous demandera le nom et la version du projet.Les modules que vous installerez y seront ajouté à la liste au moment ou vous les installerez.

- installer paquet localement

  Quand on installe un paquet localement , les fichiers du module se trouveront dans le dossier de votre projet node,cela vous permettera de changer votre projet d'ordinateur sans devoir résinstaller le module.
  ```
  npm install nom_du_module
  ```

- installer paquet globalement

  A l'inverse de l'installation local (cad dans un projet précis), l'installation globale installe et rends disponible un module dans tout votre système.Pas besoin de le réinstaller pour chaque projet.
  En contrepartis, il faudra résintaller de le module sur chaqu'un des ordinateur ou se trouve le projet.
  ```
  npm install -g nom_du_module
  ```

- update paquet

  Pour mettre à jour un module :
  ```
  npm update -g nom_du_module
  ```
  Enlever ou rajouter ``` -g ``` selon que c'est un package global ou non.

- utiliser un module
  Les modules installés via les packets s'utilisent avec la fonction require.
  ```
  var utilisation= require("nom_du_module");
  ```

- npmjs.com

  Le site [npmjs.com](https://www.npmjs.com/) est la source depuis laquelle npm télécharge tout les modules.Vous pouvez retrouver chercher tout lse modules disponible;
  Et le lien de la doc: [npmjs.com](https://docs.npmjs.com/)
