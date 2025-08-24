const User = require('../models/User');
const { replaceBuffer } = require('../services/imagekit.service');

const updateClubLogo = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

    // Owner organizer or Super Admin
    if (req.user._id.toString() !== req.params.id && req.user.role !== 'Super Admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    if (user.role !== 'Organizer') {
      return res.status(400).json({ message: 'Club logo is only for Organizer accounts' });
    }

    const ext = (req.file.originalname?.split('.').pop() || 'jpg').toLowerCase();
    const fileName = `user_${user._id}_clublogo.${ext}`;

    const { url, fileId } = await replaceBuffer(
      req.file.buffer,
      fileName,
      '/club-logos',
      user.clubLogoFileId
    );

    user.clubLogoUrl = url;
    user.clubLogoFileId = fileId;
    await user.save();

    res.status(200).json({ clubLogoUrl: user.clubLogoUrl });
  } catch (err) {
    res.status(400).json({ message: 'Error uploading club logo: ' + err.message });
  }
};

module.exports = { updateClubLogo };
