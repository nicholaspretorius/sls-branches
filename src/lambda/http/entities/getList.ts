import "source-map-support/register";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { cors } from "middy/middlewares";
import entityClient from "../../../businessLogic/entities";
import { createLogger } from "../../../libs/logger";

const middy = require("middy");

const logger = createLogger("entities: getList");

export const main = middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const entities = await entityClient.getList();
    logger.info("Res: ", { entities });
    return {
      statusCode: 200,
      body: JSON.stringify(entities),
    };
  } catch (error) {
    // console.log("Error: ", error);
    logger.info("Res: ", { error });

    return {
      statusCode: 400,
      body: JSON.stringify({ message: "There was an error retrieving entities" }),
    };
  }
});

main.use(
  cors({
    credentials: true,
    origin: "*",
  }),
);
