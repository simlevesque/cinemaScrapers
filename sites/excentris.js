var excentris = {};

excentris.js = function() {
	var films = document.getElementsByClassName("thumb"),
		_films = [],
		_cinemaName = "Cinéma Excentris",
		_cinemaAdress = "3536, boulevard St-Laurent, Montréal",
		_cinema = {},
		_shows = {"fr": {}, "en": {}};
		
	for(var i = 0;i<films.length;i++){
	  var film = films[i].children[1],
		  _film = {},
		  times = {},
		  time = film.children[1],
		  _name = film.children[0].textContent;
	  
	  if(time.childNodes.length === 1){
		   createFilm(stringToDate(time.textContent), _name);
	  } else {
		for(var j = 0;j<time.childNodes.length/2;j++){
			var cur = time.childNodes[j*2].textContent;
			
			createFilm(stringToDate(cur), _name);
		}
	  }
	  
	}

	_cinema.shows = _shows;
	_cinema.name = _cinemaName;
	_cinema.adress = _cinemaAdress;
	_cinema.scraper = "indie";

	//console.log(_cinema);
	return _cinema;

	function stringToDate(string){
	  var splittedString = string.split(":"),
		  dates = splittedString[0],
		  times = splittedString[1],
		  result = {},
		  splitted = "",
		  digits = [],
		  _dates = [],
		  _times = times.split(", "),
		  splittedDates = dates.split(" "),
		  month = splittedDates[splittedDates.length-1].replace(/\s+/g,' ').trim();
	  
	  if(dates.indexOf("au") !== -1){
		digits = dates.match(/(\d+)/gi);
		var diff = digits[1] - digits[0] + 1;
		for(var i = 0;i<diff;i++){
		 _dates.push((parseInt(digits[0]) + i) + " " + month);
		}
	  } else if(dates.indexOf("et") !== -1){
		digits = dates.match(/(\d+)/gi);
		_dates[0] = digits[0] + " " + month;
		_dates[1] = digits[1] + " " + month;
	  } else {
	   _dates.push(dates);
	  }
	  
	  result.dates = _dates;
	  result.times = _times;
	  return result;
	}

	function createFilm(datesTimes, name){
		var dates = datesTimes.dates,
			times = datesTimes.times;

		for(var i = 0;i<dates.length;i++){
			if(typeof _shows["fr"][dates[i]] !== "object"){
			  _shows["fr"][dates[i]] = [];
			  
			}
			_shows["fr"][dates[i]].push({times: times, name: name});
		}
	}
}

excentris.liens = ["http://cinemaexcentris.com/a-l-affiche", excentris.js, "fr"];

module.exports = excentris;