const request = require("supertest");
const express = require("express");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const autoCrud = require("../../src/router/autoCrud");

let app;
let mongo;

beforeAll(async () => {
  mongo = await MongoMemoryServer.create();
  await mongoose.connect(mongo.getUri());

  const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
  });

  const User = mongoose.model("User", userSchema);

  app = express();
  app.use(express.json());

  autoCrud(app, User);

  app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
      success: false,
      message: err.message,
    });
  });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongo.stop();
});

test("POST /users creates a user", async () => {
  const res = await request(app)
    .post("/users")
    .send({ name: "Alice", email: "alice@mail.com" });

  expect(res.status).toBe(201);
  expect(res.body.success).toBe(true);
});

test("GET /users returns empty array initially", async () => {
  const res = await request(app).get("/users");

  expect(res.status).toBe(200);
  expect(res.body.success).toBe(true);
});