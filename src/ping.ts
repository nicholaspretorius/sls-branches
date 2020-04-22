import { APIGatewayProxyHandler } from "aws-lambda";
import "source-map-support/register";

export const main: APIGatewayProxyHandler = async () => ({
  statusCode: 200,
  body: JSON.stringify(
    {
      message: getGreeting(),
      // input: event,
    },
  ),
});

export function getGreeting() {
  return "Hello world!"
}
