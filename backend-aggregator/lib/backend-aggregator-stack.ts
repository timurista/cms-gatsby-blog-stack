import cdk = require("@aws-cdk/core");
import lambda = require("@aws-cdk/aws-lambda");
import path = require("path");
import s3deploy = require("@aws-cdk/aws-s3-deployment");
import s3 = require("@aws-cdk/aws-s3");
import iam = require("@aws-cdk/aws-iam");
import cloudfront = require("@aws-cdk/aws-cloudfront");

export class BackendAggregatorStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // bucket to handle
    const bucket = new s3.Bucket(this, "Destination", {
      versioned: false,
      bucketName: "tim-urista-web-blog-articles-distribution-v1",
      publicReadAccess: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY
    });

    const s3ReadWritePolicy = new iam.PolicyStatement({
      effect: iam.Effect.ALLOW,
      actions: ["s3:*"],
      resources: [bucket.bucketArn + "/*"]
    });

    const distribution = new cloudfront.CloudFrontWebDistribution(
      this,
      "CFBlogArticlesDistribution",
      {
        originConfigs: [
          {
            s3OriginSource: {
              s3BucketSource: bucket
            },
            behaviors: [{ isDefaultBehavior: true }]
          }
        ]
      }
    );

    // new s3deploy.BucketDeployment(this, "DeployWithInvalidation", {
    //   sources: [s3deploy.Source.asset("./blogs")],
    //   destinationBucket: bucket,
    //   distribution,
    //   distributionPaths: ["/blogs/*.json"]
    // });

    const lambdaFn = new lambda.Function(this, "feedAggregator", {
      runtime: lambda.Runtime.NODEJS_10_X,
      handler: "lambda-handler.handler",
      code: new lambda.AssetCode(path.join(__dirname, "src")),
      environment: {
        S3_BUCKET: bucket.bucketName,
        CF_DISTRIBUTION_ID: distribution.distributionId
      }
    });

    bucket.grantReadWrite(lambdaFn);
    lambdaFn.addToRolePolicy(s3ReadWritePolicy);

    // The code that defines your stack goes here
  }
}
