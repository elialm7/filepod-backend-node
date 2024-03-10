const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const path = require('path');
require('dotenv').config();



const app = express();
app.use(express.static('./public'));
const port = process.env.PORT;
const server = http.createServer(app);
const io = socketio(server, {
	cors: {
		origin: '*'
	},
	maxHttpBufferSize: 50 * 1024 * 1024
});
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));

const socketManager = require('./src/socket/SocketManager.js');
app.use('/file/download', require('./src/routes/FileAccessRoute.js'));
app.use('/file/preview', require('./src/routes/FilePreviewRouter.js'));

io.on('connection', socket => {
	socketManager(socket);
});

server.listen(port, () => {
	console.log(`Server running on port ${port}`);
});

