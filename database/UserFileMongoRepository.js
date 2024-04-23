const UserFile = require("../../domain/UserFile");
const UserFileRepository = require("../../repository/UserFileRepository");
const mongoose = require('mongoose');
const getLogger = require("../logs/WinstonLog");
const UserFileModel = require("./UserFileSchema");
const log = getLogger();
class UserFileMongoRepository extends UserFileRepository{
    constructor(){
        super();
    }
    async create(userfile){
            if(!userfile || !(userfile instanceof UserFile)){
                log.error("the userfile param is either undefined or not and instace of UserFile");
                return;
            }
            try{
                const inserted = await UserFileModel.create(userfile);
                return inserted; 
            }catch(e){
                log.error('Error trying to create a new row for the Userfile');
            }finally{
                mongoose.connection.close();
            }
    }
    async findbyuid(uid){
        if(!uid){
            log.error("uid is not defined.");
            return;
        }
        try{
            let found = await UserFileModel.findOne({
                uid
            });
            return found;
        }catch(e){
            log.error(`Error executing findbyuid : ${e}`);
        }finally{
            mongoose.connection.close();
        }

    }
    async findbypin(pin){
        if(!pin){
            log.error("pin is not defined");
            return;
        }
        try{
            let found = await UserFileModel.findOne({
                pin
            });
            return found;
        }catch(e){
            log.error(`Error executing findbypin : ${e}`);
        }finally{
            mongoose.connection.close();
        }
    }
}

module.exports = UserFileMongoRepository; 
