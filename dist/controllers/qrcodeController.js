"use strict";

var QRCode = require('qrcode');
exports.scanQrcode = function (req, res) {
  var url = req.body.url;
  if (url.length === 0) {
    res.send("Empty QR Code");
  }
  QRCode.toDataURL(url, function (err, urlData) {
    console.log(url);
    res.send(urlData);
  });
};