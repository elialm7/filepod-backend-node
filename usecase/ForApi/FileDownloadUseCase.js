class FileDownloadUseCase{

    constructor(userfilerepo){
        this.userfilerepo = userfilerepo;
    }

    async executeCase(id){
        const userfile =  await this.userfilerepo.findbyuid(id);
        if(userfile.dwtimes === 1){
            return this.userfilerepo.deletebyuid(id);   
        }
        let newdw = userfile.dwtimes - 1; 
        userfile.dwtimes = newdw; 
        await this.userfilerepo.updatebyuid(userfile);
        return userfile;
    }

}


module.exports = FileDownloadUseCase;