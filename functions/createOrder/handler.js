const dynamodb = require("aws-sdk/clients/dynamodb");
const docClient = new dynamodb.DocumentClient();
const uuid = require("node-uuid");

const tableName = process.env.TABLE_NAME; // gets table name from env variable

module.exports.createOrder = async (event) => {
  const { body } = event; // gets body payload from event
  let parsedBody = JSON.parse(body); // parses JSON payload to JS object

  const timeStamp = new Date().toISOString().slice(0, 10); // gets time stamp for createdAt date
  const DEFAULT_STATUS = "PENDING";

  let item = {
    PK: `ORDER#${uuid.v4()}`,
    SK: `USER#${parsedBody.userId}`,
    orderStatus: DEFAULT_STATUS, // default order status
    createdAt: timeStamp,
    product: parsedBody.product,
    price: parsedBody.price,
  };

  // Config Object for DynamoDB
  let params = {
    TableName: tableName,
    Item: item,
  };

  // call put operation to store data in dynamoDb.
  try {
    await docClient.put(params).promise();
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
