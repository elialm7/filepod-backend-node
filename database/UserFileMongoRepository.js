const mongoose = require('mongoose');
const getLogger = require("../logs/WinstonLog");
const UserFile = require("../domain/UserFile");
const UserFileModel = require('./UserFileSchema');
const log = getLogger();
class UserFileMongoRepository{
    constructor(){
        
    }
    async create(userfile){
            if(!userfile || !(userfile instanceof UserFile)){
                log.error("The userfile param is either undefined or not and instace of UserFile");
                return;
            }
            try{
                const datatoInsert = {
                    userfileid: userfile.uid, 
                    userfilepin : userfile.pin,
                    userfilename: userfile.filename, 
                    userfiledata: userfile.filedata, 
                    usertimestamp: userfile.timestamp, 
                    userdwtimes: userfile.dwtimes
                };
                const inserted = await UserFileModel.create(datatoInsert);
                return inserted; 
            }catch(e){
                log.error('Error trying to create a new row for the Userfile');
                log.error(e);
            }
    }
    async findbyuid(uid){
        if(!uid){
            log.error("Uid is not defined.");
            return;
        }
        try{
            let found = await UserFileModel.findOne({
                userfileid: uid
            });
            return found;
        }catch(e){
            log.error(`Error executing findbyuid : ${e}`);
        }

    }
    async findbypin(pin){
        if(!pin){
            log.error("Pin is not defined");
            return;
        }
        try{
            let found = await UserFileModel.findOne({
                userfilepin: pin
            });
            return found;
        }catch(e){
            log.error(`Error executing findbypin : ${e}`);
        }
    }

    async updatebyuid(updateduserfile){

        if(!updateduserfile){
            log.error('Userfile is not defined');
            return;
        }
        try{
            const datatoupdate = {
                userfileid: updateduserfile.uid, 
                userfilepin : updateduserfile.pin,
                userfilename: updateduserfile.filename, 
                userfiledata: updateduserfile.filedata, 
                usertimestamp: updateduserfile.timestamp, 
                userdwtimes: updateduserfile.dwtimes
            };
            let updated = await UserFileModel.updateOne(datatoupdate);
            return updated;
        }catch(e){
                log.error('There was an error during the update');
        }

    }
}

module.exports = UserFileMongoRepository; 
