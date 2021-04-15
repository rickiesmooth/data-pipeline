# Data-pipeline
Contains cloudformation stack to deploy an API gateway with a Lambda, that puts events to Amazon Kinesis Data Firehose to stream data into an S3 bucket which can be queried with Athena or another BI tool.

![](https://d2908q01vomqb2.cloudfront.net/b6692ea5df920cad691c20319a6fffd7a4a766b8/2021/03/10/bdb808-serverless-tracking-pixel-1.jpg)

## Getting started
`cd analytics-lambda && yarn run build`

`yarn run deploy`