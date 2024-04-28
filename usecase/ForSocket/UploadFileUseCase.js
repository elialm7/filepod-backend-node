const UserFile = require("../../domain/UserFile");
const getLogger = require("../../logs/WinstonLog");
const log = getLogger();
class UploadFileUseCase {
    #UserFileRepo; 
    constructor(UserFileRepo){
        this.#UserFileRepo = UserFileRepo;
    }

    executeCase(userfileobj){
        this.log(`uploadfilecase executed.`);
        const result = this.#UserFileRepo.create(userfileobj);
        if(result){
            log.info('document inserted');
        }else{
            log.error('document not inserted.');
        }
    }
}


module.exports = UploadFileUseCase; 
