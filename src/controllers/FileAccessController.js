
const  asyncHandler = require('express-async-handler');
const {getFile} = require('../model/FileManager.js');



const getDownload = asyncHandler(async(req, res)=>{
	
	const uid = req.params.id; 
	const metadata = getFile(uid);
	res.setHeader('Content-Disposition', `attachment; filename="${metadata.fileName}"`);
	res.setHeader('Content-Type', 'application/octet-stream');
    res.send(metadata.fileData);

});

module.exports = getDownload; 