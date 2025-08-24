const sharp = require('sharp');

/** Reject unless the uploaded image matches EXACT width & height */
function validateExactImage(requiredW, requiredH) {
  return async (req, res, next) => {
    try {
      if (!req.file?.buffer) {
        return res.status(400).json({ message: 'No file uploaded' });
      }
      const meta = await sharp(req.file.buffer).metadata();
      if (meta.width !== requiredW || meta.height !== requiredH) {
        return res.status(400).json({
          message: `Invalid image dimensions. Required ${requiredW}x${requiredH}, got ${meta.width}x${meta.height}.`
        });
      }
      next();
    } catch (err) {
      next(err);
    }
  };
}

module.exports = { validateExactImage };
