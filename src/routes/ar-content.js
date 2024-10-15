const express = require('express');
const router = express.Router();

const multer = require('multer');
const arContentController = require('../controllers/arContentController');

const upload = multer({ storage: multer.memoryStorage() });
router.post('/save-content', upload.array('files'), arContentController.saveContent); 

router.get('/get-content/:id', arContentController.getContent);

module.exports = router;