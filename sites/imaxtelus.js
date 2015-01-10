var imaxtelus = {};

imaxtelus.js = function(){

	var horaire = document.getElementById("IMAX-Horaire").children[0].children,
		_cinemaName = "IMAX Telus",
		_cinemaAdress = "2, Rue de la Commune Ouest, Montréal",
		_films = [],
		_cinema = {},
		_shows = {en:{}, fr:{}},
			_day = document.getElementsByClassName("selected")[0].textContent,
			_month = document.getElementsByTagName("H6")[0].textContent.split(" ").slice(0,1)[0],
		_today = [_day, _month].join(" ");
		_shows["en"][_today] = [];
		_shows["fr"][_today] = [];

	for(var i = 0;i<horaire.length;i++){
		var time = horaire[i].children[0].textContent,
			nom = horaire[i].children[1].textContent.split("(")[0].replace(/\s+/g,' ').trim(),
			lang = horaire[i].children[1].textContent.split("(")[1].replace(/\s+/g,' ').trim(),
			film = {};
		if (lang === "v.f.)") lang = "fr"
		else if (lang === "v.o.)") lang = "en"
		else lang = "error"
		
		time = time.replace(/\s/g, '');
		
		if(lang !== "error") createFilm(nom, lang, time);
	}

	_cinema.show = _shows;
	_cinema.name = _cinemaName;
	_cinema.adress = _cinemaAdress;
	return _cinema;

function createFilm(name, lang, time){
	var _film = {name:name, time:time};
	_shows[lang][_today].push(_film);
}
}

imaxtelus.liens = ["http://www.centredessciencesdemontreal.com/imax-telus/cinema-imax-telus.html", imaxtelus.js, "fr"];

module.exports = imaxtelus;