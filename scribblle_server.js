
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

		fs.readFile('./main.html',function(err,file){
		
			if(err){
			
				res.writeHead(500);
				return res.end("Error loading sCRIBBLER");
			
			}
			
			
			res.writeHead(200,{'Context-Type':'text/html'});
			res.write(file);
			res.end();
		
		})
		
		

	}
	
	scribble.on('connection',function(socket){
	
		console.log(scribble.clients().length);	
		
		socket.on("allover",function(){console.log("all Over!")});
		
		socket.on("end",function(){console.log("CLOSED");});
		socket.on("error",function(){console.log("Error");});
		
		socket.on("draw",function(ob){
		
			socket.broadcast.emit("draw_now",ob);
		
		})
		
		//PASS:#KayEs~8.543
	});
	
	scribble.on("error",function(){console.log("Error2");});
	
