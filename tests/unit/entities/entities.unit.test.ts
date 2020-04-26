import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import context from "aws-lambda-mock-context";
import createEvent from "aws-event-mocks";

import { createEntity } from "./../../../src/businessLogic/entities";
import { main } from "../../../src/lambda/http/entities/create";
import { entity } from "../../mocks/entities/entity";

jest.mock("./../../../src/businessLogic/entities", () => {
  const uuid = require("uuid");
  const entity = require("../../mocks/entities/entity");
  const entityId = uuid.v4();
  const createdEntity = {
    entityId,
    ...entity
  };

  return {
    createEntity: jest.fn(() => createdEntity)
  };
});

describe("unit: /entities", () => {
  const createdEntity = createEntity(entity, "abc123");

  it("endpoint should return a response with statusCode 201 and body", async () => {
    const event: APIGatewayProxyEvent = createEvent({
      template: "aws:apiGateway",
      merge: {
        body: entity,
      },
    });

    const ctx = context();
    const res = await main(event, ctx, null) as APIGatewayProxyResult;
    // createEntity first called in defining createdEntity above and then called in main
    expect(createEntity).toHaveBeenCalledTimes(2);
    expect(res).toBeDefined();
    expect(res.statusCode).toBe(201);
    expect(res.body).toStrictEqual(JSON.stringify(createdEntity));
  });
});
