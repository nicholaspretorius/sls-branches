import * as uuid from "uuid";
import entityClient from "../../../src/businessLogic/entities";
import EntityAccess from "../../../src/dataLayer/entitiesAccess";
import {
  entity,
  getEntity,
  getEntities,
  updateEntity,
} from "../../mocks/entities/entity";
import { Entity } from "../../../src/models/entities/Entity";

jest.mock("../../../src/dataLayer/entitiesAccess");

const mockedEntityAccess = EntityAccess as jest.Mock;

describe("unit: businessLogic:entities", () => {
  const userId = "abc123";

  it("should create and return an entity", async () => {
    const entityId = uuid.v4();

    const mockedEntity = {
      entityId,
      userId: entity.userId,
      name: entity.name,
      country: entity.country,
      contacts: entity.contacts,
    } as Entity;

    mockedEntityAccess.mockImplementation(() => ({
      createEntity: (): Entity => mockedEntity as Entity,
    }));

    const { name, country, contacts } = entity;
    const res = await entityClient.create(userId, { name, country, contacts });

    expect(res).toStrictEqual(mockedEntity);
    expect(mockedEntityAccess).toHaveBeenCalledTimes(1);
  });

  it("should return existing entities", async () => {
    mockedEntityAccess.mockImplementation(() => ({
      getEntities: (): any => getEntities,
    }));

    const res = await entityClient.getList(userId);
    expect(res).toStrictEqual(getEntities);
    expect(mockedEntityAccess).toHaveBeenCalledTimes(2);
  });

  it("should return an entity by id", async () => {
    const entityId = "66bfef74-a64a-4681-9328-410752338a0e"; // mock

    mockedEntityAccess.mockImplementation(() => ({
      getEntityById: (): Entity => getEntity,
    }));

    const res = await entityClient.get(userId, entityId);
    expect(res).toStrictEqual(getEntity);
    expect(mockedEntityAccess).toHaveBeenCalledTimes(3);
  });

  it("should delete an entity by id", async () => {
    const entityId = "66bfef74-a64a-4681-9328-410752338a0e"; // mock

    mockedEntityAccess.mockImplementation(() => ({
      deleteEntityById: (): any => ({ entityId }),
    }));

    const res = await entityClient.delete(userId, entityId);
    expect(res).toStrictEqual({ entityId });
    expect(mockedEntityAccess).toHaveBeenCalledTimes(4);
  });

  it("should update an entity by id", async () => {
    const entityId = "66bfef74-a64a-4681-9328-410752338a0e"; // mock

    mockedEntityAccess.mockImplementation(() => ({
      updateEntityById: (): any => ({ Attributes: { ...updateEntity } }),
    }));

    const res = await entityClient.update(userId, entityId, updateEntity);
    expect(res.Attributes).toStrictEqual(updateEntity);
    expect(mockedEntityAccess).toHaveBeenCalledTimes(5);
  });
});
