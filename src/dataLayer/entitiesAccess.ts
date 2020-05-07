import * as AWS from "aws-sdk";
import { DocumentClient, ItemList } from "aws-sdk/clients/dynamodb";

import { Entity } from "../models/entities/Entity";
import { createLogger } from "../libs/logger";

const logger = createLogger("entitiesAccess:");

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
    logger.info("createEntity: ", { params, res });
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
    logger.info("getEntities: ", { params, res });
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
    logger.info("getEntityById: ", { params, res });
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
    logger.info("deleteEntityById: ", { params, res });
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
      UpdateExpression: "SET #entityName = :name, attachment = :attachment, country = :country, contacts = :contacts, #loc = :location, channels = :channels, website = :website, address = :address",
      ExpressionAttributeValues: {
        ":name": data.name,
        ":contacts": data.contacts,
        ":country": data.country,
        ":location": data.location,
        ":channels": data.channels,
        ":website": data.website,
        ":address": data.address,
        ":attachment": data.attachment,
      },
      ExpressionAttributeNames: {
        "#entityName": "name",
        "#loc": "location"
      },
      ReturnValues: "ALL_NEW",
    };

    const res = await this.docClient.update(params).promise();
    logger.info("updateEntityById: ", { params, res });
    return res.Attributes;
  }
}
