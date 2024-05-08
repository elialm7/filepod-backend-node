class FilePreviewController{

    constructor(previewfileusecase, event){
        this.previewfileusecase = previewfileusecase;
        this.event = event;
    }

    idtostring(id){
        return `${id}`;
    }

    async preview(req, res){
        const id = this.idtostring(req.params.id);
        this.event.emit('operation', 'PreviewRequest', `A preview request for id ${id}`);
        const userfile = await this.previewfileusecase.executeCasebyuid(id);
        if(userfile === -1){
            this.event.emit('operation', 'PreviewRequestFailed', `A preview request failed for id ${id}`);
            res.render('NoFileOnserver', {id});
            return;
        }
        this.event.emit('operation', 'PreviewRequestSuccesful', `A preview reques succesful for id${id}`);

        let filename = userfile.filename;
        let filesize = userfile.filesize;
        let uid = userfile.uid;
        let pin = userfile.pin;
        let dwtimes = userfile.dwtimes;
        let date = userfile.timestamp.toUTCString();
        res.render('preview', {filename, filesize, uid, pin, dwtimes, date});
    }
}


module.exports = FilePreviewController;