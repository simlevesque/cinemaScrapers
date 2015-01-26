process.stdin.setEncoding('utf-8');

process.stdin.on('readable', function(){
	var chunk = process.stdin.read();
	if(chunk !== null){
		process.stdout.write(chunk);
	}
});

process.stdin.on('end', function(){
	process.stdout.write('end');
});
