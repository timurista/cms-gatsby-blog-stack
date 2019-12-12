import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import cdk = require('@aws-cdk/core');
import BackendAggregator = require('../lib/backend-aggregator-stack');

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new BackendAggregator.BackendAggregatorStack(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});