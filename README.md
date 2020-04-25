# Serverless with TypeScript

## Git

1. Clone the repo from [GitHub]() then cd into the project root. 
2. `npm i`

## Running the API

### Run a specific function

To run a specific function, run: `sls invoke local -f ping`

### Run offline

To run the entire API locally/offline, run: `sls offline start`

You can see the available endpoints at: [http://localhost:3000](http://localhost:3000)

You can specify an alternate port by running: `sls offline start --httpPort 4000`

### Run DynamoDB Locally

* `serverless plugin install --name serverless-dynamodb-local`
* `sls dynamodb install`
* `sls dynamodb start --migrate --stage dev`
* `sls dynamodb migrate --stage dev`

## Tests

1. Tests are run via Jest, you can run the tests, both unit and integration through: `npm test`
2. To see test coverage, you can run tests with coverage bia: `npm run test:cov`
3. You can leverage Serverless framework's own integration testing via: `sls test`

Details:

* Unit tests are located in the "tests/unit" folder. 
* Integration tests are located in the "tests/integration" folder and make use of Supertest. 
* Further "integration" tests are also available in the filer "serverless.test.yml" which leverages Serverless Framework's integration testing capability. 

## Linting

Linting is performed by ES Lint and can be run via: `npm run lint`

## Deployment

You can deploy the app to the "dev" stage via: `sls deploy` or `sls deploy -v` (which givers you verbose output)

## Housekeeping

When figuring out the testing workflow between `sls offline start` and running tests, it could be that you end up with a *still-running* `sls offline` task you need to kill. In order to do so, run the following to find the PID (Process ID) for the task running on port 3000 and then kill it: 

* `lsof -i :3000`
* `kill -9 15188`

TODO: 

1. Setup CI/CD for API
