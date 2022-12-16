let path = require('path');
const multer = require('multer');
// import { generarId } from '../helpers/tokens.js';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../../public/productImages/');
    },
    // filename: function(req, file, cb) {
    //     cb(null, path.extname(file.originalname) );
    // },
    filename: (req,file,cb)=> {
        const newFileName= "product_" + Date.now() + path.extname(file.originalname);
        cb(null,newFileName);
      }
});

const upload = multer({ storage });

module.exports = upload;