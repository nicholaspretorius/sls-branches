import * as uuid from "uuid";
import EntityAccess from "../dataLayer/entitiesAccess";
import { Entity, EntityCreateRequest } from "../models/entities/Entity";

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
  create: async (entity, userId: string): Promise<Entity> => {
    const {
      name,
      country,
      contacts,
      attachment,
    } = entity;
    const entityId = uuid.v4();
    const entitiesAccess = new EntityAccess();

    return entitiesAccess.createEntity({
      entityId,
      userId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      name,
      country,
      contacts,
      attachment,
    });
  },
  getList: async () => {
    const entitiesAccess = new EntityAccess();

    return entitiesAccess.getEntities();
  },
  get: async (entityId: string) => {
    const entitiesAccess = new EntityAccess();

    return entitiesAccess.getEntityById(entityId);
  },
  delete: async (entityId: string) => {
    const entitiesAccess = new EntityAccess();

    return entitiesAccess.deleteEntityById(entityId);
  },
  update: async (entityId: string, data) => {
    const entitiesAccess = new EntityAccess();

    return entitiesAccess.updateEntityById(entityId, data);
  },
};

export default entityClient;
