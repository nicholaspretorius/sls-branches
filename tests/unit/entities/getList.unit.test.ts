import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import context from "aws-lambda-mock-context";
import createEvent from "aws-event-mocks";

import entityClient from "../../../src/businessLogic/entities";
import { main } from "../../../src/lambda/http/entities/getList";
import { getEntities } from "../../mocks/entities/entity";
import promisify from "../../utils/promisify";

describe("unit: GET /entities", () => {
  const userId = "abc123";
  it("should return all entities with statusCode 200 and body", async () => {
    entityClient.getList = jest.fn().mockResolvedValue(getEntities);
    const entities = await entityClient.getList(userId);

    const event: APIGatewayProxyEvent = createEvent({
      template: "aws:apiGateway",
      merge: {
        body: {},
        requestContext: {
          identity: {
            cognitoIdentityId: userId,
          },
        },
      },
    });

    const ctx = context();
    // const res = await main(event, ctx, null) as APIGatewayProxyResult;
    const res = await promisify(main, event, ctx) as APIGatewayProxyResult;

    expect(entityClient.getList).toHaveBeenCalledTimes(2);
    expect(res).toBeDefined();
    expect(res.statusCode).toBe(200);
    expect(res.body).toStrictEqual(JSON.stringify(entities));
  });

  it("should return an error with statusCode 400 and body", async () => {
    entityClient.getList = jest.fn().mockRejectedValue(new Error("There was an error retrieving entities"));

    const event: APIGatewayProxyEvent = createEvent({
      template: "aws:apiGateway",
      merge: {
        body: {},
        requestContext: {
          identity: {
            cognitoIdentityId: userId,
          },
        },
      },
    });

    const ctx = context();
    // const res = await main(event, ctx, null) as APIGatewayProxyResult;
    const res = await promisify(main, event, ctx) as APIGatewayProxyResult;

    expect(entityClient.getList).toHaveBeenCalledTimes(1);
    expect(res).toBeDefined();
    expect(res.statusCode).toBe(400);
    expect(res.body).toStrictEqual(JSON.stringify({ message: "There was an error retrieving entities" }));
  });
});
