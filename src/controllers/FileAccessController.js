
const asyncHandler = require('express-async-handler');
const filestorage = require('../services/FileStorage.js');
const { UidNotonServer, undefinedUId } = require('../Error/ErrorDisplayer.js');
const { publishEvent } = require('../Events/EventManager.js');
const getDownload = asyncHandler(async (req, res) => {
	const uid = req.params.id;
	publishEvent("ApiRequest", `Request para el id ${uid}`);
	if (!uid) {
		publishEvent("UndefinedId", "No se paso ningun id en el request.");
		return res.status(404).send(undefinedUId(uid));
	}
	const metadata = filestorage.getFilebyUID(uid);
	if (!metadata) {
		publishEvent("FileError", `El Archivo para el id ${uid} ya no existe en el servidor.`);
		return res.status(404).send(UidNotonServer(uid));
	}
	res.setHeader('Content-Disposition', `attachment; filename="${metadata.filename}"`);
	res.setHeader('Content-Type', 'application/octet-stream');
	res.send(metadata.filedata);
	publishEvent("download", "la descarga ha comenzado por el servidor.");
	filestorage.deleteFilebyUID(uid);
	publishEvent("FileDeletion", `Se ha borrado de la memoria el archivo con id ${uid}`);
});



module.exports = getDownload; 