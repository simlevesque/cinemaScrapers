var phantom = require("phantom"),
	guessLanguage = require('guesslanguage').guessLanguage,
	EventEmitter = require('events').EventEmitter,
	debutAdresse = "http://www.cineplex.com/Showtimes/any-movie/", 
	pages = [["cinema-cineplex-odeon-quartier-latin", "fr"], ["cinema-banque-scotia-montreal", "en"], ["cinema-cineplex-forum",  "en"], ["cinema-starcite-montreal", "fr"], [ "cinema-famous-players-carrefour-angrignon",  "fr"], ["cinema-cineplex-odeon-cavendish-mall", "en"], ["cinema-cineplex-odeon-boucherville",  "fr"], ["cinema-cineplex-odeon-place-la-salle", "bi"], [ "cinema-cineplex-odeon-brossard-et-cinema-vip", "bi"], [ "cinema-cineplex-odeon-stbruno", "fr"], [ "cinema-cineplex-odeon-delson", "fr"], [ "cinema-colossus-laval", "bi"]],
	shifting = pages.slice(0),
	odeon = new EventEmitter();
	
	odeon.length = pages.length;
odeon.start = function(){
	phantom.create(function(ph){
		ph.createPage(function (page) {
			function handleOpen(item){
				var openIt = debutAdresse + item[0],
					lang = item[1];
				page.open(openIt, function (status) {
					page.evaluate(function () {
						var _nomDuCinema = document.getElementsByClassName("theatre-text")[0].textContent.replace(/\s+/g,' ').trim(),
							  _adresseDuCinema = document.getElementsByClassName("theatre-address")[0].textContent.replace(/\s+/g,' ').trim();
							  filmsDom = document.getElementsByClassName("showtime-card"),
						  	_films = [],
								_shows = {},
								currentDate = document.getElementsByClassName("ticket-date")[0].textContent + " " + document.getElementsByClassName("ticket-month")[0].textContent;
						
						_shows[currentDate] = [];
						
						for(var i = 0;i<filmsDom.length;i++){
							var filmDom = filmsDom[i],
							  	filmInfo = filmDom.children[0].children[1],
							  	filmHours = filmDom.children[1].children[0],
							  	nom = filmInfo.children[0].children[0].textContent.replace(/\s+/g,' ').trim(),
							  	shows = [];
							
							for(var j = 1;j<filmHours.children.length;j++){
								var typeDom = filmHours.children[j],
								  	typeText = typeDom.children[0].children[0].title,
								  	typeTimes = typeDom.children[1].children[0];
									
								for(var k = 0;k<typeTimes.children.length;k++){
									var timeDom = typeTimes.children[k],
								  		timeText = timeDom.children[0].innerHTML.replace(/\s+/g,' ').trim() + " ( " + typeText + " )";

									shows.push(timeText);
								}
							}
							var film = {name: nom, time: shows};
								
							_shows[currentDate].push(film);
						}
						
						var cinema = {name:_nomDuCinema,adress:_adresseDuCinema, shows:_shows};
						
						return cinema;
					}, function (result) {
						
						var today = Object.keys(result.shows)[0],
							todayShows = result.shows[today],
							_showz = {en:{},fr:{}};
							
						_showz.en[today] = [];
						_showz.fr[today] = [];
						
						for(var i = 0, j = 0;i<todayShows.length;i++){
							var leShow = todayShows[i];
							
							if(lang === "bi"){
								detectLang(leShow.name, function(cinema, movie, language){
									if(language === "fr") _showz.fr[today].push(leShow)
									else _showz.en[today].push(leShow)
									j++;
									if(j===todayShows.length) onEnd(result, _showz)
								});
							} else {
								if(lang === "fr"){
									if(verifyFrench(leShow.name) === "fr") _showz.fr[today].push(leShow)
									else _showz.en[today].push(leShow)
								}
								if(lang === "en"){
									if(verifyEnglish(leShow.name) === "fr") _showz.fr[today].push(leShow)
									else _showz.en[today].push(leShow)
								}
								j++;
								if(j===todayShows.length) onEnd(result, _showz)
							}
							
							
						}
					});
			});
			}
			
			function onEnd(result, _showz){
				delete result.shows;
				result.shows = _showz;
				odeon.emit("update",  result);
				setTimeout(nextOpen,1000);
			}
			
			function nextOpen(){
				var item = shifting.shift();
				if(typeof item === "undefined") {}
					//ph.exit();
				else {handleOpen(item)}
			}
			nextOpen();
		});
	});

}



function verifyFrench(mov){
	var language = "fr";
	
	if(mov.indexOf("the ") !== -1)language = "en"
	return language;
}

function verifyEnglish(mov){
	var language = "en";
	return language;
}



function detectLang(movie, callback){
	guessLanguage.detect(movie, function(language) {
		if(language !== "fr" && language !== "en") {
			//this needs some work
			if(movie.indexOf("é") !== -1)language = "fr"
			else if(movie.indexOf("è") !== -1)language = "fr"
			else if(movie.indexOf("à") !== -1)language = "fr"
			else if(movie.indexOf("ù") !== -1)language = "fr"
			else if(movie.indexOf("ç") !== -1)language = "fr"
			else if(movie.indexOf("é") !== -1)language = "fr"
			else if(movie.indexOf("les ") !== -1)language = "fr"
				
			else if(movie.indexOf("and") !== -1)language = "en"
			else if(movie.indexOf("girl") !== -1)language = "en"
			else if(movie.indexOf("boy") !== -1)language = "en"
			else if(movie.indexOf("big ") !== -1)language = "en"
			else if(movie.indexOf("bosses ") !== -1)language = "en"
			else if(movie.indexOf("one ") !== -1)language = "en"
			else if(movie.indexOf("two ") !== -1)language = "en"
			else if(movie.indexOf("three ") !== -1)language = "en"
			else if(movie.indexOf("four ") !== -1)language = "en"
			else if(movie.indexOf("five ") !== -1)language = "en"
			else if(movie.indexOf("six ") !== -1)language = "en"
			else if(movie.indexOf("seven ") !== -1)language = "en"
			else if(movie.indexOf("eight ") !== -1)language = "en"
			else if(movie.indexOf("nine ") !== -1)language = "en"
			else if(movie.indexOf("ten ") !== -1)language = "en"
			else if(movie.indexOf("the ") !== -1)language = "en"
			if(language !== "fr" && language !== "en") {
				language = "en"
			}
		}
		callback(movie, language);
	});
}

module.exports = odeon;