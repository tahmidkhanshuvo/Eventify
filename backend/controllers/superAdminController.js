const mongoose = require('mongoose');
const User = require('../models/User');
const nodemailer = require('nodemailer'); // optional; we just simulate sending

// ---- email stub (console only) ----
async function sendApprovalEmail({ email, tempPassword }) {
  console.log('--- SIMULATING EMAIL ---');
  console.log(`To: ${email}`);
  console.log(`Subject: Your Organizer Account has been Approved!`);
  const body = tempPassword
    ? `Congrats! Your organizer account is approved.\nTemporary password: ${tempPassword}`
    : `Congrats! Your organizer account is approved. You can log in with the password you registered with.`;
  console.log('Body:', body);
  console.log('------------------------');
}

/**
 * GET /api/superadmin/requests
 * Returns all PENDING organizer requests.
 * Optional query:
 *   q     -> free-text search (name/username/email/university/clubName)
 *   limit -> default 50
 */
const getOrganizerRequests = async (req, res) => {
  try {
    const q = (req.query.q || '').trim();
    const limit = Math.min(Math.max(parseInt(req.query.limit || '50', 10), 1), 100);

    const filter = { role: 'Organizer', status: 'Pending' };

    if (q) {
      const rx = new RegExp(q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
      filter.$or = [
        { fullName: rx },
        { username: rx },
        { email: rx },
        { university: rx },
        { clubName: rx },
      ];
    }

    const requests = await User.find(filter)
      .select('-password')
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean();

    return res.json(requests);
  } catch (error) {
    return res.status(500).json({ message: 'Server Error: ' + error.message });
  }
};

/**
 * POST /api/superadmin/requests/:userId/approve
 * Body (optional): { resetPassword: boolean }
 * - If resetPassword = true, generate a temp password and set it.
 * - Otherwise, keep the user’s existing password.
 */
const approveOrganizerRequest = async (req, res) => {
  try {
    const { userId } = req.params;
    const { resetPassword } = req.body || {};

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid user id' });
    }

    const user = await User.findById(userId);
    if (!user || user.role !== 'Organizer') {
      return res.status(404).json({ message: 'Organizer not found' });
    }
    if (user.status !== 'Pending') {
      return res.status(409).json({ message: 'Request is not pending' });
    }

    let tempPassword = null;
    if (resetPassword) {
      tempPassword = Math.random().toString(36).slice(-10);
      user.password = tempPassword; // will hash via pre-save hook
    }

    user.status = 'Approved';
    await user.save();

    await sendApprovalEmail({ email: user.email, tempPassword });

    // sanitize user for response
    const safeUser = {
      _id: user._id,
      fullName: user.fullName,
      username: user.username,
      email: user.email,
      phoneNumber: user.phoneNumber,
      address: user.address,
      university: user.university,
      clubName: user.clubName,
      clubPosition: user.clubPosition,
      clubWebsite: user.clubWebsite,
      status: user.status,
      role: user.role,
      createdAt: user.createdAt,
    };

    return res.json({
      message: `Organizer ${user.username} approved successfully.`,
      ...(tempPassword ? { tempPassword } : {}),
      user: safeUser,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Server Error: ' + error.message });
  }
};

/**
 * POST /api/superadmin/requests/:userId/reject
 * Current model doesn’t support "Rejected" status,
 * so we REMOVE the user (original behavior).
 */
const rejectOrganizerRequest = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid user id' });
    }

    const user = await User.findById(userId);
    if (!user || user.role !== 'Organizer') {
      return res.status(404).json({ message: 'Organizer not found' });
    }
    if (user.status !== 'Pending') {
      return res.status(409).json({ message: 'Request is not pending' });
    }

    await user.deleteOne();
    return res.json({ message: 'Organizer request rejected and user removed.' });
  } catch (error) {
    return res.status(500).json({ message: 'Server Error: ' + error.message });
  }
};

/**
 * GET /api/superadmin/approved
 * Returns all APPROVED organizers (for Stored List tab).
 */
const getApprovedOrganizers = async (req, res) => {
  try {
    const users = await User.find({ role: 'Organizer', status: 'Approved' })
      .select('-password')
      .sort({ createdAt: -1 })
      .lean();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server Error: ' + error.message });
  }
};

module.exports = {
  getOrganizerRequests,
  approveOrganizerRequest,
  rejectOrganizerRequest,
  getApprovedOrganizers,
};
