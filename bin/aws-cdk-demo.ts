#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { APILambda } from '../lib/aws-cdk-demo-stack';

const app: cdk.App = new cdk.App();
new APILambda(app, 'APILambda');
