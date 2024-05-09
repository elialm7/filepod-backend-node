/* eslint-disable no-mixed-spaces-and-tabs */
class FileDownloadController{
    constructor(downloadusecase, event){
        this.downloadusecase = downloadusecase;
        this.event = event; 
        
    }
    idtostring(id){
        return `${id}`;
    }
    async download(req, res){
        const id = this.idtostring(req.params.id);
        this.event.emit('operation', 'DownloadRequest',`A download request to be performed for id ${id}`);
        const userfile = await this.downloadusecase.executeCase(id);
        console.log(userfile);
        if(userfile === -1){
            res.render('NofileOnserver', {id});
            this.event.emit('operation', 'DownloadRequestFailed',`A download request failed for id ${id}`);
            return;
        }
        if(userfile === undefined){
            res.render('NofileOnserver', {id});
            this.event.emit('operation', 'DownloadRequestFailed',`A download request failed for id ${id}`);
            return;
        }
        if(userfile === null){
            res.render('NofileOnserver', {id});
            this.event.emit('operation', 'DownloadRequestFailed',`A download request failed for id ${id}`);
            return;
        }
        this.event.emit('operation', 'DownloadRequestSuccess',`A download request successful for id ${id}`);
	    res.setHeader('Content-Disposition', `attachment; filename="${userfile.filename}"`);
	    res.setHeader('Content-Type', 'application/octet-stream');
	    res.send(userfile.filedata);
    }
}

module.exports = FileDownloadController;