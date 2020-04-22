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

