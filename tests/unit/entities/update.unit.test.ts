import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import context from "aws-lambda-mock-context";
import createEvent from "aws-event-mocks";

import entityClient from "../../../src/businessLogic/entities";
import { main } from "../../../src/lambda/http/entities/update";
import { updateEntity } from "../../mocks/entities/entity";
import promisify from "../../utils/promisify";

describe("unit: UPDATE /entities/:entityId", () => {
  const entityId = "66bfef74-a64a-4681-9328-410752338a0e";
  const wrongEntityId = "abcdef";
  const userId = "abc123";

  it("should update an entity and return with statusCode 200 and body", async () => {
    entityClient.update = jest.fn().mockResolvedValue(updateEntity);
    const entityRes = await entityClient.update(userId, entityId, updateEntity);

    const event: APIGatewayProxyEvent = createEvent({
      template: "aws:apiGateway",
      merge: {
        body: JSON.stringify(updateEntity),
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

    expect(entityClient.update).toHaveBeenCalledTimes(2);
    expect(res).toBeDefined();
    expect(res.statusCode).toBe(200);
    expect(res.body).toStrictEqual(JSON.stringify(entityRes));
  });

  it("should return an error with statusCode 400 and body", async () => {
    entityClient.update = jest.fn().mockRejectedValue(new Error("There was an error updating the entity"));

    const event: APIGatewayProxyEvent = createEvent({
      template: "aws:apiGateway",
      merge: {
        body: JSON.stringify({}),
        pathParameters: {
          entityId: wrongEntityId,
          requestContext: {
            identity: {
              cognitoIdentityId: userId,
            },
          },
        },
      },
    });

    const ctx = context();
    // const res = await main(event, ctx, null) as APIGatewayProxyResult;
    const res = await promisify(main, event, ctx) as APIGatewayProxyResult;
    expect(entityClient.update).toHaveBeenCalledTimes(1);
    expect(res).toBeDefined();
    expect(res.statusCode).toBe(400);
    expect(res.body).toStrictEqual(JSON.stringify({ message: "There was an error updating the entity" }));
  });
});
