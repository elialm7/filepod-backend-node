
const asyncHandler = require('express-async-handler');
const { getFile, deleteFile } = require('../model/FileManager.js');
const DisplayUidError = require('../Error/ErrorDisplayer.js');
require('log-timestamp');


const getDownload = asyncHandler(async (req, res) => {

	const uid = req.params.id;
	console.log(`Processing download request for: ${uid}`);
	const metadata = getFile(uid);
	if (!metadata) {
		return res.status(404).send(DisplayUidError(uid));
	}
	res.setHeader('Content-Disposition', `attachment; filename="${metadata.fileName}"`);
	res.setHeader('Content-Type', 'application/octet-stream');
	res.send(metadata.fileData);
	console.log("processing deletion");
	deleteFile(uid);
});

module.exports = getDownload; 