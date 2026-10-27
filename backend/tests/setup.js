const mongoose = require("mongoose");
const { MongoMemoryReplSet } = require("mongodb-memory-server");

// Each suite owns a disposable local database. Existing .env cloud URLs are never used.
process.env.NODE_ENV = "test";
process.env.JWT_SECRET = "eventify-isolated-test-secret-only";
process.env.IMAGEKIT_PUBLIC_KEY = "test-public";
process.env.IMAGEKIT_PRIVATE_KEY = "test-private";
process.env.IMAGEKIT_URL_ENDPOINT = "https://example.invalid";
jest.setTimeout(180000);
jest.mock("nodemailer", () => ({
  createTransport: () => ({
    sendMail: jest.fn(async () => ({ messageId: "local-test" })),
  }),
}));
const User = require("../models/User");
let database;
beforeAll(async () => {
  if (process.env.TEST_MONGO_BASE_URI) {
    const uri = new URL(process.env.TEST_MONGO_BASE_URI);
    uri.pathname = `/eventify_test_${Date.now()}_${process.pid}`;
    await mongoose.connect(uri.toString(), { serverSelectionTimeoutMS: 20000 });
  } else {
    database = await MongoMemoryReplSet.create({
      replSet: { count: 1 },
      instanceOpts: [{ dbName: "eventify_test" }],
    });
    await mongoose.connect(database.getUri());
  }
  await Promise.all(
    Object.values(mongoose.models).map((model) => model.init()),
  );
  await User.create({
    username: "superadmin",
    email: "superadmin@example.com",
    password: "supersecretpassword123",
    role: "Super Admin",
    status: "Approved",
    fullName: "Super Admin",
  });
});
afterAll(async () => {
  try {
    if (
      mongoose.connection.readyState === 1 &&
      /^eventify_test_\d+_\d+$/.test(mongoose.connection.name)
    ) {
      // Atlas application users may drop owned collections but not entire databases.
      const collections = await mongoose.connection.db.collections();
      for (const collection of collections) await collection.drop();
    }
  } finally {
    await mongoose.disconnect();
    if (database) await database.stop();
  }
});
