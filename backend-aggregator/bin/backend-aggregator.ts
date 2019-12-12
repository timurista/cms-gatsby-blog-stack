#!/usr/bin/env node
import 'source-map-support/register';
import cdk = require('@aws-cdk/core');
import { BackendAggregatorStack } from '../lib/backend-aggregator-stack';

const app = new cdk.App();
new BackendAggregatorStack(app, 'BackendAggregatorStack');
