const express = require('express');
const http = require('http');
const socketio = require('socket.io');
require('dotenv').config();

const app = express();
const port = process.env.PORT;
const server = http.createServer(app);
const io = socketio(server, {
	cors: {
		origin: '*'
	},
	maxHttpBufferSize: 50 * 1024 * 1024
});
const socketManager = require('./src/socket/SocketManager.js');
app.use('/download', require('./src/routes/FileAccessRoute.js'));
io.on('connection', socket => {
	socketManager(socket);
});

server.listen(port, () => {
	console.log(`Server running on port ${port}`);
});

