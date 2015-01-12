var phantom = require("phantom"),
	EventEmitter = require('events').EventEmitter,
	debutAdresse = "http://www.cinemasguzzo.com/", 
	pages = ["1-cinemas-schedules-mega-plex-taschereau-18-imax-", "12-cinemas-schedules-mega-plex-marche-central-18-imax-", "2-cinemas-schedules-mega-plex-pont-viau-16-imax-", "6-cinemas-schedules-mega-plex-lacordaire-16", "3-cinemas-schedules-mega-plex-jacques-cartier-14", "4-cinemas-schedules-mega-plex-spheretech-14", "5-cinemas-schedules-mega-plex-terrebonne-14-imax-", "11-cinemas-schedules-mega-plex-deux-montagnes-14-imax-", "7-cinemas-schedules-cinema-des-sources-imax-", "8-cinemas-schedules-cinema-sainte-therese-8"],
	shifting = pages.slice(0),
	guzzo = new EventEmitter();

guzzo.length = pages.length;
guzzo.start = function(){
	phantom.create(function(ph){
		ph.createPage(function (page) {
			function handleOpen(item){
				var openIt = debutAdresse + item + ".html";
				page.open(openIt, function (status) {
					page.evaluate(function () {

						var _nomDuCinema = document.getElementsByTagName("H1")[0].textContent,
							_adresseDuCinema = document.getElementsByTagName("strong")[0].textContent,
							filmsDom = document.getElementsByClassName("listing"),
							_films = [],
							monthAndDates = getMonthAndDates(),
							_month = monthAndDates[0],
							_days = monthAndDates[1],
								_shows = {en: {},fr: {}},
								_cinema;

							//determine language	
						for(var i = 0;i<filmsDom.length;i++){
							var filmDom = filmsDom[i],
								filmHours = filmDom.children[1].children,
								h2 = filmDom.children[1].children[0].children.length,
								filmInfo = filmDom.children[1].children[0],
								nom = filmInfo.children[0].textContent.replace(/\s+/g,' ').trim(),
								shows = {},
								dates = [],
								times = [],
								lang;

							if(h2 === 3){
								var txt = filmDom.children[1].children[0].children[2].textContent;
									eng = txt.indexOf("eng"),
									fre = txt.indexOf("Fre");
								if(eng !== -1){
									lang = ["en"];
								}
								if(fre !== -1){
									lang = ["fr"];
								}
							} else if (h2 === 1){
								lang = ["en", "fr"];
							}
							
							for(var j = 1;j<filmHours.length;j++){
								if(filmHours[j].tagName === "P" ){
									var typeDom = filmHours[j],
											txt = typeDom.textContent.replace(/\s+/g,' ').trim(),
											date = isNaN(txt.charAt(0));
									if(txt.indexOf("French") === -1){
										if(date) dates.push(txt);
										else times.push(txt);
									} else {
										dates.push("switch");
										times.push("switch");
									}
								}
							}
							
							var curLang = lang[0];
							for(var j = 0;j<dates.length;j++){
								if(lang.length === 2 && dates[j] === "switch"){
										curLang = lang[1];
								}else if(dates[j] === "switch"){
															
								} else {
									var dat = dates[j].split(", ");
										
									var tim = times[j];
								
									for(var k = 0;k<dat.length;k++){
											var realDate = getDate(dat[k]);
										if(realDate !== "everyday") {
											createFilm(nom, curLang, realDate, tim);
										} else {
											var days = ['Friday','Saturday','Sunday','Monday','Tuesday','Wednesday','Thursday'];
											for(var l = 0;l<days.length;l++){
												createFilm(nom, curLang, getDate(days[l]), tim);
											}
										}
									}
								}
							}
							
							var film = {name: nom, langue: lang, shows: shows};

							_films.push(film);
						}

						var _cinema = {name:_nomDuCinema,adress:_adresseDuCinema, shows:_shows};
						return _cinema;

						function getDate(day){
							var days = ['Friday','Saturday','Sunday','Monday','Tuesday','Wednesday','Thursday'];
							for(var i = 0;i < days.length;i++){
								var thatDay = days[i];
								if(day.indexOf(thatDay) !== -1){
									return _days[i] + " " + _month;
								}
							}
							if(day.indexOf("Every") !== -1) return "everyday";
						}

						function getMonthAndDates(){
							//Get _Month
							var raw = document.getElementsByClassName("actif")[1].textContent.replace(/\s+/g,' ').trim(),
								months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
								month;
							
							for(var i = 0;i < months.length;i++){
								if(raw.indexOf(months[i]) !== -1){
									month = months[i];
								}
							}

							var limits = raw.match(/(\d+)/gi),
								diff = limits[1] - limits[0] + 1,
								days = [];
							
							for(var k = 0; k<diff; k++){
								days.push((k + parseInt(limits[0])));
							}

							return [month, days];
						}

						function createFilm(name, lang, date, time){
							var _film = {};
							_film.time = time;
							_film.name = name;
							if(typeof _shows[lang][date] === "undefined"){
								_shows[lang][date] = [];
							}
							_shows[lang][date].push(_film);
						}
					}, function (result) {
						guzzo.emit("update",  result);
						setTimeout(nextOpen,750)
					});
				});
			}

			function nextOpen(){
				var item = shifting.shift();
				if(typeof item === "undefined") {}
				else {handleOpen(item)}
			}
			nextOpen();
		});
	});
}

module.exports = guzzo;