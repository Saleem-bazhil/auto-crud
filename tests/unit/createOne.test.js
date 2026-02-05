const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const createOne = require("../../src/core/createOne");

let mongo;
let User;

beforeAll(async () => {
  mongo = await MongoMemoryServer.create();
  await mongoose.connect(mongo.getUri());

  const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
  });

  User = mongoose.model("User", userSchema);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongo.stop();
});

test("should create a document successfully", async () => {
  const data = { name: "John", email: "john@mail.com" };

  const result = await createOne(User)(data);

  expect(result._id).toBeDefined();
  expect(result.name).toBe("John");
});

test("should fail when required field is missing", async () => {
  const data = { name: "John" };

  await expect(createOne(User)(data)).rejects.toMatchObject({
    status: 400,
  });
});