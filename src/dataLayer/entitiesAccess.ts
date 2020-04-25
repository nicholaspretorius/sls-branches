import * as AWS from "aws-sdk";
import { DocumentClient } from "aws-sdk/clients/dynamodb";

import { Entity } from "./../models/entities/Entity";

export class EntityAccess {

    constructor(
        private readonly docClient: DocumentClient = createDynamoDBClient(),
        private readonly entitiesTable = process.env.ENTITIES_TABLE,
    ) { }

    async createEntity(entity: Entity): Promise<Entity> {

        await this.docClient.put({
            TableName: this.entitiesTable,
            Item: entity
        }).promise();

        return entity;
    }
}

function createDynamoDBClient() {
    return new AWS.DynamoDB.DocumentClient();
}