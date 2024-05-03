const getLogger = require("../logs/WinstonLog");
const UserFile = require("../domain/UserFile");
const UserFileModel = require('./UserFileSchema');
const log = getLogger();
class UserFileMongoRepository{

    constructor(event){
        this.event = event;    
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
                    userdwtimes: userfile.dwtimes, 
                    userfilesize: userfile.filesize
                };
                const inserted = await UserFileModel.create(datatoInsert);
                this.event.emit('operation', 'UserFileInsertion', 'The userfile has been inserted to mongo db sucessfully');
                return {
                    uid: inserted.userfileid, 
                    pin: inserted.userfilepin, 
                    filename: inserted.userfilename, 
                    filedata: inserted.userfiledata, 
                    timestamp: inserted.usertimestamp, 
                    dwtimes: inserted.userdwtimes, 
                    filesize: inserted.userfilesize
                }; 
            }catch(e){
                log.error('Error trying to create a new row for the Userfile');
                return -1;
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
            this.event.emit('operation', 'UserFileFound', 'a userfiledocument has been found');
            return {
                uid: found.userfileid, 
                pin: found.userfilepin, 
                filename: found.userfilename, 
                filedata: found.userfiledata, 
                timestamp: found.usertimestamp, 
                dwtimes: found.userdwtimes, 
                filesize: found.userfilesize
            };
        }catch(e){
            log.error(`Error executing findbyuid `);
            return -1;
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
            this.event.emit('operation', 'UserFileFound', 'a userfiledocument has been found');
           return {
                uid: found.userfileid, 
                pin: found.userfilepin, 
                filename: found.userfilename, 
                filedata: found.userfiledata, 
                timestamp: found.usertimestamp, 
                dwtimes: found.userdwtimes, 
                filesize: found.userfilesize
            };
        }catch(e){
            log.error(`Error executing findbypin: ${e}`);
            return -1;
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
                userdwtimes: updateduserfile.dwtimes, 
                userfilesize: updateduserfile.filesize
            };
            let updated = await UserFileModel.updateOne(datatoupdate);
            this.event.emit('operation', 'UserFileUpdated', 'a userfiledocument has been Updated');
            return {
                uid: updated.userfileid, 
                pin: updated.userfilepin, 
                filename: updated.userfilename, 
                filedata: updated.userfiledata, 
                timestamp: updated.usertimestamp, 
                dwtimes: updated.userdwtimes, 
                filesize: updated.userfilesize
            };
        }catch(e){
                log.error('There was an error during the update');
                return -1;
        }
    }

    async deletebyuid(uid){
        try{
            let deleted = await UserFileModel.deleteOne({
                userfileid:  uid
            });
            this.event.emit('operation', 'UserFileDeleted', 'a userfiledocument has been deleted.');
            return {
                uid: deleted.userfileid, 
                pin: deleted.userfilepin, 
                filename: deleted.userfilename, 
                filedata: deleted.userfiledata, 
                timestamp: deleted.usertimestamp, 
                dwtimes: deleted.userdwtimes, 
                filesize: deleted.userfilesize
            };
        }catch(e){
            log.error(`There was an error trying to update`);
            return -1;
        }
    }
}

module.exports = UserFileMongoRepository; 
