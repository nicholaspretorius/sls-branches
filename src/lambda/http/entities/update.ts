import "source-map-support/register";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { cors } from "middy/middlewares";
import { createLogger } from "../../../libs/logger";
import entityClient from "../../../businessLogic/entities";

const middy = require("middy");

const logger = createLogger("entities: update");

export const main = middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const { entityId } = event.pathParameters;
  const userId = event.requestContext.identity.cognitoIdentityId;
  const data = JSON.parse(event.body);

  try {
    const updateEntity = await entityClient.update(userId, entityId, data);
    logger.info("Res: update: ", { entity: updateEntity });

    return {
      statusCode: 200,
      body: JSON.stringify(updateEntity),
    };
  } catch (error) {
    // console.log("Error: ", error);
    logger.error("Error::update: ", { error });

    return {
      statusCode: 400,
      body: JSON.stringify({ message: "There was an error updating the entity" }),
    };
  }
});

main.use(
  cors({
    credentials: true,
    origin: "*",
  }),
);
