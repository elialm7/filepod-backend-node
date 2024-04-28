
const getLogger = require("../../logs/WinstonLog");

const log = getLogger();
class FilepreviewUseCase{
    constructor(userfilerepo){
        this.userfilerepo = userfilerepo;
    }
   executeCasebyuid(id){
        if(!id){
            log.error(`uid is undefined.`);
            return -1;
        }
        return this.userfilerepo.findbyuid(id);
    }

    executeCasebypin(pin){
        if(!pin){
            log.error(`pin is not defined.`);
            return -1;
        }
        return this.userfilerepo.findbypin(pin);
    }
}


module.exports = FilepreviewUseCase;
