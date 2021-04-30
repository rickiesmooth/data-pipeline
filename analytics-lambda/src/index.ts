import { APIGatewayProxyEvent } from "aws-lambda";
import { FirehoseClient, PutRecordCommand } from "@aws-sdk/client-firehose";

// a client can be shared by different commands.
const client = new FirehoseClient({ region: "us-east-1" });

export const handler = async function (event: APIGatewayProxyEvent) {
  try {
    const payload = {
      date: event["requestContext"]["requestTimeEpoch"],
      ip: event["requestContext"]["identity"]["sourceIp"],
      userAgent: event["headers"]["User-Agent"],
      country: event["headers"]["CloudFront-Viewer-Country"],
    };

    console.log("payload:", payload);
    // this relates to AWS::KinesisFirehose::DeliveryStream DeliveryStreamName
    const DeliveryStreamName = "AnalyticsDeliveryStream";
    const Record = { Data: Buffer.from(JSON.stringify(payload)) };

    await client.send(new PutRecordCommand({ DeliveryStreamName, Record }));

    return { statusCode: 200, headers: { "Access-Control-Allow-Origin": "*" } };

  } catch (error) {
    // Catch all exceptions, we don't want the analytical part affects the business process so they are only printed in the logs
    console.log("Unexpected error:", error);
  }
};
