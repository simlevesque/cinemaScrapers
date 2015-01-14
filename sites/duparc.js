var duparc = {};

duparc.js = function(){
	var films = document.getElementsByTagName("TBODY")[1].children[1].children[0].children[0].children,
			_horaire = {},
			_cinema = {},
			_cinemaName = "Cinéma du Parc",
			_cinemaAdress = "3575, avenue du Parc, Montréal";
	_cinema.name = _cinemaName;
	_cinema.adress = _cinemaAdress;
	_cinema.shows = _horaire;
	_cinema.scraper = "indie";
	_horaire["en"] = {};
	_horaire["fr"] = {};

	for(var i = 0; i<films.length;i++){
		if(films[i].tagName === "TABLE" && films[i].bgColor !== "#000000"){
			var film = films[i],
				name = film.children[0].children[0].children[0].children[0].children[0].children[0].children[1].children[0].children[0].textContent.replace(/\s+/g,' ').trim(),
				lang = film.children[0].children[0].children[0].children[0].children[0].children[0].children[1].children[0].children[2].textContent,
				_film = {},
				dates = film.children[0].children[0].children[0].children[0].children[0].children[0].children[1].children[0].children[3].childNodes,
				_times = [],
				_dates = [];
				
			for(var j = 0;j<dates.length;j++){
				var node = dates[j].textContent.replace(/\s+/g,' ').trim();
				if(dates[j].nodeName = "#text" && node !== "" && (typeof dates[j].children === "undefined" || dates[j].children.length === 0)){					
					if(isNaN(parseInt(node.charAt()))){
						_dates.push(node);
					} else {
						_times.push(node);
					}
				}
			}
			for(var j = 0;j<_dates.length;j++){
				var date = _dates[j],
					time = _times[j];
				if(date.indexOf("Tous les jours") !== -1){
					var matches = date.match(/(\d+) au (\d+)/),
						diff = matches[2] - matches[1] + 1,
						month = getMonth(date);
					
					for(var k = 0;k<diff;k++){
						date = String(k + parseInt(matches[1]))  + month;
						setLang(name, lang, time, date);
					}
				}
				else {
					var matches = date.match(/(\d+)/gi);
					for(var k = 0;k<matches.length;k++){
						var month = getMonth(date),
								date = matches[k] + month;
						setLang(name, lang, time, date);
						
					}
				}
			}
		}
	}

	function createFilm(name, lang, time, date){
		var _film = {};
		_film.time = time;
		_film.name = name;
		if(typeof _horaire[lang][date] === "undefined"){
			_horaire[lang][date] = [];
		}
		_horaire[lang][date].push(_film);
	}

	function setLang(name, lang, time, date){
		if(lang.indexOf("inter") !== -1) {
			lang = "en";
			createFilm(name, lang, time, date);
			lang = "fr";
		}
		else if(lang.indexOf("fran") !== -1) {
			if(lang.indexOf("angl") !== -1){
				lang = "en";
				createFilm(name, lang, time, date);
			}
			lang = "fr";
		}
		else if(lang.indexOf("angl") !== -1) lang = "en";
		createFilm(name, lang, time, date);
	}

	function getMonth(date){
		var mois = [" janvier"," février"," mars"," avril"," mai"," juin"," juillet"," août"," septembre"," octobre"," novembre"," décembre"],
				i = 0;
		for(var i = 0;i<mois.length;i++){
			if(date.indexOf(mois[i]) !== -1) return mois[i]
		}
		
	}

	return _cinema;
}


duparc.liens = ["http://www.cinemaduparc.com/affiche.php", duparc.js];

module.exports = duparc;