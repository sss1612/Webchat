var WebSocket = require("ws") 
    WebSocketServer = WebSocket.Server,
    express = require("express"),
    http = require("http"),
    app = express(),
    server = http.createServer(app)

let wss = new WebSocketServer({server: server})

function listen(port) {
  server.listen(port, () => console.log('\x1b[32m%s\x1b[0m', 'Server Started'))
}


module.exports = {
	listen: listen,
	socket_server: wss,
	web_server: app,
        connected: WebSocket.OPEN
}
