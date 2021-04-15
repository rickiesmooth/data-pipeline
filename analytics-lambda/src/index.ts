import { APIGatewayProxyEvent } from 'aws-lambda'
import {
  FirehoseClient,
  PutRecordCommand,
} from '@aws-sdk/client-firehose'

// a client can be shared by different commands.
const client = new FirehoseClient({ region: "eu-central-1" });

export const handler = async function (event: APIGatewayProxyEvent) {
  try {
    const payload = {
      date: event["requestContext"]["requestTime"],
      ip: event["headers"]["x-forwarded-for"],
      userAgent: event["headers"]["user-agent"],
    };

    const params = {
      DeliveryStreamName: process.env.KINESIS_FIREHOSE_STREAM_NAME,
      Record: { Data: Buffer.from(JSON.stringify(payload)) },
    }
    
   await client.send(new PutRecordCommand(params))
  } catch (error) {
    // Catch all exceptions, we don't want the analytical part affects the business process so they are only printed in the logs
    console.log("Unexpected error:", error)
  }
}


