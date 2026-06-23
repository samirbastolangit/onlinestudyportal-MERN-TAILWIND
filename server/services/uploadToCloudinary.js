const cloudinary = require("../config/cloudinary");

const uploadToCloudinary = async (fileBuffer, folder) => {

    return new Promise((resolve, reject) => {

        cloudinary.uploader.upload_stream(
            {
                folder
            },
            (error, result) => {

                if(error){
                    reject(error);
                }

                resolve(result);
            }
        ).end(fileBuffer);
    });
};

module.exports = uploadToCloudinary;