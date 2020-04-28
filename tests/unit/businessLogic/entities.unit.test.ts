import * as uuid from "uuid";
import entityClient from "../../../src/businessLogic/entities";
import EntityAccess from "../../../src/dataLayer/entitiesAccess";
import { entity } from "../../mocks/entities/entity";
import { Entity } from "../../../src/models/entities/Entity";

jest.mock("../../../src/dataLayer/entitiesAccess");

const mockedEntityAccess = EntityAccess as jest.Mock;

describe("unit: businessLogic:entities", () => {
  it("should return an entity", async () => {
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
});
