class FilePreviewController{

    constructor(previewfileusecase){
        this.previewfileusecase = previewfileusecase;
    }

    idtostring(id){
        return `${id}`;
    }

    async preview(req, res){
        const id = this.idtostring(req.params.id);
        console.log(id);
        const userfile = await this.previewfileusecase.executeCasebyuid(id);
        if(userfile === -1){
            res.render('NofileOnserver', {id});
            return;
        }
    
        let filename = userfile.filename;
        let filesize = userfile.filesize;
        let uid = userfile.uid;
        let pin = userfile.pin;
        let dwtimes = userfile.dwtimes;
        res.render('preview', {filename, filesize, uid, pin, dwtimes});
    }
}


module.exports = FilePreviewController;