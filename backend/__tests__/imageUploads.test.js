const request = require('supertest');
const sharp = require('sharp');
const { app } = require('../index');

// Mock ImageKit service so no real uploads happen
jest.mock('../services/imagekit.service', () => ({
  replaceBuffer: jest.fn(async () => ({
    url: 'https://ik.imagekit.io/mock/fake.jpg',
    fileId: 'file_mock_123',
  })),
  uploadBuffer: jest.fn(async () => ({
    url: 'https://ik.imagekit.io/mock/fake.jpg',
    fileId: 'file_mock_123',
  })),
  deleteById: jest.fn(async () => {}),
}));

/** helper: generate an in-memory image of exact WxH */
async function makeImageBuffer(w, h, format = 'jpeg') {
  const img = sharp({
    create: {
      width: w,
      height: h,
      channels: 3,
      background: { r: 128, g: 128, b: 128 },
    },
  });
  if (format === 'png') return img.png().toBuffer();
  if (format === 'webp') return img.webp().toBuffer();
  return img.jpeg({ quality: 85 }).toBuffer();
}

describe('Image uploads (event banner & club logo)', () => {
  let adminToken;
  let organizerToken;
  let organizerId;
  let eventId;
  const unique = Date.now();

  // ---- Admin + Organizer flow ----
  it('logs in as super admin', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'superadmin@example.com', password: 'supersecretpassword123' });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
    adminToken = res.body.token;
  });

  it('registers a new organizer', async () => {
    const res = await request(app)
      .post('/api/auth/register/organizer')
      .send({
        fullName: 'Uploader Org',
        username: `uploadorg_${unique}`,
        email: `uploadorg_${unique}@test.com`,
        password: 'password123',
        university: 'Test U',
        clubName: 'Upload Club',
        clubPosition: 'Lead',
        phoneNumber: '1234567890',
        address: '1 Test Road',
        clubWebsite: 'https://upload.club',
      });
    expect(res.statusCode).toBe(201);
  });

  it('approves organizer and logs them in', async () => {
    const list = await request(app)
      .get('/api/superadmin/requests')
      .set('Authorization', `Bearer ${adminToken}`);
    expect(list.statusCode).toBe(200);

    const pending = list.body.find((u) => u.email === `uploadorg_${unique}@test.com`);
    expect(pending).toBeDefined();
    organizerId = pending._id;

    const approve = await request(app)
      .post(`/api/superadmin/requests/${organizerId}/approve`)
      .set('Authorization', `Bearer ${adminToken}`);
    expect(approve.statusCode).toBe(200);
    expect(approve.body).toHaveProperty('tempPassword');

    const login = await request(app)
      .post('/api/auth/login')
      .send({ email: `uploadorg_${unique}@test.com`, password: approve.body.tempPassword });
    expect(login.statusCode).toBe(200);
    organizerToken = login.body.token;
  });

  it('creates a new event', async () => {
    const res = await request(app)
      .post('/api/events')
      .set('Authorization', `Bearer ${organizerToken}`)
      .send({
        title: 'Upload Test Event',
        date: '2099-10-15T10:00:00.000Z',
        description: 'Event used for image upload tests',
        location: 'Main Hall',
        category: 'Workshop',
      });
    expect(res.statusCode).toBe(201);
    eventId = res.body._id;
  });

  // ---- Event banner tests ----
  it('uploads a valid 1920x1080 banner (<=5MB)', async () => {
    const buffer = await makeImageBuffer(1920, 1080, 'jpeg');
    const res = await request(app)
      .patch(`/api/events/${eventId}/banner`)
      .set('Authorization', `Bearer ${organizerToken}`)
      .attach('banner', buffer, { filename: 'banner.jpg', contentType: 'image/jpeg' });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('imageUrl');
    expect(typeof res.body.imageUrl).toBe('string');
  });

  it('rejects an invalid banner with wrong dimensions', async () => {
    const bad = await makeImageBuffer(1280, 720, 'jpeg'); // wrong size
    const res = await request(app)
      .patch(`/api/events/${eventId}/banner`)
      .set('Authorization', `Bearer ${organizerToken}`)
      .attach('banner', bad, { filename: 'bad-banner.jpg', contentType: 'image/jpeg' });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toMatch(/Invalid image dimensions/i);
  });

  // ---- Club logo tests ----
  it('uploads a valid 1080x1080 club logo (<=2MB)', async () => {
    const buf = await makeImageBuffer(1080, 1080, 'png');
    const res = await request(app)
      .patch(`/api/users/${organizerId}/club-logo`)
      .set('Authorization', `Bearer ${organizerToken}`)
      .attach('logo', buf, { filename: 'logo.png', contentType: 'image/png' });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('clubLogoUrl');
    expect(typeof res.body.clubLogoUrl).toBe('string');
  });

  it('rejects a club logo with wrong dimensions', async () => {
    const bad = await makeImageBuffer(1000, 1000, 'png');
    const res = await request(app)
      .patch(`/api/users/${organizerId}/club-logo`)
      .set('Authorization', `Bearer ${organizerToken}`)
      .attach('logo', bad, { filename: 'bad-logo.png', contentType: 'image/png' });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toMatch(/Invalid image dimensions/i);
  });
});
