const asyncHandler = require('express-async-handler');
const filestorage = require('../services/FileStorage.js');
const { publishEvent } = require('../Events/EventManager.js');
const getPreview = asyncHandler(async (req, res) => {
    const uid = req.params.id;
    publishEvent('ApiPreviewRequest', `Request de preview para el id ${uid}`);
    const metadata = filestorage.getFilebyUID(uid);
    if (!metadata) {
        res.render('NoFileOnserver', { uid });
        return;
    }
    const filename = metadata.filename;
    res.render('preview', { uid, filename });
});


module.exports = getPreview; 