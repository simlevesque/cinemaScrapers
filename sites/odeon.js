var phantom = require("phantom"),
	debutAdresse = "http://www.cineplex.com/Showtimes/any-movie/", 
	pages = ["cinema-cineplex-odeon-quartier-latin", "cinema-banque-scotia-montreal", "cinema-cineplex-forum", "cinema-starcite-montreal", "cinema-famous-players-carrefour-angrignon", "cinema-cineplex-odeon-cavendish-mall", "cinema-cineplex-odeon-boucherville", "cinema-cineplex-odeon-place-la-salle", "cinema-cineplex-odeon-brossard-et-cinema-vip", "cinema-cineplex-odeon-stbruno", "cinema-cineplex-odeon-delson", "cinema-colossus-laval"],
	shifting = pages;
	
phantom.create(function(ph){
	ph.createPage(function (page) {
		function handleOpen(item){
			var openIt = debutAdresse + item;
			page.open(openIt, function (status) {
				page.evaluate(function () {
					var _nomDuCinema = document.getElementsByClassName("theatre-text")[0].textContent.replace(/\s+/g,' ').trim(),
						_adresseDuCinema = document.getElementsByClassName("theatre-address")[0].textContent.replace(/\s+/g,' ').trim();
						filmsDom = document.getElementsByClassName("showtime-card"),
						_films = [];

					for(var i = 0;i<filmsDom.length;i++){
						var filmDom = filmsDom[i],
							filmInfo = filmDom.children[0].children[1],
							filmHours = filmDom.children[1],
							nom = filmInfo.children[0].children[0],
							heuresDom = parseInt(filmInfo.children[0].children[1].textContent.split("h")[0].replace(/\D/g,'')),
							minutesDom = parseInt(filmInfo.children[0].children[1].textContent.split("h")[0].replace(/\D/g,'')),
							temps = ( ( heuresDom * 60 ) + minutesDom ),
							rating = filmInfo.children[1].children[0].children[0].href.split("=")[1],
							film = {time: temps, rate:rating, name: nom}
							
						_films.push(film);
						
					}
					
					var cinema = {name:_nomDuCinema,adress:_adresseDuCinema, films:_films};
					
					return cinema; 
				}, function (result) {
					console.log('Page title is ', result);
					setTimeout(nextOpen,100)
				});
			});
		}

		function nextOpen(){
			var item = pages.shift();
			if(!item) ph.exit();
			handleOpen(item)
		}
		nextOpen();
	});
});

