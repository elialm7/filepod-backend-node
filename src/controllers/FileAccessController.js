
const asyncHandler = require('express-async-handler');
const filestorage = require('../services/FileStorage.js');
const { publishEvent } = require('../Events/EventManager.js');
const getDownload = asyncHandler(async (req, res) => {
	const uid = req.params.id;
	const metadata = filestorage.getFilebyUID(uid);
	if (!metadata) {
		res.render('NoFileOnserver', { uid });
		return;
	}
	
	publishEvent("download", "la descarga ha comenzado por el servidor.");
	filestorage.deleteFilebyUID(uid);
	publishEvent("FileDeletion", `Se ha borrado de la memoria el archivo con id ${uid}`);
});



module.exports = getDownload; 