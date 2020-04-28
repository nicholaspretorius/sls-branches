import "source-map-support/register";

import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

import entityClient from "../../../businessLogic/entities";

export const main: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const entities = await entityClient.getList();

    return {
      statusCode: 200,
      body: JSON.stringify(entities),
    };
  } catch (error) {
    // console.log("Error: ", error);

    return {
      statusCode: 400,
      body: JSON.stringify({ message: "There was an error retrieving entities" }),
    };
  }
};
