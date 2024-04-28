
const getLogger = require("../logs/WinstonLog");
const createPin = require("../usecase/shared/PinGenerator");
const UserFile = require("../domain/UserFile");
const createHash = require("../usecase/shared/HashGenerator");
const log = getLogger();
class ClientEventdispatcher {

    constructor(socket, uploadusecase){
        this.socket = socket;
        this.uploadusecase = uploadusecase;
        this.onUploadPrototype = this.onUploadPrototype.bind(this);
        this.onUploadfile = this.onUploadfile.bind(this);

    }
    init(){
        this.onUpload();
    }
    onUpload(){
        log.info('Registering events for the clients.');
        this.socket.on('upload', this.onUploadPrototype);
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
        log.info('Executing the use case for the client frontend');
        const userfile  = this.parsedata(input.downloads, input.filename, input.filedata, input.filesize);
        const uid = userfile.uid;
        const pin = userfile.pin; 
        this.uploadusecase.executeCase(userfile);
        this.socket.emit('archivo-recibido',{uid, pin});
    }
}
const RegisterClientEvents = (socket, uploadusecase) =>{
    if(!socket){
        log.error('The socket connectionis undefined, aborting process.');
        return;
    }
    const clientdispatcher = new ClientEventdispatcher(socket, uploadusecase);
    return clientdispatcher;
};

module.exports = {RegisterClientEvents};