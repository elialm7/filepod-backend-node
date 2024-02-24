const express = require('express');
const http = require('http');
const socketio = require('socket.io');

const app = express();
const port = 3000;
const server = http.createServer(app);
const io = socketio(server, {
	cors: {
		origin: '*'
	}
});
const socketManager = require('./src/socket/SocketManager.js');
app.use('/download', require('./src/routes/FileAccessRoute.js'));
io.on('connection', socket =>{
	socketManager(socket);
});

server.listen(port, ()=>{
	console.log(`Server running on port ${port}`);
});
