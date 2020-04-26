import * as AWS from "aws-sdk";
import { DocumentClient } from "aws-sdk/clients/dynamodb";

import { Entity } from "../models/entities/Entity";

function createDynamoDBClient(): DocumentClient {
  return new AWS.DynamoDB.DocumentClient();
}

export class EntityAccess {
  constructor(
    private readonly docClient: DocumentClient = createDynamoDBClient(),
    private readonly entitiesTable = process.env.ENTITIES_TABLE,
  ) { }

  async createEntity(entity: Entity): Promise<Entity> {
    const res = await this.docClient.put({
      TableName: this.entitiesTable,
      Item: entity,
      ReturnValues: "ALL_NEW"
    }).promise();

    return res.Attributes as Entity;
  }
}
