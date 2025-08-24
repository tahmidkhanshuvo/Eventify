const PDFDocument = require('pdfkit');
const Event = require('../models/Event');
const Registration = require('../models/Registration');

const generateCertificate = async (req, res) => {
    try {
        const { eventId } = req.params;
        const userId = req.user._id;

        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ message: 'Event not found.' });
        }

        if (new Date(event.date) > new Date()) {
            return res.status(400).json({ message: 'Cannot generate certificate for an event that has not yet occurred.' });
        }

        const registration = await Registration.findOne({ event: eventId, user: userId });
        if (!registration) {
            return res.status(403).json({ message: 'Forbidden: You were not registered for this event.' });
        }
        
        const doc = new PDFDocument({ size: 'A4', layout: 'landscape' });

        const filename = `Certificate-${event.title.replace(/\s+/g, '-')}.pdf`;
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);

        doc.pipe(res);

        doc.rect(20, 20, doc.page.width - 40, doc.page.height - 40).stroke();
        doc.fontSize(18).font('Helvetica-Bold').text('University of Code & Community', { align: 'center' });
        doc.moveDown(2);
        doc.fontSize(36).font('Helvetica-Bold').text('Certificate of Participation', { align: 'center' });
        doc.moveDown(1.5);
        doc.fontSize(20).font('Helvetica').text('This is to certify that', { align: 'center' });
        doc.moveDown(1);
        doc.fontSize(28).font('Helvetica-Bold').text(req.user.username, { align: 'center' });
        doc.moveDown(1);
        doc.fontSize(20).font('Helvetica').text('successfully participated in the event', { align: 'center' });
        doc.moveDown(1);
        doc.fontSize(28).font('Helvetica-Bold').text(`"${event.title}"`, { align: 'center' });
        doc.moveDown(0.8);
        doc.fontSize(16).font('Helvetica').text(`held on ${new Date(event.date).toLocaleDateString()}`, { align: 'center' });
        doc.moveDown(3);
        doc.fontSize(14).text('_________________________', { align: 'center' });
        doc.fontSize(12).text('Event Coordinator', { align: 'center' });

        doc.end();

    } catch (error) {
        console.error('Certificate generation error:', error);
        res.status(500).json({ message: 'Server Error: ' + error.message });
    }
};

module.exports = {
    generateCertificate,
};