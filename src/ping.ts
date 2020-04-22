import { APIGatewayProxyHandler } from "aws-lambda";
import "source-map-support/register";

export const main: APIGatewayProxyHandler = async (event) => ({
  statusCode: 200,
  body: JSON.stringify(
    {
      message: "Hello world!",
      input: event,
    },
  ),
});
