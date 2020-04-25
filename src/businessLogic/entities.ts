import * as uuid from "uuid";
import { EntityAccess } from './../dataLayer/entitiesAccess';
import { Entity, EntityCreateRequest } from "./../models/entities/Entity";

const entitiesAccess = new EntityAccess();

export async function createEntity(entity: EntityCreateRequest, userId: string): Promise<Entity> {

    const entityId = uuid.v4();

    return await entitiesAccess.createEntity({
        entityId,
        userId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        name: entity.name,
        country: entity.country,
        contacts: entity.contacts
    });
}

