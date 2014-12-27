var phantom = require("phantom"),
	EventEmitter = require('events').EventEmitter,
	pages = [],
	shifting = pages.slice(0),
	indie = new EventEmitter();
	
indie.start = function(){
	phantom.create(function(ph){
		ph.createPage(function (page) {
			function handleOpen(item){
				var openIt = debutAdresse + item[0],
					lang = item[1];
				page.open(openIt, function (status) {
					page.evaluate(function () {
						 
					}, function (result) {
						odeon.emit("update", result, pages.length);
						setTimeout(nextOpen,1000)
					});
			});
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