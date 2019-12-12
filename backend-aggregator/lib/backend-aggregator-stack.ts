import cdk = require("@aws-cdk/core");
import lambda = require("@aws-cdk/aws-lambda");
import path = require("path");

export class BackendAggregatorStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const fn = new lambda.Function(this, "feedAggregator", {
      runtime: lambda.Runtime.NODEJS_10_X,
      handler: "lambda-handler.handler",
      code: new lambda.AssetCode(path.join(__dirname, "src"))
    });

    // The code that defines your stack goes here
  }
}
