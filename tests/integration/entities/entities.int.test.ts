import request from "supertest";

import { entity } from "./../../mocks/entities/entity";

const URL = process.env.URL;

describe("integration: /entities", () => {
    const server = request("http://localhost:3000/dev");

    describe("POST", () => {
        it("should return with a status of 201", async () => {
            const res = await server.post("/entities").send(entity);
            expect(res.status).toStrictEqual(201);
            expect(res.body.name).toStrictEqual(entity.name);
        });

        it("should return with a status of 400 for an invalid entity", async () => {

            const data = {
                name: "BMW",
                contacts: [
                    {
                        contactType: "email",
                        email: "test@test.com"
                    }
                ]
            };

            const res = await server.post("/entities").send(data);
            expect(res.status).toStrictEqual(400);
            expect(res.body.message).toStrictEqual("There was an error creating the entity");
        });
    });
});