const multer = require('multer');
const sharpMulter = require('sharp-multer');

const customMulter = function (width, height) {

  const imageOptions = {
    fileFormat: "webp",
    useTimestamp: true,
    quality: 80,
    resize: { width: width, height: height, resizeMode: "inside" },
  }

  const newFilenameFunction = (og_filename, options) => {
    const newname =
      og_filename.split(".").slice(0, -1).join("-").split(" ").join("-") +
      `${options.useTimestamp ? "-" + Date.now() : ""}` +
      "." +
      options.fileFormat;
    return newname;
  };

  const storage = sharpMulter({
    destination: (req, file, callback) => {
      callback(null, 'controllers/images');
    },
    filename: newFilenameFunction,
    imageOptions: imageOptions
  });

  return  multer({storage: storage}).single('image');

}

module.exports = customMulter;