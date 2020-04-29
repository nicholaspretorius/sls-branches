import "source-map-support/register";
import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

import entityClient from "../../../businessLogic/entities";

export const main: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const { entityId } = event.pathParameters;
  const data = JSON.parse(event.body);
  console.log("UPDATE params: ", entityId, data);
  try {
    const updateEntity = await entityClient.update(entityId, data);
    console.log("Updated: ", updateEntity);
    return {
      statusCode: 200,
      body: JSON.stringify(updateEntity),
    }
  } catch (error) {
    // console.log("Error: ", error);
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "There was an error updating the entity" }),
    }
  }
};
