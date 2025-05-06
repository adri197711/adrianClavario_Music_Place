const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log("ingreso al middlewarefile", file);
    cb(null,path.join(__dirname,'../../public/images/products/'));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = path.basename(file.originalname, path.extname(file.originalname)) + "-" + Date.now() + path.extname(file.originalname);
    cb(null, uniqueSuffix);
  },
});

const fileFilter = (req, file, cb) => {

  console.log("fileFilter: ", file);
  
  const filtro = /\.(jpg|jpeg|png|gif|webp)$/;
  if (filtro.test(file.originalname)) {
    cb(null, true);
  } else {
    req.errorValidationImage = "No es un tipo de archivo valido";
    cb(null, false);
  }
};

module.exports = multer({ storage,fileFilter });
