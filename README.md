# Branchly API 

The "Branchly" service enables users to store organisational details. The intention is that, ultimately, company owners will be able to store their outlet/branch details in this service and manage/distribute them online as needed. As of this version, this project intends to satisfy the [rubric](https://review.udacity.com/#!/rubrics/2578/view) for the Cloud Developer Nanodegree capstone project, and represents only the *foundational* building blocks on which to build future features. 

As it stands, the feature set is small and very limited, but represents a base from which to build in future. 

## Reviewer Note

Thank you for reviewing my project. I chose the "Serverless" approach to this capstone since I made extensive use of Docker containers in my previous capstone project for the Udacity Fullstack Developer Nanodegree and spent a lot of time using Docker and Kubernetes in previous projects in this course. 

## Background

The intention of this capstone project was to employ different aspects of development that I have learned - namely, the learning goals were:

### API Learning Goals

The learning goals for the API were:

1. Use Serverless framework with Node.js and TypeScript running on AWS Lambda, DynamoDB and API Gateway. 
2. Code is written in TypeScript to benefit from type checking (types are not currently fully implemented, though over time this will improve).
3. Unit and integration tests exist to ensure functionality works as expected and provides a level of confidence for future development and refactoring. 
4. CloudWatch is used via Winston for logging and debugging purposes. 
5. X-Ray tracing is implemented to assist with getting an overview of the system and how it is used. 

### Client Learning Goals

The learning goals for the client application were to: 

1. Use React for the client (and learn about Hooks which I have not used before - Hooks is not part of the Udacity React Developer curricullum). 
2. Code is written in TypeScript to benefit from type checking (types are not currently fully implemented, though over time this will improve).
3. Unit and end-to-end (e2e) tests exist to ensure functionality works as expected and provides a level of confidence for future development and refactoring. 
4. Sentry is used for error logging and management. 

## Repositories

The Branchly API and frontend React client are housed in separate repositories on GitHub. I decided that keeping them separate would be more suitable to my needs at this point - especially since the API and client run on separate cloud providers. Additionally, while both repos currently use Travis CI for the build pipeline, I wanted to keep the option of switching build tools in future open. Conceptually, for myself at least, it felt cleaner and simpler to keep them wholly separate and not needing to consider possible overlaps or complexities arising from using a monorepo. 

## GitHub

### API 

1. Clone the repo from [GitHub](https://github.com/nicholaspretorius/sls-branches.git) then cd into the project root. 
2. Run: `npm install`
3. Run: `npm offline start`

### Frontend Client

Please take a look at the [README](https://github.com/nicholaspretorius/sls-branches-client) file for the frontend client specific details. 

1. Clone the repo from [GitHub](https://github.com/nicholaspretorius/sls-branches-client) then cd into the project root. 
2. Run" `npm install`
3. To run locally, run: `npm run dev` (Note that the client runs on PORT 3001 - the API runs on 3000)

Please Note: `npm start` is used in the deployment process after the build step.

## Running the API

### Run a specific function

To run a specific function locally, run: `sls invoke local -f ping`
To run a specific function online, run: `sls invoke -f ping`

### Run offline

To run the entire API locally/offline, run: `sls offline start`

You can see the available endpoints at: [http://localhost:3000](http://localhost:3000)

You can specify an alternate port by running: `sls offline start --httpPort 4000`

## Tests

Tests are run via Jest, there are both unit and integration tests. 

### Linting

Linting is performed by ES Lint and can be run via: `npm run lint`

### Unit Tests

* You can run unit tests via: `npm run test:unit`

### Integration Tests

To run integration tests: 

* You first need to run the API locally via: `sls offline start`
* You then run integration tests via: `npm run test:int`

If the local server is running, you can run both unit and integrations tests with coverage via: `npm test`

Details:

* Unit tests are located in the "tests/unit" folder. 
* Integration tests are located in the "tests/integration" folder and make use of Supertest. 

## CI/CD

There is a CI/CD pipeline setup, development is done via a "dev" branch, which is linked to the "dev" stage. When a feature is ready, the code is committed to GitHub on the "dev" branch. This will kick-off a build on Travis CI which will run the linting, the unit tests and the integration tests. If all linting and testing passes, then Travic CI will deploy the API to AWS Lambda. 

### Travis CI

The "dev" branch is available for deployment. 

1. Once feature is ready, push code to GitHub
2. Travis CI will kick-off build and run linting and tests. 
3. If all pass, Travis CI deploys API to AWS Lambda. 
4. If any stage fails, Travis CI does not deploy. 

The "master" branch is available for deployment, but currently is not active. 

## Deployment

If necessary, you can deploy the app directly to the "dev" stage via: `sls deploy` or `sls deploy -v` (which givers you verbose output).

### API

The API is available online at: 

* [https://eolgsqft2g.execute-api.eu-west-1.amazonaws.com/dev/](https://eolgsqft2g.execute-api.eu-west-1.amazonaws.com/dev/)

To sanity check, you can visit the [/ping](https://eolgsqft2g.execute-api.eu-west-1.amazonaws.com/dev/ping) to check whether it is online. 

### Authorisation

The app and API endpoints are secured with AWS Cognito. You can sign-up and register from the frontend, this is hosted on Heroku.

### Client

You can visit the client at: [https://branches-client.herokuapp.com/](https://branches-client.herokuapp.com/)

Please note: The client is hosted on the lowest, free tier on Heroku, as such, chances are good the client will need to "cold start" and will take a few moments to load. 

## Housekeeping

When figuring out the testing workflow between `sls offline start` and running tests, it could be that you end up with a *still-running* `sls offline` task you need to kill. In order to do so, run the following to find the PID (Process ID) for the task running on port 3000 and then kill it: 

* `lsof -i :3000`
* `kill -9 15188`

### Stripe

You can test the billing API with `invoke local` or `invoke` as follows: 

* `serverless invoke local --function billing --path tests/mocks/billingEvent.json`
* `serverless invoke --function billing --path tests/mocks/billingEvent.json`
