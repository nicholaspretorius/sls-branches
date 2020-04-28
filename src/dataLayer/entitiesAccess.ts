import * as AWS from "aws-sdk";
import { DocumentClient, ItemList } from "aws-sdk/clients/dynamodb";

import { Entity } from "../models/entities/Entity";

// export function createDynamoDBClient(): DocumentClient {
//   return new AWS.DynamoDB.DocumentClient();
// }

const ENTITIES = process.env.ENTITIES_TABLE;

export default class EntityAccess {
  constructor(
    private readonly entitiesTable = ENTITIES,
    private readonly docClient: DocumentClient = new AWS.DynamoDB.DocumentClient(),
  ) { }

  async createEntity(entity: Entity): Promise<Entity> {
    const params = {
      TableName: this.entitiesTable,
      Item: entity,
      ReturnValues: "ALL_NEW",
    };

    const res = await this.docClient.put(params).promise();

    return res.Attributes as Entity;
  }

  async getEntities(): Promise<ItemList> {
    const params = {
      TableName: ENTITIES,
      KeyConditionExpression: "userId = :userId",
      ExpressionAttributeValues: {
        ":userId": "abc123", // event.requestContext.identity.cognitoIdentityId
      },
    };

    const res = await this.docClient.query(params).promise();
    // console.log("Res: ", res);
    return res.Items;
  }
}
