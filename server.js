process.env.NODE_ENV ==process.env.NODE_ENV || 'development';
console.log(process.env.NODE_ENV);

var express = require('./config/express');
var app = express();
var http = require('http');
var server = http.createServer(app);
var serviceport = 80;
app.set('port',serviceport);
server.listen(serviceport);

console.log('Server running at http://0.0.0.0:%d',serviceport);

var WebSocketServer = require('ws').Server
	,wss = new WebSocketServer({server: server});
wss.on('connection', function connection(ws){
	ws.on('message',function incomming(message){
		//console.log('received: %s', message);
		wss.broadcast(message);
	})
	console.log('Connected!');
});
wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    client.send(data);
  });
};

console.log('WS Server running at wss://0.0.0.0:%d',serviceport);