const dynamodb = require("aws-sdk/clients/dynamodb");
const docClient = new dynamodb.DocumentClient();

const tableName = process.env.TABLE_NAME; // gets table name from env variable

module.exports.getOrder = async (event) => {
  const orderId = event.pathParameters.orderId; // gets order ID from url

  // Config Object for DynamoDB
  let params = {
    TableName: tableName,
    ExpressionAttributeValues: {
      ":PK": orderId,
    },
    KeyConditionExpression: "PK = :PK", // Query table by PK
  };

  let item = null; // initialize item

  // call get operation to get single record from dynamoDb
  try {
    const data = await docClient.query(params).promise();
    item = data.Items; // set item with data
  } catch (err) {
    console.error("ERROR:", err.message);
    return err;
  }
  const response = {
    statusCode: 200,
    body: JSON.stringify(item),
  };
  return response;
};
