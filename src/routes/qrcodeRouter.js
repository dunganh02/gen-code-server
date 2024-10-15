const express = require('express')
const qrRouter = express.Router()

const { scanQrcode } = require('../controllers/qrcodeController')


qrRouter.post('/scanQrcode', scanQrcode)


module.exports = qrRouter