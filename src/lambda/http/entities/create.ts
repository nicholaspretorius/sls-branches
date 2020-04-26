import "source-map-support/register";

import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

import { EntityCreateRequest } from "../../../models/entities/Entity";
import { createEntity } from "../../../businessLogic/entities";

export const main: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const newEntity: EntityCreateRequest = JSON.parse(JSON.stringify(event.body));
  const userId = "abc123";

  try {
    const entity = await createEntity(newEntity, userId);

    return {
      statusCode: 201,
      body: JSON.stringify(entity),
    };
  } catch (error) {
    console.error(error);

    return {
      statusCode: 400,
      body: JSON.stringify({ message: "There was an error creating the entity" }),
    };
  }
};
