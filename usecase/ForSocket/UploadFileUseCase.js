const UserFile = require("../../domain/UserFile");
const getLogger = require("../../logs/WinstonLog");
class UploadFileUseCase {
    #log = getLogger();
    #UserFileRepo; 
    constructor(UserFileRepo){
        this.#UserFileRepo = UserFileRepo;
    }

    executeCase(userfileobj){
        if(userfileobj instanceof UserFile){
            this.#log.info(`${userfileobj.toString()}`);
        }
           
    }
}


module.exports = UploadFileUseCase; 
