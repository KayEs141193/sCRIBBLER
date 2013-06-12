
	//SCRIBBLER 

	var http = require('http').createServer(handler); //http server
	var io = require('socket.io').listen(http); //socket
	var fs = require('fs'); //reading page to serve
	var scribble = io.of('/scribble');
	
	io.set('browser client minification', true);  // send minified client
	io.set('browser client etag', true);          // apply etag caching logic based on version number
	
	http.listen(9000);
	
	//SERVING PAGE INITIALLY
			
	function handler(req,res){

		fs.readFile('/COMPUSTUFF/sCRIBBLER/main.html',function(err,file){
		
			if(err){
			
				res.writeHead(500);
				return res.end("Error loading sCRIBBLER");
			
			}
			
			
			res.writeHead(200,{'Context-Type':'text/html'});
			res.write(file);
		
		})
		
		

	}
	/*
	scribble.on('connection',function(socket){
	
		console.log(scribble.clients());	
	
	})
	*/