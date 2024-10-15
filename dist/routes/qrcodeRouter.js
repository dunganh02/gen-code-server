"use strict";

var express = require('express');
var qrRouter = express.Router();
var _require = require('../controllers/qrcodeController'),
  scanQrcode = _require.scanQrcode;
qrRouter.post('/scanQrcode', scanQrcode);
module.exports = qrRouter;