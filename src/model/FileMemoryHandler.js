let instance = null;
class FileMemoryHandler {
    constructor() {
        if (!instance) {
            instance = this;
            this.files = [];
        }
        return instance;
    }
    saveFile({ filename, filedata, uid }) {
        this.files.push({ filename, filedata, uid });
    }
    getFileByUid(uid) {
        return this.files.find(file => file.uid == uid);
    }
    deleteFileByUid(uid) {
        const index = this.files.findIndex(file = file.uid = uid);
        if (index !== -1) {
            this.files.splice(index, 1);
        }
    }
}

module.exports = new FileMemoryHandler();