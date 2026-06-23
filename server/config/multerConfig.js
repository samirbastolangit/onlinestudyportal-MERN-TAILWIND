
const multer = require("multer");

const storage = multer.memoryStorage();

const upload = multer({

    storage,

    limits: {
        fileSize: 500 * 1024, //500KB
    },

    fileFilter: (req, file, cb) => {

        const allowedTypes = [
            "image/jpeg",
            "image/png",
            "image/webp"
        ];

        if (
            allowedTypes.includes(file.mimetype)
        ) {
            cb(null, true);
        }
        else {
            cb(
                new Error(
                    "Only jpg png webp allowed"
                )
            );
        }
    },
});

module.exports = upload;