import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import context from "aws-lambda-mock-context";
import createEvent from "aws-event-mocks";

import { main, getGreeting } from "../../src/ping";

describe("unit: /ping", () => {
  it("getGreeting() should return a message of 'Hello world!'", () => {
    expect.hasAssertions();
    expect(getGreeting()).toBe("Hello world!");
  });

  it("endpoint should return a response with statusCode 200 and body.message", async () => {
    const event: APIGatewayProxyEvent = createEvent({
      template: "aws:apiGateway",
      merge: {
        body: {},
      },
    });
    const ctx = context();
    const response = { message: "Hello world!" };
    const res = await main(event, ctx, null) as APIGatewayProxyResult;
    expect(res).toBeDefined();
    expect(res.statusCode).toBe(200);
    expect(res.body).toStrictEqual(JSON.stringify(response));
  });
});
