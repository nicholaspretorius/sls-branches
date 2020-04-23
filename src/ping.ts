import { APIGatewayProxyHandler, APIGatewayProxyResult } from "aws-lambda";
import "source-map-support/register";

export function getGreeting(): string {
  return "Hello world!";
}

export const main: APIGatewayProxyHandler = async (): Promise<APIGatewayProxyResult> => (
  Promise.resolve({
    statusCode: 200,
    body: JSON.stringify(
      {
        message: getGreeting(),
        // input: event,
      },
    ),
  })
);
