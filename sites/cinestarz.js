var cinestarz = {};

cinestarz.js1 = function(){
	var films = document.getElementsByClassName("movie-text"),
		_cinema = {},
		_cinemaName = "Cinéstarz Langelier",
		_cinemaAdress = "7305, Boulevard Langelier, Montréal",
    _shows = {fr: {}, en: {}},
 		week = getCinemaWeek();

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
					var theseDates = child.textContent.split(", "),
							fixedDates = [];
					for(var k = 0; k< theseDates.length;k++){
						var fixed = fixDates(theseDates[k]);
						fixedDates.push(fixed);
					}
					dates.push(fixedDates); 
				}
			}
		}
	  
		for(var j = 0;j<dates.length;j++){
			createFilm(filmname, dates[j], times[j]);
		}
	 
	}

	_cinema.shows = _shows;
	_cinema.name = _cinemaName;
	_cinema.adress = _cinemaAdress;

	return _shows.fr;
    //console.log();

	function getCinemaWeek(){
	  var curr = new Date; // get current date
		var week = [];
	  var friday = curr.getDate() - curr.getDay() - 2;
		var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

		var month = months[curr.getMonth()];
		for(var i = 0;i<7;i++){
			week.push(friday + i + " " + month);
		}
	  return week;
	}

	function fixDates(theDate){
		var days = ['Friday','Saturday','Sunday','Monday','Tuesday','Wednesday','Thursday'];
		for(var i = 0;i<days.length;i++){
			if(theDate.indexOf(days[i]) !== -1){
				return week[i];
			}	
		}
		return "n";
	}

	function createFilm(name,date,time){
		var aFilm = {};
		aFilm.name = name;
		aFilm.time = time;
		for(var i = 0;i<date.length;i++){
			var theDate = date[i];
			if(typeof _shows.fr[theDate] !== "object"){
				_shows.fr[theDate] = [];
			}
			if(!!aFilm){_shows.fr[theDate].push(aFilm)}
			
		}
	}
}

cinestarz.js2 = function(){
	var films = document.getElementsByClassName("movie-text"),
		_cinema = {},
		_cinemaName = "Cinéstarz Côte-Des-Neiges",
		_cinemaAdress = "6700, Cote des Neiges #300 AB, Montréal",
    _shows = {fr: {}, en: {}},
 		week = getCinemaWeek();

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
					var theseDates = child.textContent.split(", "),
							fixedDates = [];
					for(var k = 0; k< theseDates.length;k++){
						var fixed = fixDates(theseDates[k]);
						fixedDates.push(fixed);
					}
					dates.push(fixedDates); 
				}
			}
		}
	  
		for(var j = 0;j<dates.length;j++){
			createFilm(filmname, dates[j], times[j]);
		}
	}

	_cinema.shows = _shows;
	_cinema.name = _cinemaName;
	_cinema.adress = _cinemaAdress;

	return _shows.en;
	//console.log(_cinema);

function getCinemaWeek(){
  var curr = new Date; // get current date
	var week = [];
  var friday = curr.getDate() - curr.getDay() - 2;
	var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

	var month = months[curr.getMonth()];
	
	for(var i = 0;i<7;i++){
		week.push(friday + i + " " + month);
	}
  return week;
}

function fixDates(theDate){
	var days = ['Friday','Saturday','Sunday','Monday','Tuesday','Wednesday','Thursday'];
	for(var i = 0;i<days.length;i++){
		if(theDate.indexOf(days[i]) !== -1){
			return week[i];
		}	
	}
	return "n";
}

function createFilm(name,date,time){
	var film = {};
	film.name = name;
	film.time = time;
	for(var i = 0;i<date.length;i++){
		var theDate = date[i];
		if(typeof _shows.en[theDate] !== "object"){
			_shows.en[theDate] = [];
		}
		_shows.en[theDate].push(film);
	}
}
}


cinestarz.liens1 = ["http://cinestarz.ca/now-playing/?thr=lan", cinestarz.js1, "fr"];
cinestarz.liens2 = ["http://cinestarz.ca/now-playing/?thr=cote", cinestarz.js2, "en"];

module.exports = cinestarz;