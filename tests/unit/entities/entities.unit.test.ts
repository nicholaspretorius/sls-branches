import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import context from "aws-lambda-mock-context";
import createEvent from "aws-event-mocks";

import { main } from "./../../../src/lambda/http/entities/create";
import { entity } from "./../../mocks/entities/entity";

describe("unit: /entities", () => {
    it("endpoint should return a response with statusCode 201 and body", async () => {
        const event: APIGatewayProxyEvent = createEvent({
            template: "aws:apiGateway",
            merge: {
                body: entity,
            },
        });

        const ctx = context();
        const res = await main(event, ctx, null) as APIGatewayProxyResult;
        expect(res).toBeDefined();
        expect(res.statusCode).toBe(201);
        expect(res.body).toStrictEqual(JSON.stringify(entity));
    });
});