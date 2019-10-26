const multer = require('multer');
const crypto = require('crypto');
const { extname, resolve } = require('path');

module.exports = {
  // storage: new multer.diskStorage({
  //   destination: path.resolve(__dirname, '..', '..', 'uploads'),
  //   filename(req, file, cb) {
  //     cb(null, file.originalname);
  //   },
  // }),
  storage: multer.diskStorage({
    destination: resolve(__dirname, '..', '..', 'uploads'),
    filename: (req, file, cb) => {
      crypto.randomBytes(16, (err, res) => {
        if (err) return cb(err);

        return cb(null, res.toString('hex') + extname(file.originalname));
      });
    },
  }),
};
