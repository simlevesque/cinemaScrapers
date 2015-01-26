var legitArgs = ['help', 'test', 'tools'];

var arguments = function(){
	var currentArgv = process.argv.slice(2),
	args = {};
	
	currentArgv.forEach(function(val,index,array){
		var type;
		if(val.indexOf('--') === 0){
			val = val.slice(2);
			type = 2;
		} else {
			if(val.indexOf('-') === 0){
				val = val.slice(1);
				type = 1;
			} else {
				type = 0;
			}
		}
		if(type !== 0){
			var splat = val.split('=');
			if(splat.length === 2){
				index = idArgs(splat[0]);
				val = splat[1];
			}
		}

		args[index] = val;
	});

	return args;
}

var idArgs = function(val){
	var arg;
	
	legitArgs.forEach(function(value,index,array){
		if(value.indexOf(val) !== -1){
			if(typeof arg !== 'undefined'){
				arg = 'error';
			} else {
				arg = value;			
			}
		}
	});
	
	if(typeof arg === 'undefined'){
		arg = 'error'
	}

	return arg;
}

console.log(arguments());
