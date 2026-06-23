const sharp = require("sharp");

const validateImageResolution = async (
  req,
  res,
  next
) => {
  try {

    // no image uploaded
    if (!req.file) {
      return next();
    }

    const metadata = await sharp(
      req.file.buffer
    ).metadata();

    const width = metadata.width;
    const height = metadata.height;

    if (width > 600 || height > 600) {
      return res.status(400).json({
        success: false,
        message:
          "Image resolution must be 600x600 or smaller",
      });
    }

    next();

  } catch (error) {
    console.log("error in image validation: ", error);
    
    return res.status(400).json({
      success: false,
      message: "Invalid image file",
    });

  }
};

module.exports = validateImageResolution;