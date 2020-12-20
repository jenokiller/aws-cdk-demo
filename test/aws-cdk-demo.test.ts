import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import {APILambda} from "../lib/aws-cdk-demo-stack";

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new APILambda(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});
