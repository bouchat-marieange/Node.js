<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Ma todolist</title>
  <style>
  /*CSS directement insérer dans le head de la page. Permet de mettre les liens en noir et non soulignés*/
    a {text-decoration: none; color: black;}
  </style>
</head>
<body>
  <h1>Ma todolist</h1>

  <!-- On crée une liste à puces <ul> avec à l'interieur un boucle foreach qui va afficher les différentes tâches contenues dans des <li> -->
  <!-- Juste après chaque puce de chaque <li>, il y aura le symbole d'une croix (caractère unicode indiquant la suppression de la tâches). -->
  <!-- Cette croix sera un lien vers la page de suppression qui enverra l'id correspondant à la tâches via l'url et supprimera donc du tableau stocké en session la tâche correspondant à cet id. -->
  <!-- la croix pour supprimer un élément est un simple caractère unicode https://unicode-table.com/fr/ qui est un lien vers la page supprimer -->
  <!-- Tout ce qui est en javascript ou données récupérée en javascript et qui n'est pas directement du code html doit se placer entre les balise <% et %> -->
  <ul>
  <% todolist.forEach(function(todo, index) { %>
      <li><a href="/todo/supprimer/<%= index %>">✘</a> <%= todo %></li>
  <% }); %>
  </ul>


  <form method="post" action="/todo/ajouter">
    <p>
      <label for="newtodo">Que dois-je faire? </label>
      <input type="text" name="newtodo" id="newtodo" autofocus />
      <input type="submit" />
    </p>
  </form>
</body>
</html>
