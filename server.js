let marin = require('./marin.js')


marin.web_server.get("/", function(req, res) {
	res.sendFile(__dirname + "/index.html")
})




marin.socket_server.on('connection', function(socket) {
	   socket.on('message', function(message) {
		  let data = JSON.parse(message)
		  
		  if(data.message) {
		      console.log('received: %s', message)
			 
	    	  marin.socket_server.clients.forEach(function(client) {
	      		client.send(message)
	      	})
	      }
	})
        

    


    //sending count
    var count = 0
	marin.socket_server.clients.forEach(function(client) {
          if(client.readyState === marin.connected)
		count++
	})
        function send_counter() {
	marin.socket_server.clients.forEach(function(client) {
	   client.send(JSON.stringify({count: count}))
	})
        }
        socket.on("close", send_counter)
	send_counter()

})






marin.listen(12000)
