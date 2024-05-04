
const getLogger = require("../../error/winstong");

const log = getLogger();
class FilepreviewUseCase{
    constructor(userfilerepo, event){
        this.userfilerepo = userfilerepo;
        this.event = event;
    }
   executeCasebyuid(id){
     this.event.emit('operation', 'FilePreviewCase', 'the executecasebyuid is being performed.');
        if(!id){
            log.error(`uid is undefined.`);
            return -1;
        }
        return this.userfilerepo.findbyuid(id);
    }

    executeCasebypin(pin){
        this.event.emit('operation', 'FilePreviewCase', 'the executecasebypin is being performed.');
        if(!pin){
            log.error(`pin is not defined.`);
            return -1;
        }
        return this.userfilerepo.findbypin(pin);
    }
}


module.exports = FilepreviewUseCase;
