import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import context from "aws-lambda-mock-context";
import createEvent from "aws-event-mocks";

import entityClient from "../../../src/businessLogic/entities";
import { main } from "../../../src/lambda/http/entities/delete";
import promisify from "../../utils/promisify";

describe("unit: DELETE /entities/:entityId", () => {
  const entityId = "66bfef74-a64a-4681-9328-410752338a0e";
  const wrongEntityId = "abcdef";

  it("should delete an entity and return with statusCode 200 and body", async () => {
    entityClient.delete = jest.fn().mockResolvedValue({ entityId });
    const entityRes = await entityClient.delete(entityId);

    const event: APIGatewayProxyEvent = createEvent({
      template: "aws:apiGateway",
      merge: {
        body: {},
        pathParameters: entityId,
      },
    });

    const ctx = context();
    // const res = await main(event, ctx, null) as APIGatewayProxyResult;
    const res = await promisify(main, event, ctx) as APIGatewayProxyResult;

    expect(entityClient.delete).toHaveBeenCalledTimes(2);
    expect(res).toBeDefined();
    expect(res.statusCode).toBe(200);
    expect(res.body).toStrictEqual(JSON.stringify(entityRes));
  });

  it("should return an error with statusCode 400 and body", async () => {
    entityClient.delete = jest.fn().mockRejectedValue(new Error("There was an error deleting the entity"));

    const event: APIGatewayProxyEvent = createEvent({
      template: "aws:apiGateway",
      merge: {
        body: {},
        pathParameters: wrongEntityId,
      },
    });

    const ctx = context();
    // const res = await main(event, ctx, null) as APIGatewayProxyResult;
    const res = await promisify(main, event, ctx) as APIGatewayProxyResult;

    expect(entityClient.delete).toHaveBeenCalledTimes(1);
    expect(res).toBeDefined();
    expect(res.statusCode).toBe(400);
    expect(res.body).toStrictEqual(JSON.stringify({ message: "There was an error deleting the entity" }));
  });
});
