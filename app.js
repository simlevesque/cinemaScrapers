var odeon = require("./sites/odeon"),
	guzzo = require("./sites/guzzo"),
	indie = require("./sites/indie"),
	allocine = require('allocine-api'),
	omdb = require('omdb'),
	fs = require('fs'),
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
	everyScraper = 2;

odeon.on("update", function(result){
	results.odeon[result.name] = result;
	if(Object.keys(results.odeon).length === odeon.length) scrapingEnd()
	onUpdate();
});

guzzo.on("update", function(result){
	results.guzzo[result.name] = result;
	if(Object.keys(results.guzzo).length === guzzo.length) scrapingEnd()
	onUpdate();
});

indie.on("update", function(result){
	results.indie[result.name] = result;
	if(Object.keys(results.indie).length === indie.length) scrapingEnd()
	onUpdate();
});

odeon.start();
//guzzo.start();
//indie.start();

function scrapingEnd(){
	nbScraper++;
	if(nbScraper === 1){
		fs.writeFile('result.json', JSON.stringify(results), function (err) {
		  if (err) return console.log(err);
		  console.log("done !");
		  process.exit(0);
		});
	}
}

function onUpdate(){
	console.log(quickResults());
}