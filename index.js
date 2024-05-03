const  http = require('http');
const socketio = require('socket.io');
const path = require('path');
const express = require('express');
require('dotenv').config();

const {connectMongoose, disconnectMongoose} = require('./database/MongooseConnection');
const getLogger = require('./logs/WinstonLog');
const UploadFileUseCase = require('./usecase/ForSocket/FileUploadUseCase');
const { RegisterClientEvents } = require('./socket/EventDispatcher'); 
const UserFileMongoRepository = require('./database/UserFileMongoRepository');
const FileDownloadController = require('./Controllers/FileDownloadController');
const FilePreviewController = require('./Controllers/FilePreviewController');
const FileDownloadUseCase = require('./usecase/ForApi/FileDownloadUseCase');
const FilepreviewUseCase = require('./usecase/ForApi/FilePreviewUseCase');
const { EventEmitter } = require('stream');
let eventEmitter = new EventEmitter();
let userrepo = new UserFileMongoRepository(eventEmitter);
let downloadController = new FileDownloadController(new FileDownloadUseCase(userrepo,eventEmitter), eventEmitter);
let previewController = new FilePreviewController(new FilepreviewUseCase(userrepo,eventEmitter), eventEmitter);


const PORT = process.env.PORT;
const DATABASE_URL = process.env.DB;
const PUBLIC = './public';
const templateRender = 'ejs';
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
app.set('views', path.join(__dirname, 'views'));


app.get('/file/download/:id',downloadController.download.bind(downloadController));
app.get('/file/preview/:id', previewController.preview.bind(previewController));


io.on('connection', socket => {
    log.info(`User ${socket.id} connected.`);
    socket.on('disconnect', ()=>{
        log.info(`User ${socket.id} disconnected`);
    });
    RegisterClientEvents(socket, new UploadFileUseCase(userrepo),eventEmitter);
});
server.listen(PORT, ()=>{
    connectMongoose(DATABASE_URL);
    log.info(`Server running on port ${PORT}`);
});









