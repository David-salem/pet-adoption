var cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: 'dnpmpp2va',
    api_key: '642975295328852',
    api_secret: 'bkA-Q2vwBf1aq1PU1dg30oNDfAQ'
});

function uploadToCloudinary(filePath){
    return new Promise((resolve,reject) => {
        cloudinary.uploader.upload(filePath, function (error, result) {
            if (error) reject(error);
            else resolve (result);
        })
    })
}

module.exports = { uploadToCloudinary }
