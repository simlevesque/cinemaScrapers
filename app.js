var odeon = require("./sites/odeon"),
	guzzo = require("./sites/guzzo"),
	indie = require("./sites/indie"),
	allocine = require('allocine-api'),
	omdb = require('omdb'),
	fs = require('fs'),
	ProgressBar = require('progress'),
	results = {guzzo:{},odeon:{},indie:{}},
	concrete = {en:{},fr:{}};
	quickResults = function(){
	var quick = {};
		quick.guzzo = Object.keys(results.guzzo).length + "/" + guzzo.length;
		quick.odeon = Object.keys(results.odeon).length + "/" + odeon.length;
		quick.indie = Object.keys(results.indie).length + "/" + indie.length;
		quick.length = odeon.length + guzzo.length + indie.length;
		return quick;
	},
	nbScraper = 0
	everyScraperType = 1;
	
console.log("CinémaScrapers 2015 et +");
init();


function scraperEnd(){
	nbScraper++;
	if(nbScraper === everyScraperType){
		fs.writeFile('result.json', JSON.stringify(results), function (err) {
		  if (err) return console.log(err);
		  //main();
		});
	}
}

function onUpdate(){
	//console.log(quickResults());
}


function main(){
	console.log("done !");
	var filmsAujourshui = today();
	console.log(filmsAujourshui);
	process.exit(0);
}

function init(){
	odeon.on("update", function(result){
		results.odeon[result.name] = result;
		if(Object.keys(results.odeon).length === odeon.length) scraperEnd()
		onUpdate();
		bar.tick();
	});

	guzzo.on("update", function(result){
		results.guzzo[result.name] = result;
		if(Object.keys(results.guzzo).length === guzzo.length) scraperEnd()
		onUpdate();
		bar.tick();
	});

	indie.on("update", function(result){
		results.indie[result.name] = result;
		if(Object.keys(results.indie).length === indie.length) scraperEnd()
		onUpdate();
		bar.tick();
	});

	//odeon.start();
	//guzzo.start();
	indie.start();
	
	var bar = new ProgressBar('Mise à jour des données en cours [:bar\x1b[0m] :percent :eta', { complete: '\x1b[32m|', incomplete: ' ', width: 60, total: /*quickResults().length*/5+1});
	bar.tick();
}

function today(){
	var scrapers = Object.keys(results),
		content = {fr:[], en:[]};
	
	for(var i = 0;i<scrapers.length;i++){
		var pages = results[scrapers[i]],
		array = Object.keys(pages);
		for(var j = 0;j<array.length;j++){
			var pages = results[scrapers[i]][array[j]];
			console.log(pages.shows.fr)
			
		}
	}
	
	
	return "pas encore"
}