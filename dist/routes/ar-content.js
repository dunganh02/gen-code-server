"use strict";

var express = require('express');
var router = express.Router();
var multer = require('multer');
var arContentController = require('../controllers/arContentController');
var upload = multer({
  storage: multer.memoryStorage()
});
router.post('/save-content', upload.array('files'), arContentController.saveContent);
router.get('/get-content/:id', arContentController.getContent);
module.exports = router;