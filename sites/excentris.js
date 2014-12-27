var films = document.getElementsByClassName("thumb"),
    _films = [],
    _cinemaName = "ExCentris",
    _cinema = {};

for(var i = 0;i<films.length;i++){
  var film = films[i].children[1],
      _film = {};
  _film.name = film.children[0].textContent;
  console.log(_film);
  
}