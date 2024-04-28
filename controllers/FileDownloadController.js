class FileDownloadController{
    constructor(downloadusecase){
        this.downloadusecase = downloadusecase; 
    }
    idtostring(id){
        return `${id}`;
    }
    async download(req, res){
        const id = this.idtostring(req.params.id);
        const userfile = await this.downloadusecase.executeCase(id);
        if(userfile === -1){
            res.render('NofileOnserver', {id});
            return;
        }
	    res.setHeader('Content-Disposition', `attachment; filename="${userfile.filename}"`);
	    res.setHeader('Content-Type', 'application/octet-stream');
	    res.send(userfile.filedata);
    }
}

module.exports = FileDownloadController;