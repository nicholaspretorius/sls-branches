import "source-map-support/register";

import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

// import { EntityCreateRequest } from "../../../models/entities/Entity";
import entityClient from "../../../businessLogic/entities";

export const main: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const newEntity = JSON.parse(event.body);
  const userId = "abc123";
  // console.log(userId, newEntity, typeof newEntity);

  try {
    const entity = await entityClient.create(newEntity, userId);
    // console.log("POST /entities Res: ", entity);
    // TODO: return created item in response.
    return {
      statusCode: 201,
      body: JSON.stringify(entity),
    };
  } catch (error) {
    // console.log("Error: ", error);

    return {
      statusCode: 400,
      body: JSON.stringify({ message: "There was an error creating the entity" }),
    };
  }
};
