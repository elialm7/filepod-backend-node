
const asyncHandler = require('express-async-handler');
const { getFile, deleteFile, getFileFromMemory, deleteFileFromMemory } = require('../model/FileManager.js');
const DisplayUidError = require('../Error/ErrorDisplayer.js');
require('log-timestamp');


const getDownload = asyncHandler(async (req, res) => {

	const uid = req.params.id;
	console.log(`Processing download request for: ${uid}`);
	const metadata = getFileFromMemory(uid);
	if (!metadata) {
		return res.status(404).send(DisplayUidError(uid));
	}
	res.setHeader('Content-Disposition', `attachment; filename="${metadata.filename}"`);
	res.setHeader('Content-Type', 'application/octet-stream');
	res.send(metadata.filedata);
	console.log("processing deletion");
	deleteFileFromMemory(uid);
});

module.exports = getDownload; 