const UserFile = require("../../domain/UserFile");
const getLogger = require("../../logs/wlog");
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
        if(result){
           return {
            status: 'ok', 
            uid: result.uid
           };
        }else {
            return {
                status: 'failed', 
                uid: -1
            };
        }
    }
}


module.exports = UploadFileUseCase; 
