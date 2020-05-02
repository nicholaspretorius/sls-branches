import "source-map-support/register";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { cors } from "middy/middlewares";
import { createLogger } from "../../../libs/logger";
import entityClient from "../../../businessLogic/entities";

const middy = require("middy");

const logger = createLogger("entities: delete");

export const main = middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const { entityId } = event.pathParameters;
  const userId = event.requestContext.identity.cognitoIdentityId;
  // console.log(":entityId ", entityId);
  try {
    const entity = await entityClient.delete(userId, entityId);
    logger.info("Entity: ", { entity });
    return {
      statusCode: 200,
      body: JSON.stringify(entity),
    };
  } catch (error) {
    // console.log("Error: ", error);
    logger.error("Error::delete: ", { error });
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "There was an error deleting the entity" }),
    };
  }
});

main.use(
  cors({
    credentials: true,
    origin: "*",
  }),
);
