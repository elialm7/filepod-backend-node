//imports for the express server and socket.io configuration.
const  http = require('http');
const socketio = require('socket.io');
const path = require('path');
const express = require('express');
require('dotenv').config();


// imports of the other layers
const UserFileMongoRepository = require('../database/UserFileMongoRepository');
const connectMongoose = require('../database/MongooseConnection');
const getLogger = require('../logs/WinstonLog');
/*
const FileDownloadController = require('../../adapters/Controllers/FileDownloadController');
const FilePreviewController = require('../../adapters/Controllers/FilePreviewController');

let downloadController = new FileDownloadController();
let previewController = new FilePreviewController();*/

//constants defintion
const PORT = process.env.PORT;
const DATABASE_URL = process.env.DBURL;
const PUBLIC = './public';
const templateRender = 'ejs';

//logger
const log = getLogger();


// implementation of the server and socket.io
const app = express();
app.use(express.static(PUBLIC));
const server = http.createServer(app);
const io = socketio(server, {
    cors: {
        origin: '*'
    },
    maxHttpBufferSize: 50*1024*1024
});
app.set('view engine', templateRender);
app.set('views', path.join(__dirname, 'infra/Presenters'));


/*app.get('/file/download/:id',downloadController.download.bind(downloadController));
app.get('/file/preview/:id', previewController.preview.bind(previewController));
*/

io.on('connection', socket => {
    log.info('Connection succesfully');
	socket.on('upload',(formdata)=>{
        console.log(formdata);
        socket.emit('success', "subido...");
    });
});

server.listen(PORT, ()=>{
    //connectMongoose(DATABASE_URL);
    log.info(`Server running on port ${PORT}`);
})









