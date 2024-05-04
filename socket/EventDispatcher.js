
const getLogger = require("../logs/wlog");
const createPin = require("../usecase/shared/PinGenerator");
const UserFile = require("../domain/UserFile");
const createHash = require("../usecase/shared/HashGenerator");
const log = getLogger();
class ClientEventdispatcher {

    constructor(socket, uploadusecase, event){
        this.socket = socket;
        this.uploadusecase = uploadusecase;
        this.event = event;

        this.handleBrowserClient = this.handleBrowserClient.bind(this);
        this.handleTerminalClient = this.handleTerminalClient.bind(this);
        this.parseInput = this.parseInput.bind(this);
        this.onUploadFileRequest = this.onUploadFileRequest.bind(this);
        this.oncheckpinRequest = this.oncheckpinRequest.bind(this);
        this.onListeningTerminalRequest = this.onListeningTerminalRequest.bind(this);
        this.onEmittingTerminalEvents = this.onEmittingTerminalEvents.bind(this);
    }
    init(){
        this.handleTerminalClient();
        this.handleBrowserClient();
    }
    handleBrowserClient(){
        log.info(`Registering events for client with id ${this.socket.id}`);
        this.socket.on('upload-file',this.onUploadFileRequest);
        this.socket.on('check-pin', this.oncheckpinRequest);

    }
    handleTerminalClient(){
        log.info(`Registering events for Terminal client with id ${this.socket.id}`);
        this.socket.on('ListeningTerminalRequest', this.onListeningTerminalRequest);
    }


    parseInput(dwtimes, filename, filedata, filesize){
        log.info('Parsing the data from the production client.');
        const uid = createHash();
        const pin = createPin();
        const timestamp = Date.now();
        return new UserFile.builder().withfilename(filename).withdwtimes(dwtimes).
                   withfiledata(filedata).withfilesize(filesize).withuid(uid).withpin(pin)
                   .withtimestamp(timestamp).build();
    }
    onUploadFileRequest(input){
        log.info(`Executing the fileupload usecase for the client with id: ${this.socket.id}`);
        const userfile  = this.parseInput(input.downloads, input.filename, input.filedata, input.filesize);
        const uid = userfile.uid;
        const pin = userfile.pin; 
        this.uploadusecase.executeCase(userfile);
        this.socket.emit('file-received', {uid, pin});
    }

    async oncheckpinRequest(pin){
        let result = await this.uploadusecase.checkpin(pin);
        this.socket.emit('check-result', result); 
    }
 
    onListeningTerminalRequest(token){
        let validToken  = process.env.TOKEN; 
        if(token === validToken){
            this.event.on('operation', (...ops)=>{
             let operationtype = ops[0];
             let message = ops[1];
              this.onEmittingTerminalEvents(operationtype, message);  
            });
        }else{
            this.socket.emit('InvalidToken', 'Invalid token for the server.');
        }
    }
    onEmittingTerminalEvents(optype, opmessage){
        let datenow = Date.now();
        this.socket.emit('BackendListener', {optype, opmessage, datenow});
    }
}
const RegisterClientEvents = (socket, uploadusecase, event) =>{
    if(!socket){
        log.error('The socket connection is undefined, aborting process.');
        return;
    }
    const clientdispatcher = new ClientEventdispatcher(socket, uploadusecase, event);
    clientdispatcher.init();
};

module.exports = {RegisterClientEvents};