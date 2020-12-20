import cdk = require("@aws-cdk/core")
import { Function, Runtime, Code } from "@aws-cdk/aws-lambda"
import { RestApi, Integration, LambdaIntegration, Resource,
    MockIntegration, PassthroughBehavior, EmptyModel } from "@aws-cdk/aws-apigateway"

export class APILambda extends cdk.Stack {
    constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        // Lambda Function 作成
        const lambda1Function: Function = new Function(this, "Lambda01", {
            functionName: "Lambda01", // 関数名
            runtime: Runtime.NODEJS_10_X, // ランタイムの指定
            code: Code.asset("src/Lambda01"), // ソースコードのディレクトリ
            handler: "index.handler", // handler の指定
            memorySize: 256, // メモリーの指定
            timeout: cdk.Duration.seconds(10), // タイムアウト時間
            environment: {} // 環境変数
        });

        const lambda2Function: Function = new Function(this, "Lambda02", {
            functionName: "Lambda02", // 関数名
            runtime: Runtime.NODEJS_10_X, // ランタイムの指定
            code: Code.asset("src/Lambda02"), // ソースコードのディレクトリ
            handler: "index.handler", // handler の指定
            memorySize: 256, // メモリーの指定
            timeout: cdk.Duration.seconds(10), // タイムアウト時間
            environment: {} // 環境変数
        });

        // API Gateway 作成
        const restApi: RestApi = new RestApi(this, "DemoAPIGateway", {
            restApiName: "DemoAPIGateway", // API名
            description: "Deployed by CDK" // 説明
        });

        // Integration 作成
        const integration1: Integration = new LambdaIntegration(lambda1Function);
        const integration2: Integration = new LambdaIntegration(lambda2Function);

        // リソースの作成
        const getResourse1: Resource = restApi.root.addResource("lambda01");
        const getResourse2: Resource = restApi.root.addResource("lambda02");

        // メソッドの作成
        getResourse1.addMethod("GET", integration1);
        getResourse2.addMethod("GET", integration2);

        // CORS対策でOPTIONSメソッドを作成
        getResourse1.addMethod("OPTIONS", new MockIntegration({
            integrationResponses: [{
                statusCode: "200",
                responseParameters: {
                    "method.response.header.Access-Control-Allow-Headers":
                        "'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,X-Amz-User-Agent'",
                    "method.response.header.Access-Control-Allow-Origin": "'*'",
                    "method.response.header.Access-Control-Allow-Credentials": "'false'",
                    "method.response.header.Access-Control-Allow-Methods": "'OPTIONS,GET,PUT,POST,DELETE'",
                }
            }],
            passthroughBehavior: PassthroughBehavior.NEVER,
            requestTemplates: {
                "application/json": "{\"statusCode\": 200}"
            }
        }), {
            methodResponses: [{
                statusCode: "200",
                responseParameters: {
                    "method.response.header.Access-Control-Allow-Headers": true,
                    "method.response.header.Access-Control-Allow-Origin": true,
                    "method.response.header.Access-Control-Allow-Credentials": true,
                    "method.response.header.Access-Control-Allow-Methods": true,
                },
                responseModels: {
                    "application/json": new EmptyModel()
                },
            }]
        })


        getResourse2.addMethod("OPTIONS", new MockIntegration({
            integrationResponses: [{
                statusCode: "200",
                responseParameters: {
                    "method.response.header.Access-Control-Allow-Headers":
                        "'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,X-Amz-User-Agent'",
                    "method.response.header.Access-Control-Allow-Origin": "'*'",
                    "method.response.header.Access-Control-Allow-Credentials": "'false'",
                    "method.response.header.Access-Control-Allow-Methods": "'OPTIONS,GET,PUT,POST,DELETE'",
                }
            }],
            passthroughBehavior: PassthroughBehavior.NEVER,
            requestTemplates: {
                "application/json": "{\"statusCode\": 200}"
            }
        }), {
            methodResponses: [{
                statusCode: "200",
                responseParameters: {
                    "method.response.header.Access-Control-Allow-Headers": true,
                    "method.response.header.Access-Control-Allow-Origin": true,
                    "method.response.header.Access-Control-Allow-Credentials": true,
                    "method.response.header.Access-Control-Allow-Methods": true,
                },
                responseModels: {
                    "application/json": new EmptyModel()
                },
            }]
        })
    }
}