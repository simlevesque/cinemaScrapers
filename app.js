var allocine = require('allocine-api'),
	omdb = require('omdb'),
	fs = require('fs'),
	ProgressBar = require('progress'),
	results = {/*"guzzo":{},"odeon":{},*/"indie":{}},
	scraperz = JSON.parse(JSON.stringify(results)),
	concrete = {en:{},fr:{}},
	quickResults = function(){
		var quick = {}, j = 0; //#quick: return object #j = number of pages
		for(var i = 0;i<Object.keys(results).length;i++){
			var thisOne = Object.keys(results)[i];
			
			//Increment the total number of pages
			j = j + scraperz[thisOne].length;
			quick[thisOne] = Object.keys(results[thisOne]).length + "/" + scraperz[thisOne].length;
		}
		quick.length = j;
		return quick;
	},
	scrapingProgress = 0;
	everyScraperType = Object.keys(results).length,
	errors = 0;
	
init();

function scraperEnd(){
	scrapingProgress++;
	if(scrapingProgress === everyScraperType){
		fs.writeFile('result.json', JSON.stringify(results), function (err) {
			if(errors !== 0){
				console.log("WARNING : There were " + errors + " errors during the scraping process");
			}
			if (err) return console.log(err);
			main();
		});
	}
}

function onUpdate(){
	//console.log(quickResults());
}

function main(){
	console.log("CinémaScrapers Init Done");
	var filmsAujourshui = today();
	console.log(filmsAujourshui);
	process.exit(0);
}

function init(){
	console.log("CinémaScrapers Init Start");
	
	//Loading scrapers
	for(var i = 0;i<Object.keys(scraperz).length;i++){
		var thisOne = Object.keys(scraperz)[i];
		scraperz[thisOne] = require("./sites/"+thisOne);
		scraperz[thisOne].start();
	}
	
	var bar = new ProgressBar('Mise à jour des données en cours [:bar\x1b[0m] :percent | il reste environ :eta secondes', { complete: '\x1b[32m|', incomplete: ' ', width: 60, total: quickResults().length+1});
	bar.tick();
	
	// Setting update triggers
	for(var i = 0;i<Object.keys(scraperz).length;i++){
		var thisOne = Object.keys(scraperz)[i];
		updateTrigger(thisOne, bar);
	}
}

function today(){
	var scrapers = Object.keys(results),
		content = {fr:[], en:[]},
		films = [],
		todayDate = new Date();
		
	todayDate = todayDate.getDate();
	
	for(var i = 0;i<scrapers.length;i++){
		var pages = results[scrapers[i]],
			array = Object.keys(pages);
		
		for(var j = 0;j<array.length;j++){
			var page = results[scrapers[i]][array[j]];
			if(page !== "error"){
				frenchDates = page.shows.fr,
				datesKeys = Object.keys(frenchDates);
					
				for(var k = 0;k<datesKeys.length;k++){
					if(datesKeys[k].indexOf(todayDate) !== -1){
						var dayShows = frenchDates[datesKeys[k]];
						
						if(dayShows !== []){
							for(var l = 0;l<dayShows.length;l++){
								films.push(dayShows[l].name.toProperCase());
							}
						}
					}
				}
			}
		}
	}
	
	var uniq = uniq_fast(films);
	
	return uniq
}

function uniq_fast(a) {
    var seen = {},
		out = [],
		len = a.length,
		j = 0;
		
    for(var i = 0; i < len; i++) {
         var item = a[i];
		 
         if(seen[item] !== 1) {
               seen[item] = 1;
               out[j++] = item;
         }
    }
    return out;
}

String.prototype.toProperCase = function () {
    return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};

function addResult(scraper, name, content) {
	if(typeof results[scraper] !== "object") results[scraper] = {};
	results[scraper][name] = content;
}

function updateTrigger(thisScraper, bar) {
	scraperz[thisScraper].on("update", function(result){
		addResult(result.scraper, result.name, result);
		if(Object.keys(results[result.scraper]).length === scraperz[thisScraper].length) scraperEnd();
		onUpdate();
		bar.tick();
	});	
	scraperz[thisScraper].on("error", function(which){
		errors++;
		addResult(thisScraper, which, "error");
		if(Object.keys(results[thisScraper]).length === scraperz[thisScraper].length) scraperEnd();
		onUpdate();
		bar.tick();
	});	
}
