import request from "supertest";

describe("integration: GET /ping", () => {
  const server = request("http://localhost:3000/dev");

  it("should return with status of 200", async () => {
    const res = await server.get("/ping");
    expect(res.status).toStrictEqual(200);
  });

  it("should return with a message", async () => {
    const res = await server.get("/ping");
    expect(res.body.message).toStrictEqual("Hello world!");
  });
});
