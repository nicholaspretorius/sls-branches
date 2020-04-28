import * as uuid from "uuid";
import * as AWSMock from "aws-sdk-mock";
// import * as AWS from "aws-sdk";
// import { PutItemInput, GetItemInput } from "aws-sdk/clients/dynamodb";

import { entity, getEntities } from "../../mocks/entities/entity";
import { Entity } from "../../../src/models/entities/Entity";
import EntityAccess from "../../../src/dataLayer/entitiesAccess";

// https://blog.kylegalbraith.com/2018/09/10/two-ways-of-mocking-aws-services-in-typescript/
// https://www.npmjs.com/package/aws-sdk-mock#documentation
const mockedEntity = {
  entityId: uuid.v4(),
  userId: entity.userId,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  name: entity.name,
  country: entity.country,
  contacts: entity.contacts,
} as Entity;

describe("unit: dataLayer:entitiesAccess", () => {
  it("create entity in DynamoDB", async () => {
    const expectedPr = {
      Attributes: mockedEntity,
      // $response: null,
    };

    AWSMock.mock("DynamoDB.DocumentClient", "put", Promise.resolve(expectedPr));
    const entitiesAccess = new EntityAccess();
    const res = await entitiesAccess.createEntity(mockedEntity);
    // console.log("Result: ", res);
    expect(res).toBe(mockedEntity);
  });

  it("return entities from DynamoDB", async () => {
    const mockRes = {
      Items: getEntities,
    };

    AWSMock.mock("DynamoDB.DocumentClient", "query", Promise.resolve(mockRes));
    const entitiesAccess = new EntityAccess();
    const res = await entitiesAccess.getEntities();
    expect(res).toBe(getEntities);
  });

  it("return entity by id from DynamoDB", async () => {
    const mockRes = {
      Item: entity,
    };

    AWSMock.mock("DynamoDB.DocumentClient", "get", Promise.resolve(mockRes));
    const entitiesAccess = new EntityAccess();
    const res = await entitiesAccess.getEntityById("abc123");
    expect(res).toBe(entity);
  });
});
