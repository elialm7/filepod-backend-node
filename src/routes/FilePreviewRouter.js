const express = require('express');
const router = express.Router();
const getPreview = require('../controllers/FilePreviewController.js');

router.route('/:id').get(getPreview);

module.exports = router;

