const QRCode = require('qrcode');
const ARContent = require('../models/arContent');
const path = require('path');
const { console } = require('inspector');
const fs = require('fs').promises;
require('dotenv').config();


// exports.saveContent = async (req, res) => {
//   console.log('saveContent')
//   try {
//     const { userId, text, scale, position, rotation } = req.body;  
//     const modelFile = req.file;

//     if (!modelFile) {
//       return res.status(400).json({ message: 'No file uploaded' });
//     }

//     const fileName = `${userId}_${Date.now()}${path.extname(modelFile.originalname)}`;
//     const filePath = path.join(__dirname, '../../public/models', fileName);
//     const modelPath = `/models/${fileName}`;

//     await fs.mkdir(path.dirname(filePath), { recursive: true });
//     await fs.writeFile(filePath, modelFile.buffer);

//     // Tạo đối tượng mới để lưu vào MongoDB
//     const newContent = new ARContent({
//       userId,
//       modelPath: modelPath,
//       modelType: path.extname(modelFile.originalname).slice(1), // Lấy phần mở rộng của file
//       text,
//       scale: scale ? JSON.parse(scale) : undefined, // Kiểm tra trước khi parse
//       position: position ? JSON.parse(position) : { x: 0, y: 0, z: 0 }, // Cung cấp giá trị mặc định
//       rotation: rotation ? JSON.parse(rotation) : { x: 0, y: 0, z: 0 } // Cung cấp giá trị mặc định
//     });

//   const result =  await newContent.save();
//   console.log(result);

//     // Tạo mã QR cho URL của mô hình
//     // const modelUrl = `http://localhost:3000${modelPath}`;
//     // const modelUrl = `https://vinacomin.vn`;
//     // const modelUrl = result.modelPath;
//     const modelUrl = `${process.env.HOST_SERVER}${process.env.PORT}${modelPath}`;

//     console.log(modelUrl);
//     const qrCodeImageUrl = await QRCode.toDataURL(modelUrl);

//     res.status(201).json({ message: 'AR content saved successfully', qrCodeImageUrl, result });
//     // res.status(201).json({ message: 'AR content saved successfully' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Error saving AR content', error: error.message });
//   }
// };


exports.saveContent = async (req, res) => {
  try {
    const { userId, text, scale, position, rotation } = req.body;
    const files = req.files;  // Nhiều file đã được tải lên

    if (!files || files.length === 0) {
      return res.status(400).json({ message: 'No files uploaded' });
    }

    // Tạo đường dẫn thư mục để lưu tất cả file
    const folderName = `${userId}_${Date.now()}`;
    const folderPath = path.join(__dirname, '../../public/models', folderName);
    const modelPath = `/models/${folderName}/${path.basename(files[1].originalname)}`;

    await fs.mkdir(folderPath, { recursive: true });

    // Lưu từng file vào thư mục đã tạo
    for (const file of files) {
      const filePath = path.join(folderPath, file.originalname);
      await fs.writeFile(filePath, file.buffer);
    }

    // Lưu dữ liệu vào MongoDB
    const newContent = new ARContent({
      userId,
      modelPath: modelPath,
      modelType: 'folder', // Nếu là một thư mục
      text,
      scale: scale ? JSON.parse(scale) : undefined,
      position: position ? JSON.parse(position) : { x: 0, y: 0, z: 0 },
      rotation: rotation ? JSON.parse(rotation) : { x: 0, y: 0, z: 0 }
    });

    const result = await newContent.save();

    // Tạo mã QR cho URL của mô hình
    // const modelUrl = `${process.env.URL_CLIENT}${modelPath}`;
    const modelUrl = `http://localhost:3000${modelPath}`;

    const qrCodeImageUrl = await QRCode.toDataURL(modelUrl);

    res.status(201).json({ message: 'AR content saved successfully', qrCodeImageUrl, result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error saving AR content', error: error.message });
  }
};


exports.getContent = async (req, res) => {
  console.log('id', req.params.id);
  try {
    const content = await ARContent.findOne({ _id: req.params.id });
    console.log("content", content);
    if (content) {
      res.status(201).json({ message: 'get successfully', content});
    } else {
      res.status(404).json({ message: 'AR content not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving AR content', error: error.message });
  }
};