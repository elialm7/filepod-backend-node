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

    async checkpin(pin){
        const result = await this.#UserFileRepo.findbypin(pin);
        if(result){
           return {
            status: 'ok', 
            uid: result.uid
           };
        }else {
            return {
                status: 'failed'
            };
        }
    }
}


module.exports = UploadFileUseCase; 
