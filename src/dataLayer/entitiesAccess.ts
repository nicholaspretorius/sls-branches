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
    // console.log("createEntity entity: ", entity);
    const params = {
      TableName: this.entitiesTable,
      Item: entity,
      ReturnValues: "ALL_OLD",
    };

    const res = await this.docClient.put(params).promise();
    // console.log("POST /entities Res: ", res);
    return res.Attributes as Entity;
  }

  async getEntities(userId: string): Promise<ItemList> {
    const params = {
      TableName: this.entitiesTable,
      KeyConditionExpression: "userId = :userId",
      ExpressionAttributeValues: {
        ":userId": userId,
      },
    };

    const res = await this.docClient.query(params).promise();
    // console.log("Res: ", res);
    return res.Items;
  }

  async getEntityById(userId: string, entityId: string): Promise<Entity> {
    const params = {
      TableName: this.entitiesTable,
      Key: {
        entityId,
        userId,
      },
    };

    const res = await this.docClient.get(params).promise();
    // console.log("Res for entityId ", entityId, " : ", res);
    return res.Item as Entity;
  }

  async deleteEntityById(userId: string, entityId: string): Promise<AWS.DynamoDB.DocumentClient.DeleteItemOutput> {
    const params = {
      TableName: this.entitiesTable,
      Key: {
        entityId,
        userId,
      },
      ReturnValues: "ALL_OLD",
    };

    const res = await this.docClient.delete(params).promise();
    console.log("DEL Res: ", res);
    return res;
  }

  async updateEntityById(userId: string, entityId: string, data): Promise<AWS.DynamoDB.DocumentClient.UpdateItemOutput> {
    // console.log("updateEntityById Params: ", entityId, data.name, data);
    const params = {
      TableName: this.entitiesTable,
      Key: {
        entityId,
        userId,
      },
      UpdateExpression: "SET #entityName = :name, attachment = :attachment",
      ExpressionAttributeValues: {
        ":name": data.name,
        ":attachment": data.attachment,
      },
      ExpressionAttributeNames: {
        "#entityName": "name",
      },
      ReturnValues: "ALL_NEW",
    };

    const res = await this.docClient.update(params).promise();
    // console.log("entityAcess.updateEntityById res: ", res);
    return res.Attributes;
  }
}
