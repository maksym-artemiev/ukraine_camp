const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
// const express = require('express');
// const multer = require('multer');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
})

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'YelpCamp',
        allowedFormats: ['jpg', 'png', 'jpeg']
    }

});

// const parser = multer({ storage: storage });

// app.post('/upload', parser.single('image'), function (req, res) {
//   res.json(req.file);
// });

module.exports = {
    cloudinary,
    storage
}