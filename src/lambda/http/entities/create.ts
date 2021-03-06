import "source-map-support/register";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { cors } from "middy/middlewares";
import { createLogger } from "../../../libs/logger";
import entityClient from "../../../businessLogic/entities";

const middy = require("middy");

const logger = createLogger("entities: getList");

export const main = middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const newEntity = JSON.parse(event.body);
  const userId = event.requestContext.identity.cognitoIdentityId;
  // console.log(userId, newEntity, typeof newEntity);

  try {
    const entity = await entityClient.create(userId, newEntity);
    logger.info("Res: ", { entity });
    // console.log("POST /entities Res: ", entity);
    // TODO: return created item in response.
    return {
      statusCode: 201,
      body: JSON.stringify(entity),
    };
  } catch (error) {
    // console.log("Error: ", error);
    logger.error("Error::create: ", { error });
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "There was an error creating the entity" }),
    };
  }
});

main.use(
  cors({
    credentials: true,
    origin: "*",
  }),
);
