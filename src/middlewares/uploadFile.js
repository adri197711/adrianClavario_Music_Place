const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log("ingreso al middlewarefile", file);
    console.log(__dirname);
    
    cb(null,path.join(__dirname,'../public/images'));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = path.basename(file.originalname, path.extname(file.originalname)) + "-" + Date.now() + "-" + uuidv4() + path.extname(file.originalname);
    cb(null, uniqueSuffix);
  },
});

const fileFilter = (req, file, cb) => {

  console.log("fileFilter: ", file);
  
  const filtro = /\.(jpg|jpeg|png|gif)$/;
  if (filtro.test(file.originalname)) {
    // To accept this file pass `false`, like so:
    cb(null, true);
  } else {
    // To reject the file pass `true`, like so:
    req.errorValidationImage = "No es un tipo de archivo valido";
    cb(null, false);
  }
};

module.exports = multer({ storage,fileFilter });
