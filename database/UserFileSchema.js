
const mongoose = require('mongoose');
const UserFile = require('../domain/UserFile');

const UserFileCollectionSchema = {
    userfileid: String, 
    userfilepin: Number, 
    userfilename: String, 
    userfiledata: Buffer,  
    usertimestamp: Date, 
    userdwtimes: Number
};
const ModelMetaData = {
    modelname: 'UserFile', 
    collectionName: 'ufiles'
};
const UserFileSchema = new mongoose.Schema(UserFileCollectionSchema);
UserFileSchema.loadClass(UserFile);
const UserFileModel = mongoose.model(
                                    ModelMetaData.modelname, 
                                    UserFileSchema, 
                                    ModelMetaData.collectionName
                                );
module.exports = UserFileModel; 



