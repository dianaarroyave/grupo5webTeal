//Multer------------------------------------------------------------------
const multer = require('multer');
let path = require('path');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '../../public/productImages'));
  },

  filename: (req,file,cb)=> {
      const newFileName= "product_" + Date.now() + path.extname(file.originalname);
      cb(null,newFileName);
    }
});

const upload = multer({ storage });

module.exports = upload;
