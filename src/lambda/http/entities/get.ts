import "source-map-support/register";
import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
const middy = require("middy");
import { cors } from "middy/middlewares";

import { createLogger } from "../../../libs/logger";
import entityClient from "../../../businessLogic/entities";

const logger = createLogger("entities: get");

export const main = middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const { entityId } = event.pathParameters;
  // console.log(":entityId ", entityId);
  try {
    const entity = await entityClient.get(entityId);
    logger.info("Entity: get", entity);

    return {
      statusCode: 200,
      body: JSON.stringify(entity),
    };
  } catch (error) {
    // console.log("Error: ", error);
    logger.error("Error::get: ", { error });
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "There was an error retrieving the entity" }),
    };
  }
});

main.use(
  cors({
    credentials: true,
    origin: "*"
  })
);
