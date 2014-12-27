/*
 * Ceci est une ardoise JavaScript.
 *
 * Saisissez du code JavaScript, puis faites un clic droit ou sélectionnez à partir du menu Exécuter :
 * 1. Exécuter pour évaluer le texte sélectionné (Ctrl+R),
 * 2. Examiner pour mettre en place un objet Inspector sur le résultat (Ctrl+I), ou,
 * 3. Afficher pour insérer le résultat dans un commentaire après la sélection. (Ctrl+L)
 */

var films = document.getElementsByClassName("unFilm"),
    cinema = {name:"beaubien"},
    _films = [];

for(var i = 0;i<films.length;i++){
  var isFilm = films[i].children[1].children[0].className === "titre";
  if(isFilm){
    
     var infos = films[i].children[1],
         shows,
        nom = infos.children[0].children[0].children[0],
        _nom = "",
        _times = {};
    //get name
    for(var j = 0; j<nom.children.length;j++){
      var child = nom.children[j];
      if(child.tagName === 'CUFON') _nom = _nom + child.textContent;
    }
    //get showtimes
    for(var j = 0; j<infos.children.length;j++){
      var child = infos.children[j];
      if(child.tagName === 'TABLE') shows = child.children[0];
    }
    // showtimes by day
    for(var j = 0; j<shows.children.length;j++){
      var date = shows.children[j].children[0].textContent,
          time = shows.children[j].children[1].textContent.split(",");
      
      for(var k = 0; k<time.length;k++){
       time[k] = time[k].replace(/\s+/g,' ').trim();
        
      }
       
      _times[date] = time;
    }
    
    var film = {name:_nom, show:_times}
    _films.push(film);
  }
}
cinema.films = _films;
console.log(cinema);