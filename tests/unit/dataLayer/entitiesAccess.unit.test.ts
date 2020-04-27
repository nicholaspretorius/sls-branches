import * as uuid from "uuid";
import * as AWSMock from "aws-sdk-mock";
import * as AWS from "aws-sdk";
// import { DocumentClient } from "aws-sdk/clients/dynamodb";

import { entity } from "../../mocks/entities/entity";
import { Entity } from "../../../src/models/entities/Entity";
import EntityAccess from "../../../src/dataLayer/entitiesAccess";


describe("unit: dataLayer:entitiesAccess", () => {
  it("should create entity in DynamoDB", async () => {
    AWSMock.setSDKInstance(AWS);

    const entityId = uuid.v4();
    const mockedEntity = {
      entityId,
      userId: entity.userId,
      name: entity.name,
      country: entity.country,
      contacts: entity.contacts
    } as Entity;

    console.log("Mock: ", mockedEntity);

    // const params = {
    //   TableName: "ncp-branches-entities-dev",
    //   Item: mockedEntity,
    //   ReturnValues: "ALL_NEW",
    // };

    AWSMock.mock('DynamoDB.DocumentClient', 'put', function (params, callback) {
      console.log("Params: ", params);
      callback(null, { Item: mockedEntity });
    });

    const dynamodb = new AWS.DynamoDB.DocumentClient();
    // const res = await dynamodb.put(params).promise();
    // console.log("Res: ", res);
    // expect(res["Item"]).toBe(mockedEntity);

    const entitiesAccess = new EntityAccess(dynamodb, "ncp-branches-entities-dev");
    // console.log("createEntity", entitiesAccess.createEntity(mockedEntity).then(data => console.log(data)));
    const res = await entitiesAccess.createEntity(mockedEntity);
    // console.log("Res: ", res);
    // expect(res).toBe(mockedEntity);
    expect(res).toBeUndefined();
    AWSMock.restore('DynamoDB.DocumentClient');
  });
});