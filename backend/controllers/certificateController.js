const PDFDocument = require("pdfkit");
const Event = require("../models/Event");
const Registration = require("../models/Registration");

const generateCertificate = async (req, res) => {
  try {
    const { eventId } = req.params;
    const userId = req.user._id;

    const event = await Event.findById(eventId).populate(
      "createdBy",
      "clubName university",
    );
    if (!event) {
      return res.status(404).json({ message: "Event not found." });
    }

    if (new Date(event.date) > new Date()) {
      return res
        .status(400)
        .json({
          message:
            "Cannot generate certificate for an event that has not yet occurred.",
        });
    }

    const registration = await Registration.findOne({
      event: eventId,
      user: userId,
    });
    if (!registration) {
      return res
        .status(403)
        .json({
          message: "Forbidden: You were not registered for this event.",
        });
    }

    const doc = new PDFDocument({ size: "A4", layout: "landscape" });

    const filename = `Certificate-${event.title.replace(/[^a-zA-Z0-9_-]/g, "-").slice(0, 80)}.pdf`;
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);

    doc.pipe(res);

    const width = doc.page.width - 100;
    const centered = (text, y, size, bold = false) => {
      const label = String(text || "").replace(/[\r\n]+/g, " ");
      doc.font(bold ? "Helvetica-Bold" : "Helvetica").fontSize(size);
      while (doc.widthOfString(label) > width && size > 11) doc.fontSize(--size);
      doc.text(label, 50, y, { width, height: 45, align: "center", ellipsis: true });
    };
    doc.lineWidth(2).strokeColor("#263b35").rect(24, 24, doc.page.width - 48, doc.page.height - 48).stroke();
    doc.lineWidth(0.5).strokeColor("#b7c8a3").rect(32, 32, doc.page.width - 64, doc.page.height - 64).stroke();
    doc.fillColor("#263b35");
    centered(event.createdBy?.clubName || "Eventify", 64, 18, true);
    centered("Certificate of Participation", 119, 34, true);
    centered("This is to certify that", 194, 17);
    centered(req.user.fullName || req.user.username, 232, 29, true);
    centered("successfully participated in the event", 287, 17);
    centered(event.title, 328, 26, true);
    centered(`Held on ${new Date(event.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "Asia/Dhaka" })}`, 384, 15);
    doc.moveTo(doc.page.width / 2 - 110, 482).lineTo(doc.page.width / 2 + 110, 482).stroke();
    centered("Event Coordinator", 494, 12);

    doc.end();
  } catch (error) {
    console.error("Certificate generation error:", error);
    res.status(500).json({ message: "Server Error: " + error.message });
  }
};

module.exports = {
  generateCertificate,
};
