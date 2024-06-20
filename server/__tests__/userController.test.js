// test login in backend
const request = require("supertest");
const app = require("../server.js");
const db = require("../models/userModels");
const bcrypt = require("bcrypt");

const test = jest.setTimeout(30000);

describe("User Controller", () => {
  let server;
  let port;

  beforeAll(async (done) => {
    server = app.listen(0);
    port = server.address().port;

    const hashedPassword = await bcrypt.hash("testpassword", 10);
    await db.query(
      `INSERT INTO users (username, password) VALUES ('testuser135', '${hashedPassword}');`
    );
  });

  afterAll(async () => {
    await db.query(
        `DELETE FROM users WHERE username = 'testuser135'`
      );
    clearTimeout(test)
    await server.close((done) => {done()});
  });

  describe("POST /users/login", () => {
    it("should return 200 and user data for valid credentials", async () => {
      const response = await request(`http://localhost:${port}`)
        .post("/users/login")
        .send({ username: "testuser135", password: "testpassword" });

      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        success: true,
        message: "login successfully",
        data: {
          userId: expect.any(Number),
          username: "testuser135",
        },
      });
    });
  });
});