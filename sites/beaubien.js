var beaubien = {};

beaubien.js = function(){
	var films = document.getElementsByClassName("unFilm"),
		cinema = {name:"beaubien"},
		_films = [],
		_adress = "2396, rue Beaubien Est, Montréal";

	for(var i = 0;i<films.length;i++){
	  var isFilm = films[i].children[1].children[0].className === "titre";
	  
	  if(isFilm){
		var infos = films[i].children[1],
			shows,
			nom = infos.children[0].children[0].children[0],
			_nom = "",
			_times = {},
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
		  var date = shows.children[j].children[0].textContent,
				time = shows.children[j].children[1].textContent.split(",");
		  
		  for(var k = 0; k<time.length;k++){
			time[k] = time[k].replace(/\s+/g,' ').trim();
		  }
		   
		  _times[date] = time;
		}
		
		if(lang === "bi"){
			var film = {name:_nom, show:_times, lang: "fr"}
		  
			_films.push(film);
			lang = "en";
		}
		
		var film = {name:_nom, show:_times, lang: lang}
		
		_films.push(film);
	  }
	}
	
	cinema.films = _films;
	cinema.adress = _adress
	return cinema;
}

beaubien.liens = ["http://cinemabeaubien.com/fr/alaffiche.aspx", beaubien.js];

module.exports = beaubien;