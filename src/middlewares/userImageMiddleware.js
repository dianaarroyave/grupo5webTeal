//Multer------------------------------------------------------------------
const multer = require('multer');
let path = require('path');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '../../public/userImages'));
  },

  filename: (req,file,cb)=> {
      const newFileName= "user_" + Date.now() + path.extname(file.originalname);
      cb(null,newFileName);
    }
});

const userUpload = multer({ storage });

module.exports = userUpload;
