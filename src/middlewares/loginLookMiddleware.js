const fs = require('fs');

 function loginLookMiddleware (req, res, next) {
  fs.appendFileSync('logDB.txt', 'Ingreso usuario correctamente' + req.url)

  next();
 }

 module.exports = loginLookMiddleware;
