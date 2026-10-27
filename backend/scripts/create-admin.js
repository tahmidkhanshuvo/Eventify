require("dotenv").config();
const mongoose = require("mongoose");
const User = require("../models/User");
(async () => {
  const { MONGO_URI, SUPER_ADMIN_EMAIL, SUPER_ADMIN_PASSWORD } = process.env;
  if (
    !MONGO_URI ||
    !SUPER_ADMIN_EMAIL ||
    !SUPER_ADMIN_PASSWORD ||
    SUPER_ADMIN_PASSWORD.length < 12
  )
    throw new Error(
      "Set MONGO_URI, SUPER_ADMIN_EMAIL and a password of at least 12 characters.",
    );
  try {
    await mongoose.connect(MONGO_URI);
    if (await User.exists({ email: SUPER_ADMIN_EMAIL.toLowerCase() })) {
      console.log(
        "That account already exists. No account or password was changed.",
      );
      return;
    }
    await User.create({
      fullName: "Eventify Administrator",
      username: process.env.SUPER_ADMIN_USERNAME || "eventify-admin",
      email: SUPER_ADMIN_EMAIL.toLowerCase(),
      password: SUPER_ADMIN_PASSWORD,
      role: "Super Admin",
      status: "Approved",
    });
    console.log("Administrator created. Credentials were not printed.");
  } finally {
    await mongoose.disconnect();
  }
})().catch((error) => {
  console.error(
    error.name === "MongoServerError"
      ? "Administrator creation failed. Check the connection and unique account fields."
      : error.message,
  );
  process.exitCode = 1;
});
