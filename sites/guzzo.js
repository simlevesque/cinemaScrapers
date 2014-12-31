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
						var _nomDuCinema = document.getElementsByTagName("H1")[0].textContent
							_adresseDuCinema = document.getElementsByTagName("strong")[0].textContent;
							filmsDom = document.getElementsByClassName("listing"),
							_films = [];
							
							//determine language	
						
						for(var i = 0;i<filmsDom.length;i++){
							var filmDom = filmsDom[i],
								h2 = filmDom.children[1].children[0].children.length,
								filmInfo = filmDom.children[1].children[0],
								nom = filmInfo.children[0].textContent.replace(/\s+/g,' ').trim(),
								shows = {},
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
							/*
							for(var j = 1;j<filmHours.children.length;j++){
								var typeDom = filmHours.children[j],
									typeText = typeDom.children[0].children[0].title,
									typeTimes = typeDom.children[1].children[0],
									times = [];
									
								for(var k = 0;k<typeTimes.children.length;k++){
									var timeDom = typeTimes.children[k],
										timeText = timeDom.children[0].innerHTML.replace(/\s+/g,' ').trim();
									
									times.push(timeText);
								}
								
								shows[typeText] = times;
							}
							*/
							var film = {name: nom, langue: lang};
								
							_films.push(film);
						}
						
						var cinema = {name:_nomDuCinema,adress:_adresseDuCinema, films:_films};
						
						return cinema; 
					}, function (result) {
						guzzo.emit("update",  result);
						setTimeout(nextOpen,1000)
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