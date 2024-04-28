
const getLogger = require("../logs/WinstonLog");
const createPin = require("../usecase/shared/PinGenerator");
const UserFile = require("../domain/UserFile");
const createHash = require("../usecase/shared/HashGenerator");
const log = getLogger();
class ClientEventdispatcher {

    constructor(socket, uploadusecase){
        this.socket = socket;
        this.uploadusecase = uploadusecase;
        this.onUploadfile = this.onUploadfile.bind(this);

    }
    init(){
        this.onUpload();
    }
    onUpload(){
        log.info(`Registering events for client with id ${this.socket.id}`);
        this.socket.on('enviar-archivo', this.onUploadfile);
    }

    parsedata(dwtimes, filename, filedata, filesize){
        log.info('Parsing the data from the production client.');
        const uid = createHash();
        const pin = createPin();
        const timestamp = Date.now();
        return new UserFile.builder().withfilename(filename).withdwtimes(dwtimes).
                   withfiledata(filedata).withfilesize(filesize).withuid(uid).withpin(pin)
                   .withtimestamp(timestamp).build();
    }
    onUploadfile(input){
        log.info('Executing the use case for the client');
        const userfile  = this.parsedata(input.downloads, input.filename, input.filedata, input.filesize);
        const uid = userfile.uid;
        const pin = userfile.pin; 
        this.uploadusecase.executeCase(userfile);
        this.socket.emit('archivo-recibido',{uid, pin});
    }
}
const RegisterClientEvents = (socket, uploadusecase) =>{
    if(!socket){
        log.error('The socket connection is undefined, aborting process.');
        return;
    }
    const clientdispatcher = new ClientEventdispatcher(socket, uploadusecase);
    clientdispatcher.init();
};

module.exports = {RegisterClientEvents};