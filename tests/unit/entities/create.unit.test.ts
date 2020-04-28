import * as uuid from "uuid";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import context from "aws-lambda-mock-context";
import createEvent from "aws-event-mocks";

import entityClient from "../../../src/businessLogic/entities";
import { main } from "../../../src/lambda/http/entities/create";
import { entity } from "../../mocks/entities/entity";

// jest.mock("../../../src/businessLogic/entities", () => {
//   const uuid = require("uuid");
//   const mockEntity = require("../../mocks/entities/entity");
//   const entityId = uuid.v4();
//   const createdEntity = {
//     entityId,
//     ...mockEntity,
//   };

//   return {
//     createEntity: jest.fn(() => createdEntity),
//   };
// });

describe("unit: POST /entities", () => {
  it("should return the entity with statusCode 201 and body", async () => {
    const entityId = uuid.v4();
    const mockEntity = {
      entityId,
      ...entity,
    };

    entityClient.create = jest.fn().mockResolvedValue(mockEntity);
    const createdEntity = await entityClient.create(entity, "abc123");

    const event: APIGatewayProxyEvent = createEvent({
      template: "aws:apiGateway",
      merge: {
        body: entity,
      },
    });

    const ctx = context();
    const res = await main(event, ctx, null) as APIGatewayProxyResult;
    // createEntity first called in defining createdEntity above and then called in main
    expect(entityClient.create).toHaveBeenCalledTimes(2);
    expect(res).toBeDefined();
    expect(res.statusCode).toBe(201);
    expect(res.body).toStrictEqual(JSON.stringify(createdEntity));
  });


  it("should return an error with statusCode 400 and body", async () => {
    entityClient.create = jest.fn().mockRejectedValue(new Error("There was an error creating the entity"));

    const event: APIGatewayProxyEvent = createEvent({
      template: "aws:apiGateway",
      merge: {
        body: {},
      },
    });

    const ctx = context();
    const res = await main(event, ctx, null) as APIGatewayProxyResult;
    expect(entityClient.create).toHaveBeenCalledTimes(1);
    expect(res).toBeDefined();
    expect(res.statusCode).toBe(400);
    expect(res.body).toStrictEqual(JSON.stringify({ message: "There was an error creating the entity" }));
  });
});
