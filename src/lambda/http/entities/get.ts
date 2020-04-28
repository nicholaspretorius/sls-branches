import "source-map-support/register";

import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

import entityClient from "../../../businessLogic/entities";

export const main: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const { entityId } = event.pathParameters;
  // console.log(":entityId ", entityId);
  try {
    const entity = await entityClient.get(entityId);

    return {
      statusCode: 200,
      body: JSON.stringify(entity),
    };
  } catch (error) {
    // console.log("Error: ", error);

    return {
      statusCode: 400,
      body: JSON.stringify({ message: "There was an error retrieving the entity" }),
    };
  }
};
