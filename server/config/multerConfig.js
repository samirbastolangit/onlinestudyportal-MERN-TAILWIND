// config/multerConfig.js

const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({

    destination: (req, file, cb) => {

        cb(null, "assets/uploads/");
    },

    filename: (req, file, cb) => {

        const uniqueName =
            Date.now() +
            path.extname(file.originalname);

        cb(null, uniqueName);
    },
});

const upload = multer({

    storage,

    limits: {
        fileSize: 700 * 1024, //500KB
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