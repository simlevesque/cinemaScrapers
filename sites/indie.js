var phantom = require("phantom"),
	beaubien = require("./beaubien.js"),
	imaxtelus = require("./imaxtelus.js"),
	EventEmitter = require('events').EventEmitter,
	pages = [],
	
	indie = new EventEmitter();
	
	pages.push(beaubien.liens);
	pages.push(imaxtelus.liens);
	
	shifting = pages.slice(0);
	indie.length = pages.length;
indie.start = function(){
	phantom.create(function(ph){
		ph.createPage(function (page) {
			function handleOpen(item){
				page.open(item[0], function (status) {
					page.evaluate(item[1], function (result) {
						indie.emit("update",  result);
						setTimeout(nextOpen,1000)
					});
				});
			}
			
			function nextOpen(){
				var item = shifting.shift();
				
				if(typeof item === "undefined") {}
				else handleOpen(item)
			}
			nextOpen();
		});
	});
}

module.exports = indie;