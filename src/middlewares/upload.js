// import the multer module before configuring it to use the disc storage engine
const util = require("util");
const multer = require("multer");
const maxSize = 2 * 1024 * 1024;
let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // console.log('__basedir :'+ __basedir)
    // cb(null, __basedir + "/resources/static/assets/uploads/");
    cb(null, "E:\\Projects\\ae.geomanager.se\\app.geomanager.se\\geomanager.se.be.api\\gm.be.api\\src\\uploads");
  },
  filename: (req, file, cb) => {
    console.log(file.originalname);
    cb(null, file.originalname);
  },
});

let uploadFile = multer({
  storage: storage,
  limits: { fileSize: maxSize },
}).single("file");

// create the exported middleware object
let uploadFileMiddleware = util.promisify(uploadFile);
module.exports = uploadFileMiddleware;