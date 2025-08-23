const request = require('supertest');
const { app } = require('../index');

// Shared state for the test suite
let adminToken;
let organizerToken;
let studentToken;
let organizerId;
let eventId;
let organizerTempPassword;

describe('Full API Workflow', () => {

    // Part 1: Super Admin and Organizer Approval
    describe('Super Admin and Organizer Approval', () => {
        it('should login as super admin and store the token', async () => {
            const res = await request(app)
                .post('/api/auth/login')
                .send({
                    email: 'superadmin@example.com',
                    password: 'supersecretpassword123',
                });
            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('token');
            adminToken = res.body.token;
        });

        it('should register a new organizer', async () => {
            const res = await request(app)
                .post('/api/auth/register/organizer')
                .send({
                    fullName: 'Test Organizer',
                    username: 'testorg',
                    email: 'organizer@test.com',
                    password: 'password123',
                    university: 'Test University',
                    clubName: 'Test Club',
                    clubPosition: 'Lead',
                    phoneNumber: '1112223333',
                    address: '123 Club House',
                    clubWebsite: 'http://testclub.com'
                });
            expect(res.statusCode).toEqual(201);
        });

        it('should fetch pending requests and find the new organizer', async () => {
            const res = await request(app)
                .get('/api/superadmin/requests')
                .set('Authorization', `Bearer ${adminToken}`);
            
            expect(res.statusCode).toEqual(200);
            const pendingOrg = res.body.find(org => org.email === 'organizer@test.com');
            expect(pendingOrg).toBeDefined();
            organizerId = pendingOrg._id;
        });

        it('should approve the organizer request and return a temp password', async () => {
            const res = await request(app)
                .post(`/api/superadmin/requests/${organizerId}/approve`)
                .set('Authorization', `Bearer ${adminToken}`);
            expect(res.statusCode).toEqual(200);
            expect(res.body.message).toContain('approved successfully');
            expect(res.body).toHaveProperty('tempPassword');
            organizerTempPassword = res.body.tempPassword;
        });
    });

    // Part 2: Event Management as Organizer
    describe('Event Management', () => {
        it('should login as the approved organizer with the temp password', async () => {
            const res = await request(app)
                .post('/api/auth/login')
                .send({
                    email: 'organizer@test.com',
                    password: organizerTempPassword,
                });
            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('token');
            organizerToken = res.body.token;
        });

        it('should create a new event', async () => {
            const res = await request(app)
                .post('/api/events')
                .set('Authorization', `Bearer ${organizerToken}`)
                .send({
                    title: 'Annual Tech Summit', // Corrected from 'name' to 'title'
                    date: '2025-10-15T10:00:00.000Z',
                    description: 'A summit for all things tech.',
                    location: 'Grand Hall',
                    category: 'Workshop' // Added required category
                });
            expect(res.statusCode).toEqual(201);
            expect(res.body).toHaveProperty('_id');
            eventId = res.body._id;
        });
    });

    // Part 3: Student Registration and Event Enrollment
    describe('Student Registration and Event Enrollment', () => {
        it('should register a new student', async () => {
            const res = await request(app)
                .post('/api/auth/register/student')
                .send({
                    fullName: 'Test Student',
                    username: 'teststudent',
                    email: 'student@test.com',
                    password: 'password123',
                    university: 'Test University',
                    department: 'Computer Science',
                    academicYear: 'Senior',
                    studentId: 'S98765',
                    phoneNumber: '4445556666',
                    address: '456 Dorm Lane'
                });
            expect(res.statusCode).toEqual(201);
        });

        it('should login as the new student', async () => {
            const res = await request(app)
                .post('/api/auth/login')
                .send({
                    email: 'student@test.com',
                    password: 'password123',
                });
            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('token');
            studentToken = res.body.token;
        });

        it('should allow the student to register for the event', async () => {
            const res = await request(app)
                .post(`/api/events/${eventId}/register`)
                .set('Authorization', `Bearer ${studentToken}`);
            expect(res.statusCode).toEqual(201); // Corrected from 200 to 201
            expect(res.body.message).toBe('Registered successfully for the event.'); // Corrected message
        });

        it('should generate a certificate for the student', async () => {
            const res = await request(app)
                .get(`/api/certificates/event/${eventId}`)
                .set('Authorization', `Bearer ${studentToken}`);
            expect(res.statusCode).toEqual(200);
            expect(res.headers['content-type']).toBe('application/pdf');
        });
    });

    // Part 4: Failure Cases
    describe('Failure Cases', () => {
        it('should prevent access to admin routes without a token', async () => {
            const res = await request(app).get('/api/superadmin/requests');
            expect(res.statusCode).toEqual(401);
        });

        it('should prevent non-admins from accessing admin routes', async () => {
            const res = await request(app)
                .get('/api/superadmin/requests')
                .set('Authorization', `Bearer ${studentToken}`);
            expect(res.statusCode).toEqual(403);
        });

        it('should fail to create an event with missing data', async () => {
            const res = await request(app)
                .post('/api/events')
                .set('Authorization', `Bearer ${organizerToken}`)
                .send({
                    description: 'An incomplete event.',
                });
            expect(res.statusCode).toEqual(400); // Corrected from 500 to 400
        });
    });
});