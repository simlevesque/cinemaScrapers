var beaubien = {};

beaubien.js = function(){
	var films = document.getElementsByClassName("unFilm"),
		cinema = {name:"Cinéma Beaubien"},
		_films = [],
		_adress = "2396, rue Beaubien Est, Montréal",
    _shows = {en:{},fr:{}};
	cinema.scraper = "indie";
	for(var i = 0;i<films.length;i++){
	  var isFilm = films[i].children[1].children[0].className === "titre";
	  
	  if(isFilm){
		var infos = films[i].children[1],
			shows,
			nom = infos.children[0].children[0].children[0],
			_nom = "",
			_times = [],
			lang = "?";
			
		//get name
		for(var j = 0; j<nom.children.length;j++){
		  var child = nom.children[j];
		  
		if(child.tagName === 'CUFON') _nom = _nom + child.textContent;
		  if(child.classList.toString()=== 'date') { 
			var tmpLang = child.textContent;
			
			if (tmpLang.indexOf("ang") !== -1) lang = "bi"
			else lang = "fr"
		   }
		}
		
		if (lang === "?") lang = "fr"
		
		//get showtimes
		for(var j = 0; j<infos.children.length;j++){
		  var child = infos.children[j];
		  
		  if(child.tagName === 'TABLE') shows = child.children[0];
		}
		
		// showtimes by day
		for(var j = 0; j<shows.children.length;j++){
		  var date = shows.children[j].children[0].textContent.split(" ").slice(1).join(" "),
				time = shows.children[j].children[1].textContent.replace(/\s+/g,' ').trim().split(",");
		   createFilm(_nom, lang, date, time);
			console.log(date)
		}
		
		
	  }
	}
	
	cinema.shows = _shows;
	cinema.adress = _adress
	return cinema;
	//console.log(cinema);
function createFilm(name, lang, date, time){
	if(lang === "bi"){
		if(typeof _shows["fr"][date] !== "object") _shows["fr"][date] = []
		if(typeof _shows["en"][date] !== "object") _shows["en"][date] = []
		var film = {name:name, time: time}
		_shows["fr"][date].push(film);
		lang = "en";
	} else {
		if(typeof _shows[lang][date] !== "object") _shows[lang][date] = []
	}
	
	var film = {name:name, time:time}
	
	_shows[lang][date].push(film);
}
}

beaubien.liens = ["http://cinemabeaubien.com/fr/alaffiche.aspx", beaubien.js, "Cinéma Beaubien"];

module.exports = beaubien;