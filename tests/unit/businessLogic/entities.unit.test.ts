import * as uuid from "uuid";
import entityClient from "../../../src/businessLogic/entities";
import EntityAccess from "../../../src/dataLayer/entitiesAccess";
import { entity, getEntity, getEntities } from "../../mocks/entities/entity";
import { Entity } from "../../../src/models/entities/Entity";

jest.mock("../../../src/dataLayer/entitiesAccess");

const mockedEntityAccess = EntityAccess as jest.Mock;

describe("unit: businessLogic:entities", () => {
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
      createEntity: () => mockedEntity as Entity,
    }));

    const { name, country, contacts } = entity;
    const res = await entityClient.create({ name, country, contacts }, "abc123");

    expect(res).toStrictEqual(mockedEntity);
    expect(mockedEntityAccess).toHaveBeenCalledTimes(1);
  });

  it("should return existing entities", async () => {
    mockedEntityAccess.mockImplementation(() => ({
      getEntities: () => getEntities,
    }));

    const res = await entityClient.getList();
    expect(res).toStrictEqual(getEntities);
    expect(mockedEntityAccess).toHaveBeenCalledTimes(2);
  });

  it("should return an entity by id", async () => {
    const entityId = "66bfef74-a64a-4681-9328-410752338a0e"; // mock

    mockedEntityAccess.mockImplementation(() => ({
      getEntityById: () => getEntity,
    }));

    const res = await entityClient.get(entityId);
    expect(res).toStrictEqual(getEntity);
    expect(mockedEntityAccess).toHaveBeenCalledTimes(3);
  });
});
