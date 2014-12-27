/*
 * Ceci est une ardoise JavaScript.
 *
 * Saisissez du code JavaScript, puis faites un clic droit ou sélectionnez à partir du menu Exécuter :
 * 1. Exécuter pour évaluer le texte sélectionné (Ctrl+R),
 * 2. Examiner pour mettre en place un objet Inspector sur le résultat (Ctrl+I), ou,
 * 3. Afficher pour insérer le résultat dans un commentaire après la sélection. (Ctrl+L)
 */

var horaire = document.getElementById("IMAX-Horaire").children[0].children,
    _cinemaName = "IMAX Telus",
    _films = [],
    _cinema = {};

for(var i = 0;i<horaire.length;i++){
    var time = horaire[i].children[0].textContent,
        nom = horaire[i].children[1].textContent.replace(/\s+/g,' ').trim(),
        film = {};
    time = time.replace(/\s/g, '')
    film.time = time;
    film.name = nom;
  
  _films.push(film);
}
_cinema.films = _films;
_cinema.name = _cinemaName;

console.log(_cinema);
