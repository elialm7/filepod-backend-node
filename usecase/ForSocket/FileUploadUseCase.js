const UserFile = require("../../domain/UserFile");
const getLogger = require("../../error/winstong");
const log = getLogger();
class UploadFileUseCase {
    #UserFileRepo; 
    constructor(UserFileRepo){
        this.#UserFileRepo = UserFileRepo;
    }

    executeCase(userfileobj){
        log.info(`upload file case executed.`);
        const result = this.#UserFileRepo.create(userfileobj);
        if(result){
            log.info('document inserted');
        }else{
            log.error('document not inserted.');
        }
    }

    async checkpin(pin){
        const result = await this.#UserFileRepo.findbypin(pin);
        if(!result){
            return {
                status: 'failed', 
                uid: -1
            };
        }
        if(result ===-1){
            return {
                status: 'failed', 
                uid: -1
            };
          
        }
     
        return {
            status: 'ok', 
            uid: result.uid
        };
        
    }
}


module.exports = UploadFileUseCase; 
