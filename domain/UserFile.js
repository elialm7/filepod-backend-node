class UserFile{

    constructor(uid, pin, filename, filedata, timestamp){
        this.uid = uid; 
        this.pin  = pin;
        this.filename = filename; 
        this.filedata = filedata; 
        this.timestamp = timestamp;
    }


    getuid(){
        return this.uid;
    }

    getpin(){
        return this.pin; 
    }
    getfilename(){
        return this.filename;
    }

    getfiledata(){
        return this.filedata;
    }
    gettimestamp(){
        return this.timestamp; 
    }
}

module.exports = UserFile;