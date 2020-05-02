import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import context from "aws-lambda-mock-context";
import createEvent from "aws-event-mocks";

import entityClient from "../../../src/businessLogic/entities";
import { main } from "../../../src/lambda/http/entities/get";
import { getEntity } from "../../mocks/entities/entity";
import promisify from "../../utils/promisify";

describe("unit: GET /entities/:entityId", () => {
  const entityId = "66bfef74-a64a-4681-9328-410752338a0e";
  const wrongEntityId = "abcdef";
  const userId = "abc123";

  it("should return an entity by id with statusCode 200 and body", async () => {
    entityClient.get = jest.fn().mockResolvedValue(getEntity);
    const entityRes = await entityClient.get(userId, entityId);

    const event: APIGatewayProxyEvent = createEvent({
      template: "aws:apiGateway",
      merge: {
        body: {},
        pathParameters: entityId,
        requestContext: {
          identity: {
            cognitoIdentityId: userId,
          },
        },
      },
    });

    const ctx = context();
    const res = await promisify(main, event, ctx) as APIGatewayProxyResult;
    // const res = await main(event, ctx, null) as APIGatewayProxyResult;

    expect(entityClient.get).toHaveBeenCalledTimes(2);
    expect(res).toBeDefined();
    expect(res.statusCode).toBe(200);
    expect(res.body).toStrictEqual(JSON.stringify(entityRes));
  });

  it("should return an error with statusCode 400 and body", async () => {
    entityClient.get = jest.fn().mockRejectedValue(new Error("There was an error retrieving the entity"));

    const event: APIGatewayProxyEvent = createEvent({
      template: "aws:apiGateway",
      merge: {
        body: {},
        pathParameters: wrongEntityId,
      },
    });

    const ctx = context();
    const res = await promisify(main, event, ctx) as APIGatewayProxyResult;
    // const res = await main(event, ctx, null) as APIGatewayProxyResult;

    expect(entityClient.get).toHaveBeenCalledTimes(1);
    expect(res).toBeDefined();
    expect(res.statusCode).toBe(400);
    expect(res.body).toStrictEqual(JSON.stringify({ message: "There was an error retrieving the entity" }));
  });
});
