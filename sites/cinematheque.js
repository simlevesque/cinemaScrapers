var times = document.getElementsByClassName("time"),
    noms = document.getElementsByClassName("progItem-infos"),
		metas = document.getElementsByClassName("metadatas"),
    _cinema = {},
    _films = [],
    _nomCinema = "Cinémathèque québecoise",
	_cinemaAddress = "335, boul. De Maisonneuve Est, Montréal";
var nomsArray = [];

for(var iNom = 0, iTimes = 0;iNom<noms.length;iNom++){
	var name = noms[iNom].children[0].children[0].children[0].textContent;
	
	if (noms[iNom].children.length === 1) {
		nomsArray.push(name);
	}
	else {
		if(nomsArray.length !== 0){
			var _film = {};
			
			name = nomsArray.join();
			_film.name = name;
			while(_film.name.charAt(0) === ' '){
    		_film.name = _film.name.substr(1);
			}
			_film.time = times[iTimes].textContent;
			_film.lang = "bi";
			_films.push(_film);
			iTimes++;
			nomsArray = [];
		}
		
		var _film = {};
		_film.name = noms[iNom].children[0].children[0].children[0].textContent;
		_film.lang = "?";
		var tmp = noms[iNom].children[0].children[1].textContent.split("[")[1].split("]")[0];
		if(tmp.indexOf("VF") !== -1 || tmp.indexOf("VOF") !== -1){
			_film.lang = "fr";
			
		}
		if(tmp.indexOf("VOA") !== -1){
			_film.lang = "en";
			
		}
		while(_film.name.charAt(0) === ' '){
    		_film.name = _film.name.substr(1);
			}
		_film.time = times[iTimes].textContent;
		_films.push(_film);
		iTimes++;
	}
}

_cinema.films = _films;
_cinema.name = _nomCinema;
_cinema.address = _cinemaAddress;
console.log(_cinema);
/*
Exception: missing ) after argument list
@Scratchpad/2:35
*/
/*
Exception: noms[iNom].children[0].children[1].children[0] is undefined
@Scratchpad/2:34:3
*/
/*
Exception: times[iTimes] is undefined
@Scratchpad/2:47:3
*/
/*
Exception: times[iTimes] is undefined
@Scratchpad/2:47:3
*/