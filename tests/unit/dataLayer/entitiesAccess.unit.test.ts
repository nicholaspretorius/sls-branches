import * as uuid from "uuid";
import * as AWSMock from "aws-sdk-mock";
import * as AWS from "aws-sdk";
// import { DocumentClient } from "aws-sdk/clients/dynamodb";

import { entity } from "../../mocks/entities/entity";

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
    };

    console.log("Mock: ", mockedEntity);

    const params = {
      TableName: "ncp-branches-entities-dev",
      Item: mockedEntity,
      ReturnValues: "ALL_NEW",
    };

    AWSMock.mock('DynamoDB.DocumentClient', 'put', function (params, callback) {
      // callback(null, {Item: {Key: 'Value'}});
      console.log("Params: ", params);
      callback(null, { Item: mockedEntity });
    });

    // AWSMock.mock('DynamoDB', 'DocumentClient', (params: GetItemInput, callback: Function) => {
    //   console.log('DynamoDB', 'getItem', 'mock called');
    //   callback(null, {pk: "foo", sk: "bar"});
    // })

    // let input:GetItemInput = { TableName: '', Key: {} };
    // const dynamodb = new AWS.DynamoDB({apiVersion: '2012-08-10'});
    // expect(await dynamodb.getItem(input).promise()).toStrictEqual( { pk: 'foo', sk: 'bar' });
    const dynamodb = new AWS.DynamoDB.DocumentClient();
    const res = await dynamodb.put(params).promise();
    console.log("Res: ", res);
    expect(res["Item"]).toBe(mockedEntity);

    AWSMock.restore('DynamoDB.DocumentClient');
  });
});