var imaxtelus = {};

imaxtelus.js = function(){
	var horaire = document.getElementById("IMAX-Horaire").children[0].children,
		_cinemaName = "IMAX Telus",
		_cinemaAdress = "2, Rue de la Commune Ouest, Montréal",
		_films = [],
		_cinema = {};

	for(var i = 0;i<horaire.length;i++){
		var time = horaire[i].children[0].textContent,
			nom = horaire[i].children[1].textContent.split("(")[0].replace(/\s+/g,' ').trim(),
			lang = horaire[i].children[1].textContent.split("(")[1].replace(/\s+/g,' ').trim(),
			film = {};
		if (lang === "v.f.)") lang = "fr"
		else if (lang === "v.o.)") lang = "en"
		else lang = "error"
		time = time.replace(/\s/g, '')
		film.time = time;
		film.name = nom;
		film.lang = lang
		if(lang !== "error") _films.push(film)
	}

	_cinema.films = _films;
	_cinema.name = _cinemaName;
	_cinema.adress = _cinemaAdress;
	return _cinema;
}
imaxtelus.liens = ["http://www.centredessciencesdemontreal.com/imax-telus/cinema-imax-telus.html", imaxtelus.js, "fr"];
module.exports = imaxtelus;
