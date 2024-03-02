
const asyncHandler = require('express-async-handler');
const filestorage = require('../services/FileStorage.js');
const { publishEvent } = require('../Events/EventManager.js');
const getDownload = asyncHandler(async (req, res) => {
	const uid = req.params.id;
	const metadata = filestorage.getFilebyUID(uid);
	publishEvent("ApiDownloadRequest", `Request para el id ${uid}`);
	res.setHeader('Content-Disposition', `attachment; filename="${metadata.filename}"`);
	res.setHeader('Content-Type', 'application/octet-stream');
	res.send(metadata.filedata);
	publishEvent("download", "la descarga ha comenzado por el servidor.");
	filestorage.deleteFilebyUID(uid);
	publishEvent("FileDeletion", `Se ha borrado de la memoria el archivo con id ${uid}`);
});



module.exports = getDownload; 