import * as uuid from "uuid";
import * as AWSMock from "aws-sdk-mock";
// import * as AWS from "aws-sdk";
// import { PutItemInput, GetItemInput } from "aws-sdk/clients/dynamodb";

import {
  entity,
  getEntities,
  updateEntity,
} from "../../mocks/entities/entity";
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

  it("should delete entity by id from DynamoDB", async () => {
    const entityId = "66bfef74-a64a-4681-9328-410752338a0e";
    const mockRes = {
      entityId,
    };

    AWSMock.mock("DynamoDB.DocumentClient", "delete", Promise.resolve(mockRes));
    const entitiesAccess = new EntityAccess();
    const res = await entitiesAccess.deleteEntityById(entityId);
    expect(res).toBeDefined();
  });

  it("should update entity by id", async () => {
    const entityId = "66bfef74-a64a-4681-9328-410752338a0e";
    const mockRes = {
      Attributes: updateEntity,
    };

    // console.log("mockRes: ", mockRes);

    AWSMock.mock("DynamoDB.DocumentClient", "update", Promise.resolve(mockRes));
    const entitiesAccess = new EntityAccess();
    const res = await entitiesAccess.updateEntityById(entityId, updateEntity);
    // console.log("Res: ", res);
    expect(res).toBeDefined();
    // TODO: Fix below... why is res.Attributes not on mock res?
    expect(res).toBe(updateEntity);
  });
});
