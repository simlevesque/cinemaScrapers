var phantom = require("phantom"),
	beaubien = require("./beaubien.js"),
	imaxtelus = require("./imaxtelus.js"),
	cinestarz = require("./cinestarz.js"),
	duparc = require("./duparc.js"),
	EventEmitter = require('events').EventEmitter,
	pages = [],
	
	indie = new EventEmitter();
	indie.name = "indie";
	
	pages.push(beaubien.liens);
	pages.push(imaxtelus.liens);
	pages.push(cinestarz.liens1);
	pages.push(cinestarz.liens2);
	pages.push(duparc.liens);
	
	shifting = pages.slice(0);
	indie.length = pages.length;
indie.start = function(){
	phantom.create(function(ph){
		ph.createPage(function (page) {
			function handleOpen(item){
				page.open(item[0], function (status) {
					page.evaluate(item[1], function (result) {
						indie.emit("update",  result);
						setTimeout(nextOpen,1000);
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