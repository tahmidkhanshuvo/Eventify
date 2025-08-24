const multer = require('multer');

function makeUploader(maxBytes) {
  return multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: maxBytes },
    fileFilter: (req, file, cb) => {
      const ok = /^image\/(jpeg|png|webp)$/.test(file.mimetype);
      if (!ok) return cb(new Error('Only JPEG/PNG/WebP images are allowed'), false);
      cb(null, true);
    }
  });
}

module.exports = { makeUploader };
