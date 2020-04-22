import request from "supertest";

describe("integration: GET /ping", () => {
    const server = request("http://localhost:3000/dev");

    test("should return with status of 200", async () => {
        const res = await server.get("/ping");
        expect(res.status).toEqual(200);
    });

    test("should return with a message", async () => {
        const res = await server.get("/ping");
        expect(res.body);
        expect(res.body.message).toEqual("Hello world!");
    });
});