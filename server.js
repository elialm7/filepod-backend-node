const express = require('express');
const http = require('http');
const socketio = require('socket.io');
require('dotenv').config();
require('log-timestamp');

const app = express();
const port = process.env.PORT;
const server = http.createServer(app);
const io = socketio(server, {
	cors: {
		origin: '*'
	}
});
const socketManager = require('./src/socket/SocketHandler.js');
app.use('/download', require('./src/routes/FileAccessRoute.js'));
io.on('connection', socket => {
	console.log(`User ID connected: ${socket.id}`);
	socketManager(socket);
});

server.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
