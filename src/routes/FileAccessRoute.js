const express = require('express');
const router = express.Router();
const getDownload = require('../controllers/FileAccessController.js');

/**
	Router for starting the download. 
*/
router.route('/:id').get(getDownload);

module.exports = router;
