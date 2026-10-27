const Event = require("../models/Event");
const Registration = require("../models/Registration");
const { replaceBuffer } = require("../services/imagekit.service"); // <-- import

const createEvent = async (req, res) => {
  const { title, description, date, location, category, imageUrl, capacity } =
    req.body;
  try {
    const event = new Event({
      title,
      description,
      date,
      location,
      category,
      imageUrl,
      capacity,
      createdBy: req.user._id,
    });
    const createdEvent = await event.save();
    res.status(201).json(createdEvent);
  } catch (error) {
    res.status(400).json({ message: "Error creating event: " + error.message });
  }
};

const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find({ date: { $gte: new Date() } })
      .sort({ date: 1 })
      .populate("createdBy", "username clubName");
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: "Server Error: " + error.message });
  }
};

const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate(
      "createdBy",
      "username clubName",
    );
    if (event)
      res.json({
        ...event.toObject(),
        registrationCount: await Registration.countDocuments({
          event: event._id,
        }),
      });
    else res.status(404).json({ message: "Event not found" });
  } catch (error) {
    res.status(500).json({ message: "Server Error: " + error.message });
  }
};

const updateEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });
    if (
      event.createdBy.toString() !== req.user._id.toString() &&
      req.user.role !== "Super Admin"
    ) {
      return res
        .status(403)
        .json({ message: "User not authorized to update this event" });
    }
    const allowedFields = [
      "title",
      "description",
      "date",
      "location",
      "category",
      "imageUrl",
      "capacity",
    ];
    for (const key of allowedFields)
      if (Object.hasOwn(req.body, key)) event[key] = req.body[key];
    if (
      event.capacity != null &&
      event.capacity < (await Registration.countDocuments({ event: event._id }))
    ) {
      return res
        .status(400)
        .json({
          message:
            "Capacity cannot be below the number of registered attendees.",
        });
    }
    const updatedEvent = await event.save();
    res.json(updatedEvent);
  } catch (error) {
    res.status(400).json({ message: "Error updating event: " + error.message });
  }
};

const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });
    if (
      event.createdBy.toString() !== req.user._id.toString() &&
      req.user.role !== "Super Admin"
    ) {
      return res
        .status(403)
        .json({ message: "User not authorized to delete this event" });
    }
    await Registration.deleteMany({ event: req.params.id });
    await event.deleteOne();
    res.json({
      message: "Event and all associated registrations have been removed.",
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error: " + error.message });
  }
};

const registerForEvent = async (req, res) => {
  const session = await Event.startSession();
  try {
    await session.withTransaction(async () => {
      const event = await Event.findById(req.params.id).session(session);
      const reject = (status, message) => {
        const error = new Error(message);
        error.status = status;
        throw error;
      };
      if (!event) reject(404, "Event not found");
      if (event.date <= new Date())
        reject(400, "Registration has closed for this event.");
      if (
        await Registration.findOne({
          event: event._id,
          user: req.user._id,
        }).session(session)
      )
        reject(400, "You are already registered for this event.");
      // Every enrollment writes the same event, so competing transactions retry
      // against fresh capacity rather than overbooking the final place.
      await Event.updateOne(
        { _id: event._id },
        { $inc: { registrationVersion: 1 } },
        { session },
      );
      const count = await Registration.countDocuments({
        event: event._id,
      }).session(session);
      if (event.capacity != null && count >= event.capacity)
        reject(400, "This event is currently full.");
      await Registration.create([{ user: req.user._id, event: event._id }], {
        session,
      });
    });
    res.status(201).json({ message: "Registered successfully for the event." });
  } catch (error) {
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ message: "You are already registered for this event." });
    }
    res
      .status(error.status || 500)
      .json({
        message: error.status
          ? error.message
          : "Unable to complete registration. Please try again.",
      });
  } finally {
    await session.endSession();
  }
};

const unregisterFromEvent = async (req, res) => {
  try {
    const result = await Registration.deleteOne({
      event: req.params.id,
      user: req.user._id,
    });
    if (result.deletedCount > 0)
      res.json({ message: "Unregistered successfully." });
    else
      res
        .status(404)
        .json({ message: "You were not registered for this event." });
  } catch (error) {
    res.status(500).json({ message: "Server Error: " + error.message });
  }
};

const getEventAttendees = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });
    if (
      event.createdBy.toString() !== req.user._id.toString() &&
      req.user.role !== "Super Admin"
    ) {
      return res
        .status(403)
        .json({ message: "Not authorized to view attendees for this event." });
    }
    const registrations = await Registration.find({
      event: req.params.id,
    }).populate("user", "username email university");
    const attendees = registrations.map((r) => r.user).filter(Boolean);
    res.json(attendees);
  } catch (error) {
    res.status(500).json({ message: "Server Error: " + error.message });
  }
};

// NEW: Get events created by the current user
const getMyEvents = async (req, res) => {
  try {
    const events = await Event.find({ createdBy: req.user._id })
      .sort({ createdAt: -1 })
      .populate("createdBy", "username clubName");
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: "Server Error: " + error.message });
  }
};

// NEW: upload/replace event banner (1920x1080 enforced in route)
const updateEventBanner = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    if (
      event.createdBy.toString() !== req.user._id.toString() &&
      req.user.role !== "Super Admin"
    ) {
      return res
        .status(403)
        .json({ message: "User not authorized to update this event" });
    }

    const ext = (
      req.file.originalname?.split(".").pop() || "jpg"
    ).toLowerCase();
    const fileName = `event_${event._id}_banner.${ext}`;

    const { url, fileId } = await replaceBuffer(
      req.file.buffer,
      fileName,
      "/banners",
      event.imageKitFileId,
    );

    event.imageUrl = url; // keep existing field name for frontend compatibility
    event.imageKitFileId = fileId;
    const saved = await event.save();

    res.status(200).json({ _id: saved._id, imageUrl: saved.imageUrl });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error uploading banner: " + error.message });
  }
};

module.exports = {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  registerForEvent,
  unregisterFromEvent,
  getEventAttendees,
  updateEventBanner,
  getMyEvents,
};
