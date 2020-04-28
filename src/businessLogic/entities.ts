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

const entityClient = {
  create: async (entity: EntityCreateRequest, userId: string): Promise<Entity> => {
    const entityId = uuid.v4();

    const entitiesAccess = new EntityAccess();

    return entitiesAccess.createEntity({
      entityId,
      userId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      name: entity.name,
      country: entity.country,
      contacts: entity.contacts,
    });
  },
};

export default entityClient;
