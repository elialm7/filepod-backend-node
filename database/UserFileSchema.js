const UserFile = require("../../domain/UserFile");
const mongoose = require('mongoose');

//definition of the schema
const UserFileCollectionSchema = {
    uid: String, 
    pin: String, 
    filename: String, 
    filedata: String, 
    timestamp: String 
};
const ModelMetaData = {
    modelname: 'UserFile', 
    collectionName: 'ufiles'
}
const UserFileSchema = new mongoose.Schema(UserFileCollectionSchema);
UserFileSchema.loadClass(UserFile);
const UserFileModel = mongoose.model(
                                    ModelMetaData.modelname, 
                                    UserFileSchema, 
                                    ModelMetaData.collectionName
                                );
module.exports = UserFileModel; 



