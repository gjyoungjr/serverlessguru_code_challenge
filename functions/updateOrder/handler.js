const dynamodb = require("aws-sdk/clients/dynamodb");
const docClient = new dynamodb.DocumentClient();

const tableName = process.env.TABLE_NAME; // gets table name from env variable

module.exports.updateOrder = async (event) => {
  const { orderId, userId } = event.pathParameters; // gets order Id & user Id from url
  const { body } = event; // gets body payload from event
  let parsedBody = JSON.parse(body); // parses JSON payload to JS object

  const timeStamp = new Date().toISOString().slice(0, 10); // gets time stamp for updatedAt date

  // Config Object for DynamoDB
  let params = {
    TableName: tableName,
    ExpressionAttributeValues: {
      ":p": parsedBody.product,
      ":o": parsedBody.orderStatus,
      ":u": timeStamp,
    },
    Key: {
      PK: orderId,
      SK: userId,
    },
    UpdateExpression: "set product = :p, orderStatus = :o, updatedAt = :u",
    ReturnValues: "UPDATED_NEW",
  };

  let item = null;
  // call update operation to update data in dynamoDb.
  try {
    const { Attributes } = await docClient.update(params).promise();
    item = Attributes;
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
