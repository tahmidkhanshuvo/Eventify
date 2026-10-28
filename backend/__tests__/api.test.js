const request = require("supertest");
const { app } = require("../index");

// Shared state for the test suite
let adminToken;
let organizerToken;
let studentToken;
let organizerId;
let eventId;

describe("Full API Workflow", () => {
  // Part 1: Super Admin and Organizer Approval
  describe("Super Admin and Organizer Approval", () => {
    it("should login as super admin and store the token", async () => {
      const res = await request(app).post("/api/auth/login").send({
        email: "superadmin@example.com",
        password: "supersecretpassword123",
      });
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("token");
      adminToken = res.body.token;
    });

    it("should register a new organizer", async () => {
      const res = await request(app).post("/api/auth/register/organizer").send({
        fullName: "Test Organizer",
        username: "testorg",
        email: "organizer@test.com",
        password: "password123",
        university: "Test University",
        clubName: "Test Club",
        clubPosition: "Lead",
        phoneNumber: "1112223333",
        address: "123 Club House",
        clubWebsite: "http://testclub.com",
      });
      expect(res.statusCode).toEqual(201);
    });

    it("should fetch pending requests and find the new organizer", async () => {
      const res = await request(app)
        .get("/api/superadmin/requests")
        .set("Authorization", `Bearer ${adminToken}`);

      expect(res.statusCode).toEqual(200);
      const pendingOrg = res.body.find(
        (org) => org.email === "organizer@test.com",
      );
      expect(pendingOrg).toBeDefined();
      organizerId = pendingOrg._id;
    });

    it("should approve the organizer while preserving their chosen password", async () => {
      const res = await request(app)
        .post(`/api/superadmin/requests/${organizerId}/approve`)
        .set("Authorization", `Bearer ${adminToken}`);
      expect(res.statusCode).toEqual(200);
      expect(res.body.message).toContain("approved successfully");
      expect(res.body).not.toHaveProperty("tempPassword");
    });
  });

  // Part 2: Event Management as Organizer
  describe("Event Management", () => {
    it("should login as the approved organizer with their original password", async () => {
      const res = await request(app).post("/api/auth/login").send({
        email: "organizer@test.com",
        password: "password123",
      });
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("token");
      organizerToken = res.body.token;
    });

    it("should create a new event", async () => {
      const res = await request(app)
        .post("/api/events")
        .set("Authorization", `Bearer ${organizerToken}`)
        .send({
          title: "Annual Tech Summit",
          date: new Date(Date.now() + 86400000).toISOString(),
          description: "A summit for all things tech.",
          location: "Grand Hall",
          category: "Workshop",
        });
      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty("_id");
      eventId = res.body._id;
    });
  });

  // Part 3: Student Registration and Event Enrollment
  describe("Student Registration and Event Enrollment", () => {
    it("should register a new student", async () => {
      const res = await request(app).post("/api/auth/register/student").send({
        fullName: "Test Student",
        username: "teststudent",
        email: "student@test.com",
        password: "password123",
        university: "Test University",
        department: "Computer Science",
        academicYear: "Senior",
        studentId: "S98765",
        phoneNumber: "4445556666",
        address: "456 Dorm Lane",
      });
      expect(res.statusCode).toEqual(201);
    });

    it("should login as the new student", async () => {
      const res = await request(app).post("/api/auth/login").send({
        email: "student@test.com",
        password: "password123",
      });
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("token");
      studentToken = res.body.token;
    });

    it("should allow the student to register for the event", async () => {
      const res = await request(app)
        .post(`/api/events/${eventId}/register`)
        .set("Authorization", `Bearer ${studentToken}`);
      expect(res.statusCode).toEqual(201);
      expect(res.body.message).toBe("Registered successfully for the event.");
    });

    it("should generate a certificate for the student", async () => {
      await require("../models/Event").findByIdAndUpdate(eventId, {
        date: new Date(Date.now() - 86400000),
      });
      const res = await request(app)
        .get(`/api/certificates/event/${eventId}`)
        .set("Authorization", `Bearer ${studentToken}`);
      expect(res.statusCode).toEqual(200);
      expect(res.headers["content-type"]).toBe("application/pdf");
      const pdf = res.body.toString("latin1");
      expect(pdf.match(/\/Type\s*\/Page\b/g)).toHaveLength(1);
    });
  });

  // Part 4: Failure Cases
  describe("Failure Cases", () => {
    it("should prevent access to admin routes without a token", async () => {
      const res = await request(app).get("/api/superadmin/requests");
      expect(res.statusCode).toEqual(401);
    });

    it("should prevent non-admins from accessing admin routes", async () => {
      const res = await request(app)
        .get("/api/superadmin/requests")
        .set("Authorization", `Bearer ${studentToken}`);
      expect(res.statusCode).toEqual(403);
    });

    it("should fail to create an event with missing data", async () => {
      const res = await request(app)
        .post("/api/events")
        .set("Authorization", `Bearer ${organizerToken}`)
        .send({
          description: "An incomplete event.",
        });
      expect(res.statusCode).toEqual(400);
    });
  });

  describe("Capacity and public club profiles", () => {
    it("keeps the final event place atomic under competing registrations", async () => {
      const friend = await require("../models/User").create({
        fullName: "Capacity Test",
        username: "capacity-test",
        email: "capacity@test.com",
        password: "test-password",
        role: "Student",
        university: "Test University",
        department: "CSE",
        academicYear: "Senior",
        studentId: "capacity-1",
      });
      const friendToken = require("jsonwebtoken").sign(
        { id: friend._id },
        process.env.JWT_SECRET,
      );
      const event = await request(app)
        .post("/api/events")
        .set("Authorization", `Bearer ${organizerToken}`)
        .send({
          title: "One place only",
          description: "Isolated concurrency regression test.",
          location: "Test Hall",
          category: "Workshop",
          date: new Date(Date.now() + 86400000).toISOString(),
          capacity: 1,
        });
      expect(event.statusCode).toBe(201);
      const results = await Promise.all(
        [studentToken, friendToken].map((token) =>
          request(app)
            .post(`/api/events/${event.body._id}/register`)
            .set("Authorization", `Bearer ${token}`),
        ),
      );
      expect(results.map((result) => result.statusCode).sort()).toEqual([
        201, 400,
      ]);
      expect(
        await require("../models/Registration").countDocuments({
          event: event.body._id,
        }),
      ).toBe(1);
    });
    it("exposes approved club information without private account fields", async () => {
      const result = await request(app).get("/api/users/clubs");
      expect(result.statusCode).toBe(200);
      expect(result.body.some((club) => club.clubName === "Test Club")).toBe(
        true,
      );
      for (const club of result.body) {
        expect(club).not.toHaveProperty("email");
        expect(club).not.toHaveProperty("password");
        expect(club).not.toHaveProperty("phoneNumber");
      }
    });
  });
});
