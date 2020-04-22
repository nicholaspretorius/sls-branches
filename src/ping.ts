import { APIGatewayProxyHandler } from "aws-lambda";
import "source-map-support/register";

export function getGreeting(): string {
  return "Hello world!";
}

export const main: APIGatewayProxyHandler = async () => ({
  statusCode: 200,
  body: JSON.stringify(
    {
      message: getGreeting(),
      // input: event,
    },
  ),
});
