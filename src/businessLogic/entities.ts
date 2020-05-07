import * as uuid from "uuid";
import EntityAccess from "../dataLayer/entitiesAccess";
import { Entity } from "../models/entities/Entity";

// async function createEntity(entity: EntityCreateRequest, userId: string): Promise<Entity> {
//   const entityId = uuid.v4();

//   return entitiesAccess.createEntity({
//     entityId,
//     userId,
//     createdAt: new Date().toISOString(),
//     updatedAt: new Date().toISOString(),
//     name: entity.name,
//     country: entity.country,
//     contacts: entity.contacts,
//   });
// }
// const entitiesAccess = new EntityAccess();

const entityClient = {
  create: async (userId: string, entity): Promise<Entity> => {
    const {
      name,
      parentId,
      country,
      contacts,
      channels,
      website,
      location,
      address,
      attachment,
    } = entity;
    const entityId = uuid.v4();
    const entitiesAccess = new EntityAccess();

    return entitiesAccess.createEntity({
      entityId,
      userId,
      parentId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      name,
      country,
      contacts,
      channels,
      website,
      location,
      address,
      attachment,
    });
  },
  getList: async (userId: string): Promise<AWS.DynamoDB.ItemList> => {
    const entitiesAccess = new EntityAccess();

    return entitiesAccess.getEntities(userId);
  },
  get: async (userId: string, entityId: string): Promise<Entity> => {
    const entitiesAccess = new EntityAccess();

    return entitiesAccess.getEntityById(userId, entityId);
  },
  delete: async (userId: string, entityId: string): Promise<AWS.DynamoDB.DocumentClient.DeleteItemOutput> => {
    const entitiesAccess = new EntityAccess();

    return entitiesAccess.deleteEntityById(userId, entityId);
  },
  update: async (userId: string, entityId: string, data): Promise<AWS.DynamoDB.DocumentClient.UpdateItemOutput> => {
    const entitiesAccess = new EntityAccess();

    return entitiesAccess.updateEntityById(userId, entityId, data);
  },
};

export default entityClient;
