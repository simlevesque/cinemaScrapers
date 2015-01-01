var cinestarz = {};

cinestarz.js1 = function(){
	var films = document.getElementsByClassName("movie-text"),
		_cinema = {},
		_cinemaName = "Cinéstarz Langelier",
		_cinemaAdress = "7305, Boulevard Langelier, Montréal",
		_films = [];

	for(var i = 0; i<films.length;i++){
		var film = films[i],
			filmname = film.children[0].textContent,
			filmhoraire = film.children[1].children,
			_horaire = {},
			_film = {},
			dates = [],
			times = [];
	  
		for(var j = 0; j<filmhoraire.length;j++){
			if(filmhoraire[j].tagName !== "BR"){
				var child = filmhoraire[j];

				if(parseInt(child.textContent)){
					times.push(child.textContent); 
				} else {
					dates.push(child.textContent); 
				}
			}
		}
	  
		for(var j = 0;j<dates.length;j++){
			_horaire[dates[j]] = times[j]
		}
	  
		_film.shows = _horaire;
		_film.name = filmname;
		_film.lang = "fr";
		_films.push(_film);
	}

	_cinema.films = _films;
	_cinema.name = _cinemaName;
	_cinema.adress = _cinemaAdress;

	return _cinema;
}

cinestarz.js2 = function(){
	var films = document.getElementsByClassName("movie-text"),
		_cinema = {},
		_cinemaName = "Cinéstarz Côte-Des-Neiges",
		_cinemaAdress = "6700, Cote des Neiges #300 AB, Montréal",
		_films = [];

	for(var i = 0; i<films.length;i++){
		var film = films[i],
			filmname = film.children[0].textContent,
			filmhoraire = film.children[1].children,
			_horaire = {},
			_film = {},
			dates = [],
			times = [];
	  
		for(var j = 0; j<filmhoraire.length;j++){
			if(filmhoraire[j].tagName !== "BR"){
				var child = filmhoraire[j];

				if(parseInt(child.textContent)){
					times.push(child.textContent); 
				} else {
					dates.push(child.textContent); 
				}
			}
		}
	  
		for(var j = 0;j<dates.length;j++){
			_horaire[dates[j]] = times[j]
		}
	  
		_film.shows = _horaire;
		_film.name = filmname;
		_film.lang = "en";
		_films.push(_film);
	}

	_cinema.films = _films;
	_cinema.name = _cinemaName;
	_cinema.adress = _cinemaAdress;

	return _cinema;
}


cinestarz.liens1 = ["http://cinestarz.ca/now-playing/?thr=lan", cinestarz.js1, "fr"];
cinestarz.liens2 = ["http://cinestarz.ca/now-playing/?thr=cote", cinestarz.js2, "en"];

module.exports = cinestarz;