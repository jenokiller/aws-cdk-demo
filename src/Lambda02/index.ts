import { APIGatewayProxyHandler } from 'aws-lambda';

export const handler: APIGatewayProxyHandler = async (event) => {
    const response = {
        statusCode: 200,
        body: JSON.stringify('Hello from Lambda02!'),
    };
    return response;
}