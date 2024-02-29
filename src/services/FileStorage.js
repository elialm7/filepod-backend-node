let instance = null;
class FileInMemoryManager {

    constructor() {
        if (!instance) {
            instance = this;
            this.files = [];
        }
        return instance;
    }
    saveFile({ uid, filename, filedata }) {
        this.files.push({
            uid,
            filename,
            filedata
        });
    }
    getNumberOfFiles() {
        return this.files.length;
    }

    deleteFilebyUID(uid) {
        const index = this.files.findIndex(file => file.uid == uid);
        if (index !== -1) {
            this.files.splice(index, 1);
        }
    }

    getFilebyUID(uid) {
        return this.files.find(file => file.uid == uid);
    }

}


module.exports = new FileInMemoryManager();
