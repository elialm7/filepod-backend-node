class FileDownloadUseCase{

    constructor(userfilerepo, event){
        this.userfilerepo = userfilerepo;
        this.event = event;
    }

    async executeCase(id){
        this.event.emit('operation', 'ExecutingFileDownloadUseCase', 'Executing the file downloadusecase');
        const userfile = await this.userfilerepo.findbyuid(id);
        if(userfile === null){
            return -1;
        }
        if(userfile === undefined){
            return -1;
        }
        if(userfile.dwtimes === 1){
            this.event.emit('operation', 'FileDelete','Deleting from db the file with last downlaod');
            await this.userfilerepo.deletebyuid(id);   
            return userfile;
        }
        let newdw = userfile.dwtimes - 1; 
        userfile.dwtimes = newdw; 
        this.event.emit('operation', 'FileUpdate', 'the file has been updated from the database');
        await this.userfilerepo.updatebyuid(userfile);
        return userfile;
    }



}


module.exports = FileDownloadUseCase;