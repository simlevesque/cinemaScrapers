var odeon = require("./sites/odeon"),
	guzzo = require("./sites/guzzo"),
	indie = require("./sites/indie"),
	allocine = require('allocine-api'),
	omdb = require('omdb'),
	fs = require('fs'),
	results = {guzzo:{},odeon:{}},
	quickResults = function(){
		var quick = {guzzo:{},odeon:{}};
		quick.guzzo = Object.keys(results.guzzo);
		quick.odeon = Object.keys(results.odeon);
		return quick;
	},
	nbScraper = 0
	everyScraper = 2;

odeon.on("update", function(result, nb){
	results.odeon[result.name] = result;
	if(Object.keys(results.odeon).length === nb) scrapingEnd()
});

guzzo.on("update", function(result, nb){
	results.guzzo[result.name] = result;
	if(Object.keys(results.guzzo).length === nb) scrapingEnd()
});

//odeon.start();
guzzo.start();

function scrapingEnd(){
	nbScraper++;
	if(nbScraper === 1){
		fs.writeFile('result.json', JSON.stringify(results), function (err) {
		  if (err) return console.log(err);
		  console.log(results.guzzo["Mega-Plex Deux-Montagnes 14 (IMAX)"].films);
		  console.log('done !');
		  process.exit(0);
		});
	}
}