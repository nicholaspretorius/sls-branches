import stripePackage from "stripe";
import "source-map-support/register";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { cors } from "middy/middlewares";
import { createLogger } from "../../libs/logger";
import { calculateCost } from "../../libs/billing";

const middy = require("middy");

const logger = createLogger("billing:");

export const main = middy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const { storage, source } = JSON.parse(event.body);
  const amount = calculateCost(storage);
  const description = "Scratch charge";

  // Load our secret key from the  environment variables
  const stripe = new stripePackage(process.env.STRIPE_SECRET_KEY, { apiVersion: "2020-03-02" });

  try {
    await stripe.charges.create({
      source,
      amount,
      description,
      currency: "usd"
    });
    return {
      statusCode: 200,
      body: JSON.stringify({
        status: true,
      }),
    };
  } catch (error) {
    logger.error("Error::billing: ", { error });
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "There was an error creating a charge" }),
    }
  }
});

main.use(
  cors({
    credentials: true,
    origin: "*",
  }),
);
