class FileDownloadUseCase{

    constructor(userfilerepo, event){
        this.userfilerepo = userfilerepo;
        this.event = event;
    }

    async executeCase(id){
        this.event.emit('operation', 'ExecutingFileDownloadUseCase', 'Executing the file downloadusecase');
        const userfile = await this.userfilerepo.findbyuid(id);
        if(userfile.dwtimes === 1){
            this.event.emit('operation', 'FileDelete','Deleting from db the file with last downlaod');
            return this.userfilerepo.deletebyuid(id);   
        }
        let newdw = userfile.dwtimes - 1; 
        userfile.dwtimes = newdw; 
        this.event.emit('operation', 'FileUpdate', 'the file has been updated from the database');
        await this.userfilerepo.updatebyuid(userfile);
        return userfile;
    }

}


module.exports = FileDownloadUseCase;