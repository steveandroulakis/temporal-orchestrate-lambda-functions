# Deploy Lambda functions

This AWS Cloud Development Kit (CDK) code deploys the Lambdas in this example to your own AWS account.

This step is *optional*. Lambdas have already been deployed to the location inside .env_example in the root of this repository.

## Build

To build this app, you need to be in this example's root folder. Then run the following:

```bash
npm install -g aws-cdk
npm install
npm run build
```

This will install the necessary CDK, then this example's dependencies, then the lambda functions' dependencies, and then build your TypeScript files and your CloudFormation template.

## Deploy

Run `cdk deploy`. This will deploy / redeploy your Stack to your AWS Account.

After the deployment you will see the API's URL, which represents the url you can then use in your `.env.development` config file.

Example output:
```
OrchestrateLambdaFunctionsStack.stockApiEndpoint893DB24E = https://qugmumhvn8.execute-api.us-west-2.amazonaws.com/prod/
```